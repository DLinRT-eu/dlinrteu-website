import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductDetails } from "@/types/productDetails";
import { Server, Cloud, Clock, Play } from "lucide-react";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface TechnologyDetailsProps {
  product: ProductDetails;
}

const TechnologyDetails = ({ product }: TechnologyDetailsProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  const technology = displayProduct.technology;
  
  // In edit mode, always show the card even if empty (to allow adding data)
  if (!isEditMode && !technology) return null;

  const { integration, deployment, triggerForAnalysis, processingTime } = technology || {};

  // Check if there's any data to display (skip this check in edit mode)
  if (!isEditMode && !integration && !deployment && !triggerForAnalysis && !processingTime) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Technology & Deployment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Server className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Integration</p>
              <EditableField
                fieldPath="technology.integration"
                value={integration || []}
                type="array"
                placeholder="Add integration type"
              >
                <p className="text-sm text-muted-foreground">
                  {integration 
                    ? (Array.isArray(integration) ? integration.join(", ") : integration)
                    : "-"}
                </p>
              </EditableField>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Cloud className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Deployment</p>
              <EditableField
                fieldPath="technology.deployment"
                value={deployment || []}
                type="array"
                placeholder="Add deployment option"
              >
                <p className="text-sm text-muted-foreground">
                  {deployment
                    ? (Array.isArray(deployment) ? deployment.join(", ") : deployment)
                    : "-"}
                </p>
              </EditableField>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Play className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Trigger for Analysis</p>
              <EditableField
                fieldPath="technology.triggerForAnalysis"
                value={triggerForAnalysis}
                type="text"
                placeholder="Trigger type"
              >
                <p className="text-sm text-muted-foreground">{triggerForAnalysis || "-"}</p>
              </EditableField>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Processing Time</p>
              <EditableField
                fieldPath="technology.processingTime"
                value={processingTime}
                type="text"
                placeholder="Processing time"
              >
                <p className="text-sm text-muted-foreground">{processingTime || "-"}</p>
              </EditableField>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnologyDetails;
