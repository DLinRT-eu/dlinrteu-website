import { ExternalLink, Package } from "lucide-react";
import type { ProductDetails } from "@/types/productDetails";

interface PartOfDetailsProps {
  product: ProductDetails;
}

const PartOfDetails = ({ product }: PartOfDetailsProps) => {
  if (!product.partOf) {
    return null;
  }

  const { name, version, productUrl, relationship } = product.partOf;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2 mb-4">
      <Package className="h-4 w-4 flex-shrink-0" />
      <span>
        <span className="font-medium">Part of:</span>{" "}
        {productUrl ? (
          <a
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            {name}
            {version && <span className="text-muted-foreground">v{version}</span>}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <>
            {name}
            {version && <span className="ml-1">v{version}</span>}
          </>
        )}
        {relationship && (
          <span className="ml-2 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
            {relationship}
          </span>
        )}
      </span>
    </div>
  );
};

export default PartOfDetails;
