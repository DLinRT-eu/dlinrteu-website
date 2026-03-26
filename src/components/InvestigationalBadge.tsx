import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InvestigationalBadgeProps {
  showTooltip?: boolean;
  className?: string;
}

export function InvestigationalBadge({ showTooltip = true, className = '' }: InvestigationalBadgeProps) {
  const badge = (
    <Badge 
      variant="warning" 
      className={`flex items-center gap-1 bg-amber-100 text-amber-800 border-amber-300 ${className}`}
    >
      <AlertTriangle className="h-3 w-3" />
      Investigation Use Only
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-semibold">Not approved for clinical use</p>
          <p className="text-xs mt-1">
            This product is currently in investigational/testing phase and has not yet received 
            CE marking or FDA clearance. It should only be used for research or investigation purposes.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
