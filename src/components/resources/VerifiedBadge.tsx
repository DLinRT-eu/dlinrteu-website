import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CalendarCheck } from 'lucide-react';
import {
  formatVerifiedDate,
  statusLabel,
  type VerificationMeta,
} from '@/data/resources/verification';

interface VerifiedBadgeProps extends VerificationMeta {
  className?: string;
  /** Compact variant hides the "Verified" word to save space in dense lists. */
  compact?: boolean;
}

/**
 * Shows when a resource entry was last checked, plus optional version/status notes.
 */
const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  lastVerified,
  version,
  status,
  note,
  className,
  compact = false,
}) => {
  const formatted = formatVerifiedDate(lastVerified);
  const label = statusLabel(status);
  const tooltipParts = [version, label, note].filter(Boolean);

  const badge = (
    <Badge
      variant="outline"
      className={`gap-1 whitespace-nowrap text-[11px] font-normal text-muted-foreground ${className ?? ''}`}
    >
      <CalendarCheck className="h-3 w-3" aria-hidden="true" />
      <span>{compact ? formatted : `Verified ${formatted}`}</span>
    </Badge>
  );

  const accessibleSummary = [
    `Last verified ${formatted}`,
    ...tooltipParts,
  ].join(' — ');

  if (tooltipParts.length === 0) {
    return <span aria-label={accessibleSummary}>{badge}</span>;
  }

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0} aria-label={accessibleSummary} className="inline-flex">
            {badge}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <p className="text-xs">
            <strong>Last verified:</strong> {formatted}
          </p>
          {version && (
            <p className="text-xs">
              <strong>Version:</strong> {version}
            </p>
          )}
          {label && (
            <p className="text-xs">
              <strong>Status:</strong> {label}
            </p>
          )}
          {note && <p className="text-xs">{note}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerifiedBadge;
