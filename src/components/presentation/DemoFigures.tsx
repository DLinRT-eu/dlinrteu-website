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
              <li><span className="font-medium text-foreground">E1</span> — Single-center studies</li>
              <li><span className="font-medium text-foreground">E2</span> — Multi-center studies</li>
              <li><span className="font-medium text-foreground">E3</span> — RCTs / systematic reviews</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-primary mb-2">Levels of Efficacy</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li><span className="font-medium text-foreground">L1t–L1c</span> — Technical / feasibility</li>
              <li><span className="font-medium text-foreground">L2</span> — Accuracy vs. reference</li>
              <li><span className="font-medium text-foreground">L3–L4</span> — Workflow / patient management</li>
              <li><span className="font-medium text-foreground">L5–L6</span> — Patient outcome / societal</li>
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
