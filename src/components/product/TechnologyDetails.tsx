import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductDetails } from "@/types/productDetails";
import { Server, Cloud, Clock, Play } from "lucide-react";

interface TechnologyDetailsProps {
  product: ProductDetails;
}

const TechnologyDetails = ({ product }: TechnologyDetailsProps) => {
  if (!product.technology) return null;

  const { integration, deployment, triggerForAnalysis, processingTime } = product.technology;

  // Check if there's any data to display
  if (!integration && !deployment && !triggerForAnalysis && !processingTime) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Technology & Deployment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integration && (
            <div className="flex items-start gap-3">
              <Server className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Integration</p>
                <p className="text-sm text-muted-foreground">
                  {Array.isArray(integration) 
                    ? integration.join(", ") 
                    : integration}
                </p>
              </div>
            </div>
          )}
          {deployment && (
            <div className="flex items-start gap-3">
              <Cloud className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Deployment</p>
                <p className="text-sm text-muted-foreground">
                  {Array.isArray(deployment)
                    ? deployment.join(", ")
                    : deployment}
                </p>
              </div>
            </div>
          )}
          {triggerForAnalysis && (
            <div className="flex items-start gap-3">
              <Play className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Trigger for Analysis</p>
                <p className="text-sm text-muted-foreground">{triggerForAnalysis}</p>
              </div>
            </div>
          )}
          {processingTime && (
            <div className="flex items-start gap-3">
              <Clock className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Processing Time</p>
                <p className="text-sm text-muted-foreground">{processingTime}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnologyDetails;
