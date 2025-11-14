import React, { useMemo, useState } from 'react';
import { useCart } from '../context/CartContext';
import type { OrderSummary } from '../types';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderComplete: (summary: OrderSummary) => void;
}

type DeliveryMethod = 'pickup' | 'courier' | 'cdek';

interface FormState {
  name: string;
  phone: string;
  delivery: DeliveryMethod;
  address: string;
  comment: string;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToCart, onOrderComplete }) => {
  const { items, totalCount, totalPrice, clear } = useCart();
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    delivery: 'pickup',
    address: '',
    comment: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isAddressRequired = form.delivery === 'courier';

  const validate = () => {
    const nextErrors: string[] = [];
    if (!form.name.trim()) {
      nextErrors.push('Введите имя');
    }
    if (!form.phone.trim()) {
      nextErrors.push('Введите телефон');
    }
    if (isAddressRequired && !form.address.trim()) {
      nextErrors.push('Укажите адрес для доставки курьером');
    }
    setErrors(nextErrors);
    return nextErrors.length === 0;
  };

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = Math.random() > 0.05;

    if (!success) {
      setSubmitError('Не удалось оформить заказ, попробуйте ещё раз');
      setIsSubmitting(false);
      return;
    }

    const summary: OrderSummary = {
      orderId: `TG-${Date.now().toString().slice(-6)}`,
      customerName: form.name.trim(),
      deliveryMethod:
        form.delivery === 'pickup'
          ? 'Самовывоз'
          : form.delivery === 'courier'
          ? 'Курьер'
          : 'СДЭК',
      total: totalPrice,
    };

    clear();
    setIsSubmitting(false);
    onOrderComplete(summary);
  };

  const deliveryOptions: { value: DeliveryMethod; label: string }[] = useMemo(
    () => [
      { value: 'pickup', label: 'Самовывоз' },
      { value: 'courier', label: 'Курьер' },
      { value: 'cdek', label: 'СДЭК' },
    ],
    []
  );

  if (items.length === 0) {
    return (
      <div className="page checkout-page">
        <div className="empty-state">
          <p>Корзина пуста</p>
          <button className="cta-button" onClick={onBackToCart}>
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <section>
          <h2 className="section-title">Контактные данные</h2>
          <label className="form-label">
            Имя*
            <input
              className="input"
              type="text"
              value={form.name}
              onChange={(event) => handleChange('name', event.target.value)}
              placeholder="Как к вам обращаться"
            />
          </label>
          <label className="form-label">
            Телефон*
            <input
              className="input"
              type="tel"
              value={form.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
              placeholder="+7 ___ ___-__-__"
            />
          </label>
        </section>

        <section>
          <h2 className="section-title">Доставка</h2>
          <div className="delivery-options">
            {deliveryOptions.map((option) => (
              <button
                type="button"
                key={option.value}
                className={`chip ${form.delivery === option.value ? 'chip-active' : ''}`}
                onClick={() => handleChange('delivery', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <label className="form-label">
            {form.delivery === 'pickup' ? 'Адрес самовывоза' : 'Адрес доставки'}
            <input
              className="input"
              type="text"
              value={form.address}
              onChange={(event) => handleChange('address', event.target.value)}
              placeholder={
                form.delivery === 'pickup'
                  ? 'г. Москва, Китай-город, ул. Чайная, 7'
                  : 'Улица, дом, квартира'
              }
            />
          </label>
        </section>

        <section>
          <h2 className="section-title">Комментарий</h2>
          <textarea
            className="textarea"
            value={form.comment}
            onChange={(event) => handleChange('comment', event.target.value)}
            placeholder="Например, позвоните за час до доставки"
            rows={3}
          />
        </section>

        <section>
          <h2 className="section-title">Оплата</h2>
          <div className="payment-info">Оплата при получении</div>
        </section>

        <section className="checkout-summary">
          <div className="summary-row">
            <span>Позиций</span>
            <span>{totalCount}</span>
          </div>
          <div className="summary-row">
            <span>Сумма заказа</span>
            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
        </section>

        {errors.length > 0 && (
          <div className="form-errors">
            {errors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}
        {submitError && <div className="form-errors">{submitError}</div>}

        <div className="checkout-actions">
          <button type="button" className="ghost-button" onClick={onBackToCart} disabled={isSubmitting}>
            Назад в корзину
          </button>
          <button type="submit" className="cta-button" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Подтвердить заказ'}
          </button>
        </div>
      </form>
    </div>
  );
};
