import { Badge } from '@/components/ui/badge';
import { CheckCircle2, AlertTriangle, Info, XCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type HashStatus = 'valid' | 'mismatch' | 'legacy' | 'never';

interface HashStatusBadgeProps {
  status: HashStatus;
  showTooltip?: boolean;
}

export function HashStatusBadge({ status, showTooltip = true }: HashStatusBadgeProps) {
  const config = {
    valid: {
      icon: CheckCircle2,
      label: 'Hash Valid',
      variant: 'success' as const,
      tooltip: 'Content hash matches - certification is valid',
      color: 'text-green-600',
    },
    mismatch: {
      icon: AlertTriangle,
      label: 'Hash Mismatch',
      variant: 'warning' as const,
      tooltip: 'Content has changed since certification',
      color: 'text-yellow-600',
    },
    legacy: {
      icon: Info,
      label: 'Legacy',
      variant: 'secondary' as const,
      tooltip: 'Date-based certification (no hash stored)',
      color: 'text-blue-600',
    },
    never: {
      icon: XCircle,
      label: 'Not Certified',
      variant: 'secondary' as const,
      tooltip: 'Product has never been certified',
      color: 'text-muted-foreground',
    },
  };

  const { icon: Icon, label, variant, tooltip, color } = config[status];

  const badge = (
    <Badge variant={variant} className="flex items-center gap-1">
      <Icon className={`h-3 w-3 ${color}`} />
      {label}
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
