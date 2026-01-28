import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { FileText, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import EvidenceLevelBadge from "./EvidenceLevelBadge";
import EvidenceImpactBadges from "./EvidenceImpactBadges";
import { EditableField, useProductEdit, EvidenceEditor } from "@/components/product-editor";
import {
  EVIDENCE_RIGOR_LEVELS,
  CLINICAL_IMPACT_LEVELS,
  EvidenceRigorCode,
  ClinicalImpactCode,
} from "@/data/evidence-impact-levels";

interface EvidenceLimitationsDetailsProps {
  product: ProductDetails;
}

// Legacy single-axis levels
const LEGACY_EVIDENCE_LEVELS = [
  { value: '0', label: '0 - No Evidence' },
  { value: '1t', label: '1t - Technical Efficacy' },
  { value: '1c', label: '1c - Clinical Efficacy' },
  { value: '2', label: '2 - Stand-Alone Performance' },
  { value: '3', label: '3 - Workflow Efficacy' },
  { value: '4', label: '4 - Treatment Decision' },
  { value: '5', label: '5 - Patient Outcome' },
  { value: '6', label: '6 - Societal Efficacy' },
];

// Dual-axis options
const EVIDENCE_RIGOR_OPTIONS = EVIDENCE_RIGOR_LEVELS.map(level => ({
  value: level.level,
  label: `${level.level} - ${level.name}`
}));

const CLINICAL_IMPACT_OPTIONS = CLINICAL_IMPACT_LEVELS.map(level => ({
  value: level.level,
  label: `${level.level} - ${level.name}`
}));

const EvidenceLimitationsDetails = ({ product }: EvidenceLimitationsDetailsProps) => {
  const { isEditMode, editedProduct, updateField, canEdit } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  const showEditor = isEditMode && canEdit;
  
  const { 
    evidence, 
    limitations, 
    evidenceLevel, 
    evidenceLevelNotes,
    evidenceRigor,
    evidenceRigorNotes,
    clinicalImpact,
    clinicalImpactNotes 
  } = displayProduct;
  
  // Check what data exists
  const hasEvidence = evidence && evidence.length > 0;
  const hasLimitations = limitations && limitations.length > 0;
  const hasLegacyLevel = !!evidenceLevel;
  const hasDualAxis = !!(evidenceRigor || clinicalImpact);
  
  if (!showEditor && !hasEvidence && !hasLimitations && !hasLegacyLevel && !hasDualAxis) {
    return null;
  }

  // Helper function to format DOI links
  const formatDOI = (doi: string) => {
    const cleanDoi = doi.trim();
    const doiUrl = cleanDoi.startsWith("https://doi.org/") 
      ? cleanDoi
      : `https://doi.org/${cleanDoi.replace(/^doi:/, '')}`;
    
    return (
      <a 
        href={doiUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <FileText className="h-4 w-4" />
        {cleanDoi.replace(/^https:\/\/doi\.org\//, '').replace(/^doi:/, '')}
      </a>
    );
  };

  // Helper function to render evidence items (handles both string and object formats)
  const renderEvidenceItem = (item: string | { type: string; description: string; link: string }, index: number) => {
    if (typeof item === 'string') {
      // Handle legacy DOI string format
      return (
        <div key={index} className="pl-2 py-1 border-l-2 border-primary/20">
          {formatDOI(item)}
        </div>
      );
    } else {
      // Handle new object format
      return (
        <div key={index} className="pl-2 py-2 border-l-2 border-primary/20 space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {item.type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <a 
            href={item.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <FileText className="h-4 w-4" />
            View Evidence
          </a>
        </div>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between flex-wrap gap-2">
          <span>Evidence & Limitations</span>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Show dual-axis badges if available */}
            {hasDualAxis && (
              <EvidenceImpactBadges 
                evidenceRigor={evidenceRigor as EvidenceRigorCode} 
                clinicalImpact={clinicalImpact as ClinicalImpactCode}
                size="md"
              />
            )}
            {/* Show legacy badge if no dual-axis */}
            {!hasDualAxis && evidenceLevel && (
              <EvidenceLevelBadge level={evidenceLevel} size="md" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dual-Axis Classification */}
        {(hasDualAxis || showEditor) && (
          <div className="p-4 bg-muted/50 rounded-lg border space-y-4">
            <h4 className="font-medium text-sm">Dual-Axis Classification</h4>
            
            {/* Evidence Rigor */}
            <div className="space-y-2">
              {showEditor ? (
                <>
                  <Label className="text-sm font-medium">Evidence Rigor (E0-E3)</Label>
                  <Select
                    value={evidenceRigor || ''}
                    onValueChange={(v) => updateField('evidenceRigor', v || undefined)}
                  >
                    <SelectTrigger className="bg-background w-full">
                      <SelectValue placeholder="Select evidence rigor" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {EVIDENCE_RIGOR_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : evidenceRigor && (
                <div className="text-sm">
                  <span className="font-medium">Evidence Rigor:</span>{" "}
                  <span className="text-muted-foreground">
                    {EVIDENCE_RIGOR_OPTIONS.find(o => o.value === evidenceRigor)?.label}
                  </span>
                </div>
              )}
              
              <EditableField
                fieldPath="evidenceRigorNotes"
                value={evidenceRigorNotes}
                type="textarea"
                placeholder="Notes about evidence rigor"
              >
                {evidenceRigorNotes && (
                  <p className="text-sm text-muted-foreground">{evidenceRigorNotes}</p>
                )}
              </EditableField>
            </div>

            {/* Clinical Impact */}
            <div className="space-y-2">
              {showEditor ? (
                <>
                  <Label className="text-sm font-medium">Clinical Impact (I0-I5)</Label>
                  <Select
                    value={clinicalImpact || ''}
                    onValueChange={(v) => updateField('clinicalImpact', v || undefined)}
                  >
                    <SelectTrigger className="bg-background w-full">
                      <SelectValue placeholder="Select clinical impact" />
                    </SelectTrigger>
                    <SelectContent className="bg-background z-50">
                      {CLINICAL_IMPACT_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              ) : clinicalImpact && (
                <div className="text-sm">
                  <span className="font-medium">Clinical Impact:</span>{" "}
                  <span className="text-muted-foreground">
                    {CLINICAL_IMPACT_OPTIONS.find(o => o.value === clinicalImpact)?.label}
                  </span>
                </div>
              )}
              
              <EditableField
                fieldPath="clinicalImpactNotes"
                value={clinicalImpactNotes}
                type="textarea"
                placeholder="Notes about clinical impact"
              >
                {clinicalImpactNotes && (
                  <p className="text-sm text-muted-foreground">{clinicalImpactNotes}</p>
                )}
              </EditableField>
            </div>
          </div>
        )}

        {/* Legacy Single-Axis Classification */}
        {(evidenceLevel || showEditor) && (
          <div className="p-3 bg-muted/30 rounded-lg border space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              Legacy Classification
              {hasDualAxis && <span className="ml-2 text-xs">(for backward compatibility)</span>}
            </h4>
            {showEditor && (
              <div className="space-y-1">
                <Label className="text-sm font-medium">Evidence Level</Label>
                <Select
                  value={evidenceLevel || ''}
                  onValueChange={(v) => updateField('evidenceLevel', v || undefined)}
                >
                  <SelectTrigger className="bg-background w-full">
                    <SelectValue placeholder="Select evidence level" />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    {LEGACY_EVIDENCE_LEVELS.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <p className="text-sm font-medium mb-1">Evidence Level Notes:</p>
              <EditableField
                fieldPath="evidenceLevelNotes"
                value={evidenceLevelNotes}
                type="textarea"
                placeholder="Add notes about the evidence level"
              >
                <p className="text-sm text-muted-foreground">
                  {evidenceLevelNotes || "No notes provided"}
                </p>
              </EditableField>
            </div>
          </div>
        )}

        {/* Limitations Section */}
        <div>
          <h3 className="font-medium text-lg mb-2">Limitations</h3>
          <EditableField
            fieldPath="limitations"
            value={limitations || []}
            type="array"
            placeholder="Add a limitation"
          >
            {hasLimitations ? (
              <ul className="space-y-1">
                {limitations!.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-1 text-amber-500 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground italic">No limitations specified</p>
            )}
          </EditableField>
        </div>

        {/* Evidence Editor in edit mode */}
        {showEditor && (
          <EvidenceEditor fieldPath="evidence" />
        )}

        {/* Evidence Section - display only when not in edit mode */}
        {!showEditor && hasEvidence && (
          <div>
            <h3 className="font-medium text-lg mb-2">Clinical Evidence</h3>
            <div className="space-y-2">
              {evidence!.map((item, index) => renderEvidenceItem(item, index))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EvidenceLimitationsDetails;
