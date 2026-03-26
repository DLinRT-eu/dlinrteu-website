import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface MarketPricingProps {
  product: ProductDetails;
}

const MarketPricingDetails = ({ product }: MarketPricingProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  const market = displayProduct.market;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Market Information Section */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">On Market Since:</p>
              <EditableField
                fieldPath="market.onMarketSince"
                value={market?.onMarketSince}
                type="text"
                placeholder="Year or date"
              >
                <p className="text-muted-foreground">{market?.onMarketSince || "N/A"}</p>
              </EditableField>
            </div>
            
            <div>
              <p className="text-sm font-medium">Distribution Channels:</p>
              <EditableField
                fieldPath="market.distributionChannels"
                value={market?.distributionChannels || []}
                type="array"
                placeholder="Add channel"
              >
                <p className="text-muted-foreground">
                  {market?.distributionChannels?.join(", ") || "N/A"}
                </p>
              </EditableField>
            </div>
            
            <div>
              <p className="text-sm font-medium">Availability:</p>
              <EditableField
                fieldPath="market.availability"
                value={market?.availability}
                type="text"
                placeholder="Availability info"
              >
                <p className="text-muted-foreground">{market?.availability || "N/A"}</p>
              </EditableField>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketPricingDetails;
