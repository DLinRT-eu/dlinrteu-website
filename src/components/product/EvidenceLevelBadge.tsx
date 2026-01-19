
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getEvidenceLevel, getEvidenceLevelColor, EVIDENCE_LEVEL_REFERENCE } from "@/data/evidence-levels";
import { ExternalLink, FlaskConical } from "lucide-react";

interface EvidenceLevelBadgeProps {
  level: string;
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const EvidenceLevelBadge = ({ 
  level, 
  showTooltip = true, 
  size = "md",
  className = ""
}: EvidenceLevelBadgeProps) => {
  const evidenceLevel = getEvidenceLevel(level);
  
  if (!evidenceLevel) {
    return null;
  }

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-1.5"
  };

  const badgeContent = (
    <Badge 
      variant="outline" 
      className={`${getEvidenceLevelColor(level)} ${sizeClasses[size]} font-medium border ${className}`}
    >
      <FlaskConical className={size === "sm" ? "h-3 w-3 mr-1" : "h-4 w-4 mr-1.5"} />
      Level {level}
    </Badge>
  );

  if (!showTooltip) {
    return badgeContent;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-sm p-4">
          <div className="space-y-2">
            <div className="font-semibold text-sm">
              Level {level}: {evidenceLevel.name}
            </div>
            <p className="text-xs text-muted-foreground">
              {evidenceLevel.description}
            </p>
            <div className="pt-2 border-t">
              <div className="text-xs font-medium mb-1">RT Examples:</div>
              <ul className="text-xs text-muted-foreground list-disc list-inside">
                {evidenceLevel.radiotherapyExamples.slice(0, 2).map((example, i) => (
                  <li key={i}>{example}</li>
                ))}
              </ul>
            </div>
            <a 
              href={EVIDENCE_LEVEL_REFERENCE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline pt-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              View methodology
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EvidenceLevelBadge;
