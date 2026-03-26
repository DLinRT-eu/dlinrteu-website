import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Hospital, Info, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import type { ProductDetails } from "@/types/productDetails";
import type { CompanyDetails } from "@/types/company";
import { hasAnatomyMapping } from "@/utils/fhir/terminology/anatomyCodes";
import { hasModalityMapping, normalizeModalities } from "@/utils/fhir/terminology/modalityCodes";
import { hasDiseaseMapping } from "@/utils/fhir/terminology/diseaseCodes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FHIRReadiness {
  score: number; // 0-4
  label: "Limited" | "Fair" | "Good" | "Excellent";
  details: string[];
  mappedCount: number;
  totalFields: number;
}

interface FHIRExportSectionProps {
  product: ProductDetails;
  company?: CompanyDetails;
}

/**
 * Calculate FHIR readiness score based on terminology mappings
 */
function calculateFHIRReadiness(product: ProductDetails): FHIRReadiness {
  let score = 0;
  const details: string[] = [];
  const totalFields = 4;

  // Check modality mapping
  const modalities = normalizeModalities(product.modality);
  const hasModality = modalities.length > 0 && modalities.some(m => hasModalityMapping(m));
  if (hasModality) {
    score++;
  } else if (modalities.length > 0) {
    details.push("Modality needs DICOM code");
  } else {
    details.push("No modality specified");
  }

  // Check anatomy mapping
  const anatomyLocations = Array.isArray(product.anatomy) ? product.anatomy : 
    (product.anatomy ? [product.anatomy] : []);
  const hasAnatomy = anatomyLocations.length > 0 && anatomyLocations.some(a => hasAnatomyMapping(a));
  if (hasAnatomy) {
    score++;
  } else if (anatomyLocations.length > 0) {
    details.push("Anatomy needs SNOMED CT code");
  } else {
    details.push("No anatomy specified");
  }

  // Check disease mapping
  const diseases = Array.isArray(product.diseaseTargeted) ? product.diseaseTargeted :
    (product.diseaseTargeted ? [product.diseaseTargeted] : []);
  const hasDisease = diseases.length > 0 && diseases.some(d => hasDiseaseMapping(d));
  if (hasDisease) {
    score++;
  } else if (diseases.length > 0) {
    details.push("Disease needs ICD-10/SNOMED code");
  } else {
    details.push("No disease target specified");
  }

  // Check regulatory identifiers
  const fdaInfo = product.regulatory?.fda;
  const ceInfo = product.regulatory?.ce;
  
  const hasFDA = fdaInfo && (
    (typeof fdaInfo === 'string' && fdaInfo !== '' && fdaInfo !== 'N/A') ||
    (typeof fdaInfo === 'object' && fdaInfo.clearanceNumber && fdaInfo.clearanceNumber !== 'N/A')
  );
  const hasCE = ceInfo && ceInfo.status && 
    ceInfo.status !== 'N/A' && ceInfo.status !== 'Not available' && ceInfo.status !== '';
  
  if (hasFDA || hasCE) {
    score++;
  } else {
    details.push("No FDA/CE identifiers");
  }

  const labels: FHIRReadiness["label"][] = ["Limited", "Fair", "Good", "Excellent"];
  
  return {
    score,
    label: labels[score] || "Limited",
    details,
    mappedCount: score,
    totalFields
  };
}

/**
 * Readiness indicator component
 */
function FHIRReadinessIndicator({ readiness }: { readiness: FHIRReadiness }) {
  const getColorClass = (index: number): string => {
    if (index >= readiness.score) return "bg-muted";
    switch (readiness.label) {
      case "Excellent": return "bg-primary";
      case "Good": return "bg-primary/80";
      case "Fair": return "bg-accent";
      case "Limited": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getLabelColor = (): string => {
    switch (readiness.label) {
      case "Excellent": return "text-primary";
      case "Good": return "text-primary/80";
      case "Fair": return "text-accent-foreground";
      case "Limited": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium text-muted-foreground">FHIR Readiness:</span>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${getColorClass(index)}`}
            />
          ))}
        </div>
        <span className={`text-sm font-semibold ${getLabelColor()}`}>
          {readiness.label}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">
                {readiness.mappedCount}/{readiness.totalFields} fields have standardized medical codes
              </p>
              {readiness.details.length > 0 && (
                <ul className="text-xs mt-2 space-y-1">
                  {readiness.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <p className="text-xs text-muted-foreground">
        ({readiness.mappedCount}/{readiness.totalFields} fields have standardized codes)
      </p>
    </div>
  );
}

const FHIRExportSection = ({ product, company }: FHIRExportSectionProps) => {
  const [includeWarnings, setIncludeWarnings] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const readiness = useMemo(() => calculateFHIRReadiness(product), [product]);

  const handleFHIRExport = async () => {
    setIsExporting(true);
    try {
      const { downloadProductFHIRBundle } = await import("@/utils/fhir");
      downloadProductFHIRBundle(product, company, { includeWarningsReport: includeWarnings });
      toast.success(`FHIR bundle exported for ${product.name}`);
    } catch (error) {
      console.error("Failed to export FHIR bundle:", error);
      toast.error("Failed to export FHIR bundle");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Healthcare Interoperability
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Export product data in standardized healthcare formats for integration with hospital information systems.
      </p>

      <FHIRReadinessIndicator readiness={readiness} />

      <Button
        onClick={handleFHIRExport}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 mb-4"
        variant="outline"
      >
        <Hospital className="h-4 w-4" />
        {isExporting ? "Exporting..." : "Export FHIR Bundle"}
      </Button>

      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="includeWarnings"
          checked={includeWarnings}
          onCheckedChange={(checked) => setIncludeWarnings(checked === true)}
        />
        <Label
          htmlFor="includeWarnings"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          Include terminology warnings report
        </Label>
      </div>

      <div className="bg-muted/50 rounded-md p-3 text-xs text-muted-foreground">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">FHIR R4 DeviceDefinition format</p>
            <p className="mt-1">Uses SNOMED CT & DICOM codes for healthcare system integration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FHIRExportSection;
