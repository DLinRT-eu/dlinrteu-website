import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HTA_DOMAINS, type HTADomainCode } from "@/data/hta-mapping";

interface HTABadgeProps {
  domain: HTADomainCode;
  className?: string;
}

/**
 * Compact tooltip badge that surfaces the EUnetHTA Core Model domain
 * a given product field maps to. Rendered only when the user enables
 * the "HTA view" toggle on a product page.
 */
const HTABadge: React.FC<HTABadgeProps> = ({ domain, className }) => {
  const meta = HTA_DOMAINS[domain];
  if (!meta) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={`text-[10px] font-mono tracking-wide border-primary/40 text-primary cursor-help ${className ?? ""}`}
          >
            HTA · {meta.code}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs font-semibold">{meta.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{meta.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HTABadge;
