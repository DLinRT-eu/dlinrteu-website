import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import ResponsiveChartWrapper from './ResponsiveChartWrapper';
import { TASK_COLORS, getTaskColor } from '@/utils/chartColors';
import { ProductDetails } from '@/types/productDetails';

interface EvidenceImpactScatterChartProps {
  filteredProducts: ProductDetails[];
}

const RIGOR_MAP: Record<string, number> = { E0: 0, E1: 1, E2: 2, E3: 3 };
const IMPACT_MAP: Record<string, number> = { I0: 0, I1: 1, I2: 2, I3: 3, I4: 4, I5: 5 };

const RIGOR_LABELS: Record<number, string> = {
  0: 'E0 – None',
  1: 'E1 – Single-center',
  2: 'E2 – Multi-center',
  3: 'E3 – Independent/RCT',
};
const IMPACT_LABELS: Record<number, string> = {
  0: 'I0 – None',
  1: 'I1 – QA/Monitor',
  2: 'I2 – Workflow',
  3: 'I3 – Dosimetric',
  4: 'I4 – Clinical',
  5: 'I5 – Survival',
};

// Seeded pseudo-random for stable jitter per product
function stableJitter(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  return ((hash % 1000) / 1000) * 0.6 - 0.3; // range [-0.3, 0.3]
}

interface ScatterPoint {
  x: number;
  y: number;
  name: string;
  company: string;
  category: string;
  color: string;
  rigorLabel: string;
  impactLabel: string;
  rigorNotes: string;
  impactNotes: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d: ScatterPoint = payload[0].payload;
  return (
    <div className="bg-background border border-border rounded-lg shadow-lg p-3 max-w-xs text-sm">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground">{d.company}</p>
      <div className="mt-1.5 space-y-0.5">
        <p><span className="font-medium">Task:</span> <span style={{ color: d.color }}>{d.category}</span></p>
        <p><span className="font-medium">Rigor:</span> {d.rigorLabel}</p>
        <p><span className="font-medium">Impact:</span> {d.impactLabel}</p>
      </div>
      {(d.rigorNotes || d.impactNotes) && (
        <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground">
          {d.rigorNotes && <p className="line-clamp-2">{d.rigorNotes}</p>}
          {d.impactNotes && <p className="line-clamp-2 mt-1">{d.impactNotes}</p>}
        </div>
      )}
    </div>
  );
};

const EvidenceImpactScatterChart: React.FC<EvidenceImpactScatterChartProps> = ({ filteredProducts }) => {
  const isMobile = useIsMobile();

  const scatterData = useMemo(() => {
    return filteredProducts
      .filter(p => p.evidenceRigor && p.clinicalImpact)
      .map((p): ScatterPoint => {
        const baseX = IMPACT_MAP[p.clinicalImpact!] ?? 0;
        const baseY = RIGOR_MAP[p.evidenceRigor!] ?? 0;
        const jx = stableJitter(p.name + 'x');
        const jy = stableJitter(p.name + 'y');
        return {
          x: baseX + jx,
          y: baseY + jy,
          name: p.name,
          company: p.company,
          category: p.category,
          color: getTaskColor(p.category),
          rigorLabel: RIGOR_LABELS[baseY] ?? p.evidenceRigor!,
          impactLabel: IMPACT_LABELS[baseX] ?? p.clinicalImpact!,
          rigorNotes: p.evidenceRigorNotes ?? '',
          impactNotes: p.clinicalImpactNotes ?? '',
        };
      });
  }, [filteredProducts]);

  // Unique categories present
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    scatterData.forEach(d => { if (!seen.has(d.category)) seen.set(d.category, d.color); });
    return Array.from(seen.entries());
  }, [scatterData]);

  if (scatterData.length === 0) {
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

  return (
    <Card className="w-full col-span-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl">
          Evidence Rigor vs Clinical Impact ({scatterData.length} products)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveChartWrapper minHeight={isMobile ? '350px' : '450px'}>
          <ChartContainer className="h-full" config={{}}>
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: isMobile ? 10 : 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[-0.5, 5.5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tickFormatter={(v: number) => isMobile ? `I${v}` : (IMPACT_LABELS[v] ?? `I${v}`)}
                  label={isMobile ? undefined : { value: 'Clinical Impact →', position: 'insideBottom', offset: -10, style: { fill: 'hsl(var(--muted-foreground))' } }}
                  tick={{ fontSize: isMobile ? 9 : 11, fill: 'hsl(var(--muted-foreground))' }}
                  stroke="hsl(var(--border))"
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[-0.5, 3.5]}
                  ticks={[0, 1, 2, 3]}
                  tickFormatter={(v: number) => isMobile ? `E${v}` : (RIGOR_LABELS[v] ?? `E${v}`)}
                  label={isMobile ? undefined : { value: 'Evidence Rigor →', angle: -90, position: 'insideLeft', offset: 10, style: { fill: 'hsl(var(--muted-foreground))' } }}
                  tick={{ fontSize: isMobile ? 9 : 11, fill: 'hsl(var(--muted-foreground))' }}
                  stroke="hsl(var(--border))"
                  width={isMobile ? 30 : 140}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={scatterData} isAnimationActive={false}>
                  {scatterData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} fillOpacity={0.85} stroke={entry.color} strokeWidth={1} r={isMobile ? 6 : 8} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ResponsiveChartWrapper>

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
