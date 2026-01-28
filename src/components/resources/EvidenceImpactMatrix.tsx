
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  getEvidenceRigorColor,
  getClinicalImpactColor,
} from "@/data/evidence-impact-levels";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FlaskConical, Target, ArrowRight, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceImpactMatrixProps {
  interactive?: boolean;
  showLabels?: boolean;
  className?: string;
}

const EvidenceImpactMatrix = ({
  interactive = true,
  showLabels = true,
  className = ""
}: EvidenceImpactMatrixProps) => {
  // Reverse rigor levels so E3 is at top
  const rigorLevels = [...EVIDENCE_RIGOR_LEVELS].reverse();
  const impactLevels = CLINICAL_IMPACT_LEVELS;

  // Define typical product zones
  const getZoneDescription = (rigor: string, impact: string): { common: boolean; description: string } => {
    // Common zones for RT AI products
    const commonZones: Record<string, string> = {
      "E1-I0": "New products with feasibility demonstrated only",
      "E1-I1": "QA tools with preliminary validation",
      "E2-I1": "Mature QA/monitoring tools",
      "E2-I2": "Workflow-validated tools with time savings",
      "E1-I2": "Single-center workflow studies",
    };

    const key = `${rigor}-${impact}`;
    if (commonZones[key]) {
      return { common: true, description: commonZones[key] };
    }

    // Rare zones
    if (rigor === "E3") {
      return { common: false, description: "Requires systematic reviews or RCTs" };
    }
    if (impact === "I4" || impact === "I5") {
      return { common: false, description: "Outcome/societal studies are rare in RT AI" };
    }
    if (rigor === "E0") {
      return { common: false, description: "No peer-reviewed evidence yet" };
    }

    return { common: false, description: "Less common product zone" };
  };

  const getCellColor = (rigor: string, impact: string): string => {
    const zone = getZoneDescription(rigor, impact);
    
    if (zone.common) {
      return "bg-primary/10 hover:bg-primary/20 border-primary/30";
    }
    
    if (rigor === "E3" && impact === "I5") {
      // Aspirational zone
      return "bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 border-purple-300 dark:border-purple-700";
    }
    
    return "bg-muted/30 hover:bg-muted/50 border-border/50";
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-primary" />
            <span>×</span>
            <Target className="h-5 w-5 text-primary" />
          </div>
          Evidence-Impact Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Matrix Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Column headers (Impact levels) */}
            <div className="flex">
              {/* Empty corner cell */}
              <div className="w-20 flex-shrink-0" />
              
              {/* Impact headers */}
              <div className="flex-1 flex items-end mb-2">
                {impactLevels.map((impact) => (
                  <TooltipProvider key={impact.level}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex-1 text-center px-1">
                          <div className={cn(
                            "text-xs font-medium py-1 px-2 rounded",
                            getClinicalImpactColor(impact.level)
                          )}>
                            {impact.level}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-1 truncate">
                            {impact.name}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="text-sm font-medium">{impact.level}: {impact.name}</div>
                        <p className="text-xs text-muted-foreground">{impact.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>

            {/* Impact arrow */}
            {showLabels && (
              <div className="flex items-center justify-center mb-2 pl-20">
                <span className="text-xs text-muted-foreground mr-2">Clinical Impact</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            {/* Rows */}
            <div className="flex">
              {/* Rigor labels column */}
              <div className="w-20 flex-shrink-0 flex flex-col">
                {showLabels && (
                  <div className="flex items-center justify-center mb-2 -rotate-90 origin-center translate-y-16 whitespace-nowrap">
                    <span className="text-xs text-muted-foreground mr-2">Evidence Rigor</span>
                    <ArrowDown className="h-4 w-4 text-muted-foreground rotate-90" />
                  </div>
                )}
                {rigorLevels.map((rigor) => (
                  <TooltipProvider key={rigor.level}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="h-16 flex items-center justify-end pr-2">
                          <div className={cn(
                            "text-xs font-medium py-1 px-2 rounded",
                            getEvidenceRigorColor(rigor.level)
                          )}>
                            {rigor.level}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs">
                        <div className="text-sm font-medium">{rigor.level}: {rigor.name}</div>
                        <p className="text-xs text-muted-foreground">{rigor.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {/* Matrix cells */}
              <div className="flex-1 grid grid-cols-6 gap-1">
                {rigorLevels.map((rigor) => (
                  impactLevels.map((impact) => {
                    const zone = getZoneDescription(rigor.level, impact.level);
                    
                    return (
                      <TooltipProvider key={`${rigor.level}-${impact.level}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "h-16 rounded border transition-all cursor-pointer",
                                "flex items-center justify-center",
                                interactive && "hover:scale-105 hover:shadow-md",
                                getCellColor(rigor.level, impact.level)
                              )}
                            >
                              {zone.common && (
                                <div className="w-3 h-3 rounded-full bg-primary/60" />
                              )}
                              {rigor.level === "E3" && impact.level === "I5" && (
                                <span className="text-lg">★</span>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <div className="space-y-1">
                              <div className="font-medium text-sm">
                                {rigor.level}/{impact.level}
                              </div>
                              <div className="text-xs">
                                <span className="text-muted-foreground">Rigor:</span> {rigor.name}
                              </div>
                              <div className="text-xs">
                                <span className="text-muted-foreground">Impact:</span> {impact.name}
                              </div>
                              <div className="text-xs pt-1 border-t">
                                {zone.description}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    );
                  })
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span>Common product zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted/30 border border-border/50" />
            <span>Less common</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">★</span>
            <span>Aspirational (E3/I5)</span>
          </div>
        </div>

        {/* Interpretation note */}
        <p className="mt-4 text-xs text-muted-foreground">
          Most radiotherapy AI products occupy the E1-E2/I1-I2 zone (QA and Workflow impact). 
          I0 indicates no benefit demonstrated yet; I1 recognizes QA tools that ensure safe AI use. 
          Hover over cells for details.
        </p>
      </CardContent>
    </Card>
  );
};

export default EvidenceImpactMatrix;
