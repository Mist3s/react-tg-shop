import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { QuantityControl } from '../components/QuantityControl';

interface ProductPageProps {
  productId: string;
  onGoToCart: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ productId, onGoToCart }) => {
  const product = products.find((item) => item.id === productId);
  const { addItem, updateItem, getItemQuantity } = useCart();

  const productTotal = product
    ? product.variants.reduce((sum, variant) => {
        const quantity = getItemQuantity(product.id, variant.id);
        return sum + quantity * variant.price;
      }, 0)
    : 0;

  if (!product) {
    return <div className="page">Товар не найден</div>;
  }

  return (
    <div className="page product-page">
      <img src={product.image} alt={product.name} className="product-hero" />
      <h1 className="page-title">{product.name}</h1>
      <p className="product-description">{product.description}</p>
      {product.tags.length > 0 && (
        <div className="tag-list">
          {product.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      <section className="variant-section">
        <h2 className="section-title">Выбор упаковки</h2>
        <div className="variant-list">
          {product.variants.map((variant) => {
            const quantity = getItemQuantity(product.id, variant.id);
            return (
              <div key={variant.id} className="variant-card">
                <div>
                  <div className="variant-weight">{variant.weight}</div>
                  <div className="variant-price">{variant.price.toLocaleString('ru-RU')} ₽</div>
                </div>
                {quantity > 0 ? (
                  <QuantityControl
                    value={quantity}
                    onDecrease={() => updateItem(product.id, variant.id, quantity - 1)}
                    onIncrease={() => updateItem(product.id, variant.id, quantity + 1)}
                  />
                ) : (
                  <button className="primary-button" onClick={() => addItem(product.id, variant.id)}>
                    Добавить
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="bottom-bar">
        <div>
          <div className="bottom-bar-label">Сумма по товару</div>
          <div className="bottom-bar-value">{productTotal.toLocaleString('ru-RU')} ₽</div>
        </div>
        <button className="cta-button" onClick={onGoToCart}>
          Перейти в корзину
        </button>
      </div>
    </div>
  );
};
