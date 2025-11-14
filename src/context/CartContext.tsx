import { createContext, useContext, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { CartItem, Product, ProductVariant } from '../types';
import { products } from '../data/products';

interface CartContextValue {
  items: CartItem[];
  addItem: (productId: string, variantId: string) => void;
  updateItem: (productId: string, variantId: string, quantity: number) => void;
  clear: () => void;
  getItemQuantity: (productId: string, variantId: string) => number;
  totalCount: number;
  totalPrice: number;
  resolveProduct: (productId: string) => Product | undefined;
  resolveVariant: (productId: string, variantId: string) => ProductVariant | undefined;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'tea-shop-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useLocalStorage<CartItem[]>(STORAGE_KEY, []);

  const addItem = (productId: string, variantId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId && item.variantId === variantId);
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, variantId, quantity: 1 }];
    });
  };

  const updateItem = (productId: string, variantId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => !(item.productId === productId && item.variantId === variantId));
      }
      return prev.map((item) =>
        item.productId === productId && item.variantId === variantId ? { ...item, quantity } : item
      );
    });
  };

  const clear = () => setItems([]);

  const getItemQuantity = (productId: string, variantId: string) =>
    items.find((item) => item.productId === productId && item.variantId === variantId)?.quantity ?? 0;

  const resolveProduct = (productId: string) => products.find((product) => product.id === productId);

  const resolveVariant = (productId: string, variantId: string) =>
    resolveProduct(productId)?.variants.find((variant) => variant.id === variantId);

  const totals = items.reduce(
    (acc, item) => {
      const variant = resolveVariant(item.productId, item.variantId);
      if (variant) {
        acc.totalPrice += variant.price * item.quantity;
        acc.totalCount += item.quantity;
      }
      return acc;
    },
    { totalCount: 0, totalPrice: 0 }
  );

  const value: CartContextValue = {
    items,
    addItem,
    updateItem,
    clear,
    getItemQuantity,
    totalCount: totals.totalCount,
    totalPrice: totals.totalPrice,
    resolveProduct,
    resolveVariant,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};
