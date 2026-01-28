import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { FileText, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EvidenceLevelBadge from "./EvidenceLevelBadge";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface EvidenceLimitationsDetailsProps {
  product: ProductDetails;
}

const EvidenceLimitationsDetails = ({ product }: EvidenceLimitationsDetailsProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  
  const { evidence, limitations, evidenceLevel, evidenceLevelNotes } = displayProduct;
  
  // Skip rendering if no evidence, limitations, or evidence level are available (unless in edit mode)
  const hasEvidence = evidence && evidence.length > 0;
  const hasLimitations = limitations && limitations.length > 0;
  const hasEvidenceLevel = !!evidenceLevel;
  
  if (!isEditMode && !hasEvidence && !hasLimitations && !hasEvidenceLevel) {
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
        <CardTitle className="flex items-center justify-between">
          <span>Evidence & Limitations</span>
          {evidenceLevel && <EvidenceLevelBadge level={evidenceLevel} size="md" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Evidence Level Summary */}
        {(evidenceLevel || isEditMode) && (
          <div className="p-3 bg-muted/50 rounded-lg border">
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

        {/* Evidence Section - read-only for now as it has complex structure */}
        {hasEvidence && (
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
