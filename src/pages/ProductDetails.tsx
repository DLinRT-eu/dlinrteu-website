
import { useParams } from 'react-router-dom';
import ProductDetailsPage from '@/components/ProductDetails';
import dataService from '@/services/DataService';
import SEO from '@/components/SEO';
import { generateMedicalDeviceSchema } from '@/utils/schemaOrg/medicalDeviceSchema';

const ProductDetailsRoute = () => {
  const { id } = useParams();
  const product = dataService.getProductById(id || '');

  if (!product) {
    return (
      <div className="p-8 text-center">
        <SEO
          title="Product Not Found"
          description="The requested product could not be found."
          canonical="https://dlinrt.eu/products"
        />
        Product not found
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
