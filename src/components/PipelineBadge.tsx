import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PipelineBadgeProps {
  showTooltip?: boolean;
  className?: string;
}

export function PipelineBadge({ showTooltip = true, className }: PipelineBadgeProps) {
  const badge = (
    <Badge 
      variant="outline" 
      className={`text-xs bg-violet-50 text-violet-700 border-violet-300 flex items-center gap-1 ${className || ''}`}
    >
      <Clock className="h-3 w-3" />
      Coming Soon
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm max-w-xs">
            This product has been announced but is not yet certified (CE/FDA). 
            Information is based on publicly available announcements.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default PipelineBadge;
