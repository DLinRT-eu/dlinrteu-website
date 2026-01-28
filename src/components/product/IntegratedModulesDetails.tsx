import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { useProductEdit, IntegratedModulesEditor } from "@/components/product-editor";

interface IntegratedModulesDetailsProps {
  product: ProductDetails;
}

const IntegratedModulesDetails = ({ product }: IntegratedModulesDetailsProps) => {
  const { isEditMode, editedProduct, canEdit } = useProductEdit();
  
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  const showEditor = isEditMode && canEdit;
  
  // Show editor if in edit mode
  if (showEditor) {
    return <IntegratedModulesEditor fieldPath="integratedModules" />;
  }
  
  if (!displayProduct.integratedModules || displayProduct.integratedModules.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrated Clinical Modules</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {displayProduct.integratedModules.map((module, index) => (
          <div key={index} className="border-b last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{module.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {module.category}
                </Badge>
              </div>
              <a
                href={module.productUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Details
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {module.description}
            </p>
            
            {module.keyFeatures && module.keyFeatures.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium mb-2">Key Capabilities:</p>
                <ul className="space-y-1">
                  {module.keyFeatures.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IntegratedModulesDetails;
