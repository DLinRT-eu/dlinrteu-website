import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { ExternalLink } from "lucide-react";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface GeneralInformationProps {
  product: ProductDetails;
}

// Helper function to display standard format for missing data
const formatField = (value: any): string => {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  return String(value);
};

// Format date to YYYY-MM-DD
const formatDate = (dateString: string | undefined): string => {
  if (!dateString || dateString === "0000-00-00" || dateString.trim() === "") return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  return date.toISOString().split('T')[0];
};

const GeneralInformationDetails = ({ product }: GeneralInformationProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  
  // Set default source if not specified
  const sourceInfo = displayProduct.source || "automatically retrieved";
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Company:</p>
            <EditableField
              fieldPath="company"
              value={displayProduct.company}
              type="text"
              placeholder="Company name"
            >
              <p className="text-muted-foreground">{formatField(displayProduct.company)}</p>
            </EditableField>
          </div>
          
          {displayProduct.developedBy && (
            <div>
              <p className="text-sm font-medium">Developed By:</p>
              <div className="text-muted-foreground">
                {displayProduct.developedBy.companyUrl ? (
                  <a 
                    href={displayProduct.developedBy.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {displayProduct.developedBy.company}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span>{displayProduct.developedBy.company}</span>
                )}
                {displayProduct.developedBy.relationship && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({displayProduct.developedBy.relationship})
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium">Category:</p>
            <EditableField
              fieldPath="category"
              value={displayProduct.category}
              type="text"
              placeholder="Product category"
            >
              <p className="text-muted-foreground">{formatField(displayProduct.category)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Secondary Categories:</p>
            <EditableField
              fieldPath="secondaryCategories"
              value={displayProduct.secondaryCategories || []}
              type="array"
              placeholder="Add category"
            >
              <p className="text-muted-foreground">
                {displayProduct.secondaryCategories && displayProduct.secondaryCategories.length > 0 
                  ? displayProduct.secondaryCategories.join(", ") 
                  : "-"}
              </p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Modality:</p>
            <EditableField
              fieldPath="modality"
              value={Array.isArray(displayProduct.modality) ? displayProduct.modality : displayProduct.modality ? [displayProduct.modality] : []}
              type="array"
              placeholder="Add modality"
            >
              <p className="text-muted-foreground">
                {Array.isArray(displayProduct.modality) 
                  ? displayProduct.modality.join(", ") 
                  : formatField(displayProduct.modality)}
              </p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Anatomical Location:</p>
            <EditableField
              fieldPath="anatomy"
              value={displayProduct.anatomy || []}
              type="array"
              placeholder="Add anatomy"
            >
              <p className="text-muted-foreground">
                {displayProduct.anatomy && displayProduct.anatomy.length > 0 
                  ? displayProduct.anatomy.join(", ") 
                  : "-"}
              </p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Subspeciality:</p>
            <EditableField
              fieldPath="subspeciality"
              value={displayProduct.subspeciality}
              type="text"
              placeholder="Subspeciality"
            >
              <p className="text-muted-foreground">{formatField(displayProduct.subspeciality)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Disease Targeted:</p>
            <EditableField
              fieldPath="diseaseTargeted"
              value={displayProduct.diseaseTargeted || []}
              type="array"
              placeholder="Add disease"
            >
              <p className="text-muted-foreground">
                {displayProduct.diseaseTargeted && displayProduct.diseaseTargeted.length > 0 
                  ? displayProduct.diseaseTargeted.join(", ") 
                  : "-"}
              </p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Release Date:</p>
            <EditableField
              fieldPath="releaseDate"
              value={displayProduct.releaseDate}
              type="date"
              placeholder="Release date"
            >
              <p className="text-muted-foreground">{formatDate(displayProduct.releaseDate)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Version:</p>
            <EditableField
              fieldPath="version"
              value={displayProduct.version}
              type="text"
              placeholder="Version"
            >
              <p className="text-muted-foreground">{formatField(displayProduct.version)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Certification:</p>
            <EditableField
              fieldPath="certification"
              value={displayProduct.certification}
              type="text"
              placeholder="Certification"
            >
              <p className="text-muted-foreground">{formatField(displayProduct.certification)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Data Source:</p>
            <EditableField
              fieldPath="source"
              value={displayProduct.source}
              type="text"
              placeholder="Data source"
            >
              <p className="text-muted-foreground">{formatField(sourceInfo)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Revised by Company:</p>
            <EditableField
              fieldPath="companyRevisionDate"
              value={displayProduct.companyRevisionDate}
              type="date"
              placeholder="Revision date"
            >
              <p className="text-muted-foreground">{formatDate(displayProduct.companyRevisionDate)}</p>
            </EditableField>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInformationDetails;
