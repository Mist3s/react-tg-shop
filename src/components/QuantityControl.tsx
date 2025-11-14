import React from 'react';

interface QuantityControlProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({ value, onDecrease, onIncrease }) => (
  <div className="quantity-control">
    <button className="icon-button" onClick={onDecrease} aria-label="Уменьшить количество">
      −
    </button>
    <span className="quantity-value">{value}</span>
    <button className="icon-button" onClick={onIncrease} aria-label="Увеличить количество">
      +
    </button>
  </div>
);
