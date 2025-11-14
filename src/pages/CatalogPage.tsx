import React, { useEffect, useMemo, useState } from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import type { Category } from '../types';

interface CatalogPageProps {
  onSelectProduct: (productId: string) => void;
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const PAGE_SIZE = 10;

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  activeCategory,
  onCategoryChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);
  const clampedPage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE
  );

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  return (
    <div className="page catalog-page">
      <CategoryFilter activeCategory={activeCategory} onSelect={onCategoryChange} />
      <div className="product-grid">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product.id)} />
        ))}
      </div>
      {filteredProducts.length > PAGE_SIZE && (
        <div className="pagination">
          <button
            type="button"
            className="ghost-button"
            onClick={() => handlePageChange(clampedPage - 1)}
            disabled={clampedPage === 1}
          >
            Назад
          </button>
          <div className="pagination-status">
            Страница {clampedPage} из {totalPages}
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={() => handlePageChange(clampedPage + 1)}
            disabled={clampedPage === totalPages}
          >
            Далее
          </button>
        </div>
      )}
    </div>
  );
};
