export type ProductCategory = 'green' | 'black' | 'oolong' | 'puer' | 'sets';
export type Category = 'all' | ProductCategory;

export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  tags: string[];
  image: string;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface OrderSummary {
  orderId: string;
  customerName: string;
  deliveryMethod: string;
  total: number;
}

export type Page =
  | 'catalog'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'confirmation';
