import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export type SourceAccess = "public" | "regulatory" | "vendor-provided" | "restricted";

interface SourceProvenanceChipProps {
  access?: SourceAccess;
  retrievedOn?: string; // YYYY-MM-DD
  source?: string;
  className?: string;
}

const LABELS: Record<SourceAccess, string> = {
  public: "Public source",
  regulatory: "Regulatory source",
  "vendor-provided": "Vendor-provided",
  restricted: "Restricted source",
};

const STYLES: Record<SourceAccess, string> = {
  public: "bg-green-100 text-green-800 hover:bg-green-100",
  regulatory: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  "vendor-provided": "bg-amber-100 text-amber-900 hover:bg-amber-100",
  restricted: "bg-orange-100 text-orange-900 hover:bg-orange-100",
};

/**
 * Discloses how a sourced field was obtained.
 * Public sources are preferred; non-public sources show a retrieval date.
 * See docs/FIELD_REFERENCE.md → "Source disclosure policy".
 */
export default function SourceProvenanceChip({
  access,
  retrievedOn,
  source,
  className = "",
}: SourceProvenanceChipProps) {
  if (!access) return null;
  const label = LABELS[access];
  const showDate = access !== "public" && retrievedOn;
  const tooltip =
    access === "public"
      ? source || "Public, citable source."
      : `${source ? source + " — " : ""}Not publicly accessible${
          retrievedOn ? ` (retrieved ${retrievedOn})` : ""
        }.`;

  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`gap-1 ${STYLES[access]} ${className}`}>
            <Info className="h-3 w-3" />
            {label}
            {showDate ? <span className="opacity-80">· retrieved {retrievedOn}</span> : null}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
