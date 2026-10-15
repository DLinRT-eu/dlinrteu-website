import { Link } from 'react-router-dom';
import type { ProductDetails } from '@/types/productDetails';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { isDiscontinuedProduct } from '@/utils/productLifecycle';

export default function ProductLifecycleNotice({ product }: { product: ProductDetails }) {
  const discontinued = isDiscontinuedProduct(product);
  const status = product.market?.status;
  if (!discontinued && !status) return null;
  return <Alert>
    <AlertTitle>{discontinued ? 'Discontinued — historical record' : status?.verification === 'unconfirmed' ? 'Market availability under review' : 'Market status'}</AlertTitle>
    <AlertDescription className="space-y-2">
      <p>{status?.reason ?? 'No longer marketed for new sales. This page preserves the historical product record.'}</p>
      {status && <p>{status.region ? `Region: ${status.region}. ` : ''}{status.effectiveDate ? `Effective: ${status.effectiveDate}. ` : ''}Checked {status.sourceRetrievedOn}. {status.sourceAccess === 'public' ? 'Public source' : 'Non-public source'}: {status.sourceUrl ? <a href={status.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">{status.source}</a> : status.source}</p>}
      {discontinued && <p>Specifications, clearances and evidence are historical; discontinuation does not establish regulatory withdrawal or end of support. <Link to="/products/discontinued" className="text-primary underline">Discontinued products</Link></p>}
      {product.supersededBy && <Link to={`/product/${product.supersededBy}`} className="text-primary underline">Documented successor</Link>}
    </AlertDescription>
  </Alert>;
}