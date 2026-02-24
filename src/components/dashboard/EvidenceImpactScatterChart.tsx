import React, { useMemo } from 'react';
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

interface EvidenceImpactScatterChartProps {
  filteredProducts: ProductDetails[];
}

const RIGOR_MAP: Record<string, number> = { E0: 0, E1: 1, E2: 2, E3: 3 };
const IMPACT_MAP: Record<string, number> = { I0: 0, I1: 1, I2: 2, I3: 3, I4: 4, I5: 5 };

const RIGOR_LEVELS = [
  { key: 'E3', label: 'E3', name: 'Systematic' },
  { key: 'E2', label: 'E2', name: 'Validated' },
  { key: 'E1', label: 'E1', name: 'Preliminary' },
  { key: 'E0', label: 'E0', name: 'No Evidence' },
];

const IMPACT_LEVELS = [
  { key: 'I0', label: 'I0', name: 'None Demo.' },
  { key: 'I1', label: 'I1', name: 'QA' },
  { key: 'I2', label: 'I2', name: 'Workflow' },
  { key: 'I3', label: 'I3', name: 'Decision' },
  { key: 'I4', label: 'I4', name: 'Outcome' },
  { key: 'I5', label: 'I5', name: 'Societal' },
];

interface CellProduct {
  name: string;
  company: string;
  category: string;
  color: string;
  rigorLabel: string;
  impactLabel: string;
  rigorNotes: string;
  impactNotes: string;
}

type CellMap = Record<string, CellProduct[]>;

const EvidenceImpactScatterChart: React.FC<EvidenceImpactScatterChartProps> = ({ filteredProducts }) => {
  const isMobile = useIsMobile();

  const { cellMap, totalCount, categories } = useMemo(() => {
    const map: CellMap = {};
    const catSet = new Map<string, string>();
    let count = 0;

    for (const p of filteredProducts) {
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
      });
      if (!catSet.has(p.category)) catSet.set(p.category, color);
      count++;
    }

    return { cellMap: map, totalCount: count, categories: Array.from(catSet.entries()) };
  }, [filteredProducts]);

  if (totalCount === 0) {
    return (
      <Card className="w-full col-span-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg md:text-2xl">Evidence Rigor vs Clinical Impact</CardTitle>
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
        <CardTitle className="text-lg md:text-2xl">
          Evidence Rigor vs Clinical Impact ({totalCount} products)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Column headers */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-px mb-1">
              <div /> {/* empty corner */}
              {IMPACT_LEVELS.map(imp => (
                <div key={imp.key} className="text-center px-1">
                  <div className="text-xs font-semibold text-foreground">{imp.label}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{imp.name}</div>
                </div>
              ))}
            </div>

            {/* Grid rows (E3 at top, E0 at bottom) */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-px">
              {RIGOR_LEVELS.map(rig => (
                <React.Fragment key={rig.key}>
                  {/* Row label */}
                  <div className="flex items-center justify-end pr-2 min-h-[72px]">
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
                                  className={`${dotSize} rounded-full inline-block cursor-pointer ring-1 ring-black/10 hover:scale-125 transition-transform`}
                                  style={{ backgroundColor: prod.color }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs text-sm">
                                <p className="font-semibold">{prod.name}</p>
                                <p className="text-muted-foreground text-xs">{prod.company}</p>
                                <div className="mt-1 space-y-0.5 text-xs">
                                  <p><span className="font-medium">Task:</span> <span style={{ color: prod.color }}>{prod.category}</span></p>
                                  <p><span className="font-medium">Rigor:</span> {prod.rigorLabel}</p>
                                  <p><span className="font-medium">Impact:</span> {prod.impactLabel}</p>
                                </div>
                                {(prod.rigorNotes || prod.impactNotes) && (
                                  <div className="mt-1.5 pt-1.5 border-t border-border text-[11px] text-muted-foreground">
                                    {prod.rigorNotes && <p className="line-clamp-2">{prod.rigorNotes}</p>}
                                    {prod.impactNotes && <p className="line-clamp-2 mt-0.5">{prod.impactNotes}</p>}
                                  </div>
                                )}
                              </TooltipContent>
                            </Tooltip>
                          ))}
                        </TooltipProvider>
                      </div>
                    );
                  })}
                </React.Fragment>
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
        <p className="mt-2 text-sm text-muted-foreground text-center">
          Each dot is a product, colored by task. Hover for details.
        </p>
      </CardContent>
    </Card>
  );
};

export default EvidenceImpactScatterChart;
