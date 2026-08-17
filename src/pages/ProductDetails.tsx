
import { Link, useParams } from 'react-router-dom';
import ProductDetailsPage from '@/components/ProductDetails';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { generateMedicalDeviceSchema } from '@/utils/schemaOrg/medicalDeviceSchema';

const ProductDetailsRoute = () => {
  const { id } = useParams();
  const product = dataService.getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <SEO
          title="Product Not Found"
          description="This product is no longer listed in the DLinRT catalogue."
          noindex
        />
        <div className="text-center max-w-md space-y-4">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="text-muted-foreground">
            This product is not (or no longer) listed in the catalogue. It may have been renamed,
            merged with another entry, or archived.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link to="/products">Browse all products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/companies">Browse companies</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const structuredData = generateMedicalDeviceSchema(product);

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        canonical={`https://dlinrt.eu/product/${id}`}
        ogType="product"
        structuredData={structuredData}
      />
      <ProductDetailsPage product={product} />
    </>
  );
};

export default ProductDetailsRoute;
