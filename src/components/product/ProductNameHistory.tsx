import type { ProductDetails } from '@/types/productDetails';

export default function ProductNameHistory({ product }: { product: ProductDetails }) {
  if (!product.nameHistory?.length) return null;
  return (
    <section className="w-full border-t border-border pt-4">
      <details>
        <summary className="cursor-pointer text-sm font-medium text-foreground">Product naming history</summary>
        <p className="my-3 text-sm text-muted-foreground">Current application: {product.name}. Former module names remain in publications and regulatory documentation; regrouping does not imply a new device clearance.</p>
        <ul className="space-y-3 text-sm">
          {product.nameHistory.map(item => (
            <li key={`${item.name}-${item.productId}`}>
              <strong>{item.name}</strong>{item.version ? ` · v${item.version}` : ''}
              <p className="text-muted-foreground">{item.function}</p>
              {item.notes && <p className="text-muted-foreground">{item.notes}</p>}
              <a className="text-primary underline" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Source · checked {item.retrievedOn}</a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}