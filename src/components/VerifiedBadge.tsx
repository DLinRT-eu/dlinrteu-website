import { BadgeCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { ProductVerification } from "@/utils/certificationStatus";

interface VerifiedBadgeProps {
  verification?: ProductVerification;
  company?: string;
}

const VerifiedBadge = ({ verification, company }: VerifiedBadgeProps) => {
  if (!verification) return null;
  const date = new Date(verification.verifiedAt).toISOString().split("T")[0];
  const isValid = verification.status === "valid";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold mr-2 ${
              isValid ? "border-success bg-success/10 text-success" : "border-warning bg-warning/10 text-warning"
            }`}
          >
            <BadgeCheck className="h-3 w-3" strokeWidth={2.75} />
            {isValid ? "Verified by Company" : "Verification outdated"}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">
            {isValid
              ? `${company ?? "The manufacturer"} confirmed the accuracy of this information on ${date}.`
              : `Certified on ${date}; the information has changed since and awaits re-certification.`}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Confirms data accuracy only, not clinical endorsement.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerifiedBadge;
