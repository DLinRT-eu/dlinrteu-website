
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getEvidenceRigorLevel,
  getClinicalImpactLevel,
  getEvidenceRigorColor,
  getClinicalImpactColor,
  EvidenceRigorCode,
  ClinicalImpactCode,
} from "@/data/evidence-impact-levels";
import { FlaskConical, Target, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface EvidenceImpactBadgesProps {
  evidenceRigor?: EvidenceRigorCode;
  clinicalImpact?: ClinicalImpactCode;
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  layout?: "horizontal" | "vertical";
}

const EvidenceImpactBadges = ({
  evidenceRigor,
  clinicalImpact,
  showTooltip = true,
  size = "md",
  className = "",
  layout = "horizontal"
}: EvidenceImpactBadgesProps) => {
  const rigorLevel = evidenceRigor ? getEvidenceRigorLevel(evidenceRigor) : null;
  const impactLevel = clinicalImpact ? getClinicalImpactLevel(clinicalImpact) : null;

  if (!rigorLevel && !impactLevel) {
    return null;
  }

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-3 py-1.5"
  };

  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const iconMargin = size === "sm" ? "mr-1" : "mr-1.5";

  const containerClass = layout === "horizontal" 
    ? "flex items-center gap-2 flex-wrap" 
    : "flex flex-col gap-2";

  const renderRigorBadge = () => {
    if (!rigorLevel) return null;

    const badge = (
      <Badge
        variant="outline"
        className={`${getEvidenceRigorColor(evidenceRigor!)} ${sizeClasses[size]} font-medium border ${className}`}
      >
        <FlaskConical className={`${iconSize} ${iconMargin}`} />
        {evidenceRigor} {rigorLevel.name}
      </Badge>
    );

    if (!showTooltip) return badge;

    return (
      <TooltipProvider key="rigor">
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm p-4">
            <div className="space-y-2">
              <div className="font-semibold text-sm flex items-center gap-2">
                <FlaskConical className="h-4 w-4" />
                {evidenceRigor}: {rigorLevel.name}
              </div>
              <p className="text-xs text-muted-foreground">{rigorLevel.description}</p>
              <div className="pt-2 border-t">
                <div className="text-xs font-medium mb-1">Criteria:</div>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  {rigorLevel.criteria.slice(0, 3).map((criterion, i) => (
                    <li key={i}>{criterion}</li>
                  ))}
                </ul>
              </div>
              <Link
                to="/evidence-impact-guide"
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline pt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
                View methodology
              </Link>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderImpactBadge = () => {
    if (!impactLevel) return null;

    const badge = (
      <Badge
        variant="outline"
        className={`${getClinicalImpactColor(clinicalImpact!)} ${sizeClasses[size]} font-medium border ${className}`}
      >
        <Target className={`${iconSize} ${iconMargin}`} />
        {clinicalImpact} {impactLevel.name}
      </Badge>
    );

    if (!showTooltip) return badge;

    return (
      <TooltipProvider key="impact">
        <Tooltip>
          <TooltipTrigger asChild>{badge}</TooltipTrigger>
          <TooltipContent side="top" className="max-w-sm p-4">
            <div className="space-y-2">
              <div className="font-semibold text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                {clinicalImpact}: {impactLevel.name}
              </div>
              <p className="text-xs text-muted-foreground">{impactLevel.description}</p>
              <div className="pt-2 border-t">
                <div className="text-xs font-medium mb-1">RT Examples:</div>
                <ul className="text-xs text-muted-foreground list-disc list-inside">
                  {impactLevel.rtExamples.slice(0, 3).map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
              <Link
                to="/evidence-impact-guide"
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline pt-1"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-3 w-3" />
                View methodology
              </Link>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className={containerClass}>
      {renderRigorBadge()}
      {renderImpactBadge()}
    </div>
  );
};

export default EvidenceImpactBadges;
