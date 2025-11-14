import React from 'react';
import { categories } from '../data/products';
import type { Category } from '../types';

interface CategoryFilterProps {
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onSelect }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`chip ${activeCategory === category.id ? 'chip-active' : ''}`}
          onClick={() => onSelect(category.id)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
