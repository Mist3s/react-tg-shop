import React from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import type { Category } from '../types';

interface CatalogPageProps {
  onSelectProduct: (productId: string) => void;
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  activeCategory,
  onCategoryChange,
}) => {
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <div className="page catalog-page">
      <CategoryFilter activeCategory={activeCategory} onSelect={onCategoryChange} />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product.id)} />
        ))}
      </div>
    </div>
  );
};
