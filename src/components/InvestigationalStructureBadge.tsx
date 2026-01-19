import React from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvestigationalStructureBadgeProps {
  className?: string;
  showLabel?: boolean;
}

const InvestigationalStructureBadge: React.FC<InvestigationalStructureBadgeProps> = ({ 
  className,
  showLabel = false
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn(
            "inline-flex items-center gap-0.5",
            showLabel && "rounded-full border px-1.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 border-amber-200",
            className
          )}>
            <AlertTriangle className="h-3 w-3 text-amber-600" aria-hidden="true" />
            {showLabel && <span>Investigational</span>}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-xs">
            This structure is for <strong>investigational use only</strong> and has not been cleared for clinical use.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InvestigationalStructureBadge;
