import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { ProductDetails } from "@/types/productDetails";
import { getProductGitHubUrl } from "@/utils/githubUrlHelper";
import { EditableField, useProductEdit } from "@/components/product-editor";

interface ContactInformationProps {
  product: ProductDetails;
}

const ContactInformation = ({ product }: ContactInformationProps) => {
  const { isEditMode, editedProduct } = useProductEdit();
  
  // Use edited product when in edit mode, otherwise use the original
  const displayProduct = isEditMode && editedProduct ? editedProduct : product;
  
  const githubUrl = getProductGitHubUrl(displayProduct);
  const websiteUrl = displayProduct.website || displayProduct.productUrl;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Website:</p>
          <EditableField
            fieldPath="website"
            value={displayProduct.website}
            type="url"
            placeholder="Website URL"
          >
            {websiteUrl ? (
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                {websiteUrl}
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="text-muted-foreground">N/A</p>
            )}
          </EditableField>
        </div>
        
        
        {githubUrl && (
          <div>
            <p className="text-sm font-medium">Source Code:</p>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
              View on GitHub
              <Github className="h-4 w-4" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
