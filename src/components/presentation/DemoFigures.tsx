import { Card, CardContent } from "@/components/ui/card";

/**
 * Inline figure components for Live Demo slides.
 * These render small, presentation-friendly visuals using real data.
 */

interface TaskBarsProps {
  tasks: { name: string; value: number }[];
}

function TaskBars({ tasks }: TaskBarsProps) {
  if (!tasks.length) return null;
  const max = Math.max(...tasks.map(t => t.value));

  return (
    <Card>
      <CardContent className="pt-4 pb-3 space-y-3">
        <p className="text-xs font-medium text-muted-foreground mb-2">Top Clinical Tasks by Product Count</p>
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-sm text-foreground w-40 truncate">{task.name}</span>
            <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(task.value / max) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-primary w-8 text-right">{task.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function EvidenceImpactSummary() {
  return (
    <Card>
      <CardContent className="pt-4 pb-3">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-primary mb-2">Evidence Axis</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li><span className="font-medium text-foreground">E0</span> — No published data</li>
              <li><span className="font-medium text-foreground">E1</span> — Single-centre studies</li>
              <li><span className="font-medium text-foreground">E2</span> — Multi-centre studies</li>
              <li><span className="font-medium text-foreground">E3</span> — RCTs / systematic reviews</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-primary mb-2">Impact Axis</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li><span className="font-medium text-foreground">I0</span> — No workflow change</li>
              <li><span className="font-medium text-foreground">I1–I2</span> — Assistance / review aid</li>
              <li><span className="font-medium text-foreground">I3–I4</span> — Significant time savings</li>
              <li><span className="font-medium text-foreground">I5</span> — Full automation</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const DemoFigures = {
  TaskBars,
  EvidenceImpactSummary,
};
