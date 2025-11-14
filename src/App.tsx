import React, { useMemo, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { Layout } from './components/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import type { Category, OrderSummary, Page } from './types';

const AppContent: React.FC = () => {
  const { totalCount } = useCart();
  const [page, setPage] = useState<Page>('catalog');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  const layoutTitle = useMemo(() => {
    switch (page) {
      case 'catalog':
        return 'Каталог';
      case 'product':
        return 'Товар';
      case 'cart':
        return 'Корзина';
      case 'checkout':
        return 'Оформление';
      case 'confirmation':
        return 'Готово';
      default:
        return 'TeaGram';
    }
  }, [page]);

  const handleBack = () => {
    switch (page) {
      case 'product':
        setPage('catalog');
        break;
      case 'cart':
        setPage(selectedProductId ? 'product' : 'catalog');
        break;
      case 'checkout':
        setPage('cart');
        break;
      case 'confirmation':
        setPage('catalog');
        break;
      default:
        break;
    }
  };

  const showBackButton = page !== 'catalog';

  return (
    <Layout
      title={layoutTitle}
      cartCount={totalCount}
      showBackButton={showBackButton}
      onBack={handleBack}
      onCartClick={() => setPage('cart')}
    >
      {page === 'catalog' && (
        <CatalogPage
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={(productId) => {
            setSelectedProductId(productId);
            setPage('product');
          }}
        />
      )}

      {page === 'product' && selectedProductId && (
        <ProductPage
          productId={selectedProductId}
          onGoToCart={() => {
            setPage('cart');
          }}
        />
      )}

      {page === 'cart' && (
        <CartPage
          onContinueShopping={() => setPage('catalog')}
          onCheckout={() => setPage('checkout')}
        />
      )}

      {page === 'checkout' && (
        <CheckoutPage
          onBackToCart={() => setPage('cart')}
          onOrderComplete={(summary) => {
            setOrderSummary(summary);
            setPage('confirmation');
          }}
        />
      )}

      {page === 'confirmation' && orderSummary && (
        <ConfirmationPage
          summary={orderSummary}
          onGoToCatalog={() => {
            setPage('catalog');
            setOrderSummary(null);
            setSelectedProductId(null);
          }}
        />
      )}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
};

export default App;
