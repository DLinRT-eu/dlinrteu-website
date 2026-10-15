import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { getTaskColor } from '@/utils/chartColors';
import { ProductDetails } from '@/types/productDetails';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChartExport } from "@/hooks/useChartExport";
import ChartExportButton from './ChartExportButton';
import { ADOPTION_READINESS_LEVELS, EVIDENCE_RIGOR_LEVELS, EFFICACY_LEVELS } from '@/data/evidence-impact-levels';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import EvidenceImpactMatrix3D from "@/components/resources/EvidenceImpactMatrix3D";

import { getEvidenceMatrixProducts } from "@/utils/evidenceMatrix";

interface EvidenceImpactScatterChartProps {
  filteredProducts: ProductDetails[];
}

const RIGOR_LEVELS = [...EVIDENCE_RIGOR_LEVELS].reverse().map(level => ({
  key: level.level, label: level.level, name: level.name, description: level.description,
}));
const IMPACT_LEVELS = EFFICACY_LEVELS.map(level => ({
  key: level.level, label: level.level, name: level.name, description: level.description,
}));

interface CellProduct {
  name: string;
  company: string;
  category: string;
  color: string;
  rigorLabel: string;
  impactLabel: string;
  rigorNotes: string;
  impactNotes: string;
  provisional: boolean;
  burden?: string;
  burdenLabel?: string;
  burdenNotes?: string;
}

type CellMap = Record<string, CellProduct[]>;

const EvidenceImpactScatterChart: React.FC<EvidenceImpactScatterChartProps> = ({ filteredProducts }) => {
  const { chartRef, exportToPng } = useChartExport('chart-evidence-impact');
  const isMobile = useIsMobile();
  const [view, setView] = useState<"2d" | "3d">("2d");

  const assessedProducts = useMemo(() => getEvidenceMatrixProducts(filteredProducts), [filteredProducts]);
  const readinessCount = assessedProducts.filter(product => product.adoptionReadiness).length;

  const { cellMap, totalCount, categories } = useMemo(() => {
    const map: CellMap = {};
    const catSet = new Map<string, string>();
    let count = 0;

    for (const p of assessedProducts) {
      if (!p.evidenceRigor || !p.clinicalImpact) continue;
      const key = `${p.evidenceRigor}-${p.clinicalImpact}`;
      const color = getTaskColor(p.category);
      if (!map[key]) map[key] = [];
      map[key].push({
        name: p.name,
        company: p.company,
        category: p.category,
        color,
        rigorLabel: `${p.evidenceRigor} – ${RIGOR_LEVELS.find(r => r.key === p.evidenceRigor)?.name ?? ''}`,
        impactLabel: `${p.clinicalImpact} – ${IMPACT_LEVELS.find(i => i.key === p.clinicalImpact)?.name ?? ''}`,
        rigorNotes: p.evidenceRigorNotes ?? '',
        impactNotes: p.clinicalImpactNotes ?? '',
        provisional: p.efficacyProvisional === true,
        burden: p.adoptionReadiness,
        burdenLabel: p.adoptionReadiness
          ? `${p.adoptionReadiness} – ${ADOPTION_READINESS_LEVELS.find(b => b.level === p.adoptionReadiness)?.name ?? 'Adoption Readiness'}`
          : undefined,
        burdenNotes: p.adoptionReadinessNotes ?? '',
      });
      if (!catSet.has(p.category)) catSet.set(p.category, color);
      count++;
    }

    return { cellMap: map, totalCount: count, categories: Array.from(catSet.entries()) };
  }, [assessedProducts]);

  if (totalCount === 0) {
    return (
      <Card className="w-full col-span-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-2xl">Evidence Rigor vs Levels of Efficacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center min-h-[350px]">
            <p className="text-muted-foreground">No evidence data available for current filters</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const dotSize = isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5';

  return (
    <Card className="w-full col-span-full">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-lg md:text-2xl">
            Evidence Rigor vs Levels of Efficacy{view === "3d" ? " × Adoption Readiness" : ""} ({view === "3d" ? readinessCount : totalCount} products)
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <ToggleGroup
              type="single"
              size="sm"
              value={view}
              onValueChange={(v) => v && setView(v as "2d" | "3d")}
              className="border rounded-md"
            >
              <ToggleGroupItem value="2d" aria-label="2D view" className="text-xs px-3">
                2D
              </ToggleGroupItem>
              <ToggleGroupItem value="3d" aria-label="3D view" className="text-xs px-3">
                3D
              </ToggleGroupItem>
            </ToggleGroup>
            {view === "2d" && (
              <ChartExportButton onExport={() => exportToPng('evidence-impact')} />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "3d" ? (
          <EvidenceImpactMatrix3D products={filteredProducts} />
        ) : (
        <div>
        <div className="overflow-x-auto">
          <div id="chart-evidence-impact" ref={chartRef} className="min-w-[960px]">
            {/* Column headers */}
            <div className="grid grid-cols-[160px_repeat(7,minmax(0,1fr))] gap-px mb-1">
              <div className="text-xs font-semibold text-muted-foreground px-2">Evidence Rigor ↓<br />Levels of Efficacy →</div>
              {IMPACT_LEVELS.map(imp => (
                <div key={imp.key} title={imp.description} className="text-center px-1 pb-2">
                  <div className="text-xs font-semibold text-foreground">{imp.label}</div>
                  <div className="text-[10px] text-muted-foreground break-words">{imp.name}</div>
                </div>
              ))}
            </div>

            {/* Grid rows (E3 at top, E0 at bottom) */}
            <div className="grid grid-cols-[160px_repeat(7,minmax(0,1fr))] gap-px">
              {RIGOR_LEVELS.map(rig => (
                <div key={rig.key} className="contents">
                  {/* Row label */}
                  <div title={rig.description} className="flex items-center justify-end pr-2 min-h-[72px]">
                    <div>
                      <div className="text-xs font-semibold text-foreground text-right">{rig.label}</div>
                      <div className="text-[10px] text-muted-foreground text-right">{rig.name}</div>
                    </div>
                  </div>

                  {/* Cells */}
                  {IMPACT_LEVELS.map(imp => {
                    const key = `${rig.key}-${imp.key}`;
                    const products = cellMap[key] ?? [];
                    const hasProducts = products.length > 0;

                    return (
                      <div
                        key={key}
                        data-evidence-cell={key}
                        className={`relative border border-border rounded min-h-[72px] p-1.5 flex flex-wrap content-start gap-1 transition-colors ${
                          hasProducts ? 'bg-muted/40' : 'bg-background'
                        }`}
                      >
                        {hasProducts && (
                          <span className="absolute top-0.5 right-1 text-[9px] font-medium text-muted-foreground">
                            {products.length}
                          </span>
                        )}
                        <TooltipProvider delayDuration={100}>
                          {products.map((prod, i) => (
                            <Tooltip key={i}>
                              <TooltipTrigger asChild>
                                <span
                                  tabIndex={0}
                                  aria-label={`${prod.name}: ${prod.rigorLabel}; ${prod.impactLabel}`}
                                  className={`${dotSize} rounded-full inline-block cursor-pointer hover:scale-125 transition-transform`}
                                  style={{
                                    backgroundColor: prod.color,
                                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs text-sm">
                                <p className="font-semibold">{prod.name}</p>
                                <p className="text-muted-foreground text-xs">{prod.company}</p>
                                <div className="mt-1 space-y-0.5 text-xs">
                                  <p><span className="font-medium">Task:</span> <span style={{ color: prod.color }}>{prod.category}</span></p>
                                  <p><span className="font-medium">Evidence Rigor:</span> {prod.rigorLabel}</p>
                                  <p><span className="font-medium">Levels of Efficacy:</span> {prod.impactLabel}</p>
                                  {prod.provisional && <p className="text-muted-foreground">Provisional efficacy — pending source review</p>}
                                  {prod.burdenLabel && (
                                    <p><span className="font-medium">Adoption Readiness:</span> {prod.burdenLabel}</p>
                                  )}
                                </div>
                                {(prod.rigorNotes || prod.impactNotes || prod.burdenNotes) && (
                                  <div className="mt-1.5 pt-1.5 border-t border-border text-[11px] text-muted-foreground">
                                    {prod.rigorNotes && <p className="line-clamp-2">{prod.rigorNotes}</p>}
                                    {prod.impactNotes && <p className="line-clamp-2 mt-0.5">{prod.impactNotes}</p>}
                                    {prod.burdenNotes && <p className="line-clamp-2 mt-0.5">{prod.burdenNotes}</p>}
                                  </div>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-xs text-muted-foreground">
          {categories.map(([cat, color]) => (
            <span key={cat} className="inline-flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              {cat}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Products with assessed Evidence Rigor and Levels of Efficacy; color indicates task.
        </p>
        </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EvidenceImpactScatterChart;
