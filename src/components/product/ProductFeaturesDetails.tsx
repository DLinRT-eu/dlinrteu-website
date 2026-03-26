import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { getKeyFeatures } from "@/lib/utils";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface ProductFeaturesProps {
  product: ProductDetails;
}

const ProductFeaturesDetails = ({ product }: ProductFeaturesProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  const keyFeatures = getKeyFeatures(displayProduct);
  
  // In edit mode, always show the card even if empty (to allow adding features)
  if (!isEditMode && keyFeatures.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Features</CardTitle>
      </CardHeader>
      <CardContent>
        <EditableField
          fieldPath="keyFeatures"
          value={displayProduct.keyFeatures || []}
          type="array"
          placeholder="Add a feature"
        >
          {keyFeatures.length > 0 ? (
            <ul className="list-disc pl-4 space-y-2">
              {keyFeatures.map((feature, index) => (
                <li key={index} className="text-muted-foreground">{feature}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">No key features specified</p>
          )}
        </EditableField>
      </CardContent>
    </Card>
  );
};

export default ProductFeaturesDetails;
