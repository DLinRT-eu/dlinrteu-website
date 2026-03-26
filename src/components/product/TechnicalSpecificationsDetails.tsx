import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface TechnicalSpecificationsProps {
  product: ProductDetails;
}

// Helper function to format array or string fields
const formatField = (value: any): string => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return "-";
  }
  
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  
  return String(value);
};

const TechnicalSpecificationsDetails = ({ product }: TechnicalSpecificationsProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  const techSpecs = displayProduct.technicalSpecifications;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Population:</p>
            <EditableField
              fieldPath="technicalSpecifications.population"
              value={techSpecs?.population}
              type="text"
              placeholder="Target population"
            >
              <p className="text-muted-foreground">{formatField(techSpecs?.population)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Input:</p>
            <EditableField
              fieldPath="technicalSpecifications.input"
              value={techSpecs?.input || []}
              type="array"
              placeholder="Add input type"
            >
              <p className="text-muted-foreground">{formatField(techSpecs?.input)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Input Format:</p>
            <EditableField
              fieldPath="technicalSpecifications.inputFormat"
              value={techSpecs?.inputFormat || []}
              type="array"
              placeholder="Add input format"
            >
              <p className="text-muted-foreground">{formatField(techSpecs?.inputFormat)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Output:</p>
            <EditableField
              fieldPath="technicalSpecifications.output"
              value={techSpecs?.output || []}
              type="array"
              placeholder="Add output type"
            >
              <p className="text-muted-foreground">{formatField(techSpecs?.output)}</p>
            </EditableField>
          </div>
          
          <div>
            <p className="text-sm font-medium">Output Format:</p>
            <EditableField
              fieldPath="technicalSpecifications.outputFormat"
              value={techSpecs?.outputFormat || []}
              type="array"
              placeholder="Add output format"
            >
              <p className="text-muted-foreground">{formatField(techSpecs?.outputFormat)}</p>
            </EditableField>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalSpecificationsDetails;
