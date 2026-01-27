
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductDetails } from "@/types/productDetails";
import { ExternalLink } from "lucide-react";

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
  // Set default source if not specified
  const sourceInfo = product.source || "automatically retrieved";
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Company:</p>
            <p className="text-gray-500">{formatField(product.company)}</p>
          </div>
          {product.developedBy && (
            <div>
              <p className="text-sm font-medium">Developed By:</p>
              <div className="text-gray-500">
                {product.developedBy.companyUrl ? (
                  <a 
                    href={product.developedBy.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline inline-flex items-center gap-1"
                  >
                    {product.developedBy.company}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span>{product.developedBy.company}</span>
                )}
                {product.developedBy.relationship && (
                  <span className="text-xs text-gray-400 ml-2">
                    ({product.developedBy.relationship})
                  </span>
                )}
              </div>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Category:</p>
            <p className="text-gray-500">{formatField(product.category)}</p>
          </div>
          {product.secondaryCategories && product.secondaryCategories.length > 0 && (
            <div>
              <p className="text-sm font-medium">Secondary Categories:</p>
              <p className="text-gray-500">{product.secondaryCategories.join(", ")}</p>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">Release Date:</p>
            <p className="text-gray-500">{formatDate(product.releaseDate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Version:</p>
            <p className="text-gray-500">{formatField(product.version)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Certification:</p>
            <p className="text-gray-500">{formatField(product.certification)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Data Source:</p>
            <p className="text-gray-500">{formatField(sourceInfo)}</p>
          </div>
          {product.companyRevisionDate && (
            <div>
              <p className="text-sm font-medium">Revised by Company:</p>
              <p className="text-gray-500">{formatDate(product.companyRevisionDate)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInformationDetails;
