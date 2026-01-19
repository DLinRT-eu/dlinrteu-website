import React from "react";
import { EVIDENCE_LEVELS, getEvidenceLevelColor } from "@/data/evidence-levels";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EvidencePyramid = () => {
  // Reverse levels so highest (6) is at top
  const pyramidLevels = [...EVIDENCE_LEVELS].reverse();
  
  // Define widths for pyramid shape (narrower at top, wider at bottom)
  const widthPercentages = [30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-1">
        {pyramidLevels.map((level, index) => {
          const colorClasses = getEvidenceLevelColor(level.level);
          const width = widthPercentages[index];
          
          return (
            <TooltipProvider key={level.level}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "flex items-center justify-center py-3 px-4 rounded-sm cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md border",
                      colorClasses
                    )}
                    style={{ width: `${width}%` }}
                  >
                    <div className="flex items-center gap-2 text-center">
                      <span className="font-bold text-sm sm:text-base">
                        L{level.level}
                      </span>
                      <span className="hidden sm:inline text-xs sm:text-sm font-medium truncate">
                        {level.name}
                      </span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  <div className="space-y-2">
                    <p className="font-semibold">{level.name}</p>
                    <p className="text-xs text-muted-foreground">{level.description}</p>
                    <div className="text-xs">
                      <span className="font-medium">RT Example: </span>
                      {level.radiotherapyExamples[0]}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-sm" />
            <span>Highest evidence</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted border border-border rounded-sm" />
            <span>Lowest evidence</span>
          </div>
        </div>
      </div>
      
      {/* Annotation */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Hover over each level to see details. Fewer products achieve higher levels.
      </p>
    </div>
  );
};

export default EvidencePyramid;
