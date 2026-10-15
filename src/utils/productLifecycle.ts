import type { ProductDetails } from '@/types/productDetails';

export const isDiscontinuedProduct = (product: ProductDetails): boolean =>
  product.developmentStage === 'discontinued' && product.market?.status?.verification !== 'unconfirmed';

export const selectDiscontinuedProducts = (products: ProductDetails[]): ProductDetails[] =>
  products.filter(isDiscontinuedProduct);