import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import type { Category } from '../types';

interface CatalogPageProps {
  onSelectProduct: (productId: string) => void;
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const LOAD_BATCH_SIZE = 10;

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  activeCategory,
  onCategoryChange,
}) => {
  const [visibleCount, setVisibleCount] = useState(LOAD_BATCH_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(LOAD_BATCH_SIZE);
  }, [activeCategory]);

  const filteredProducts = useMemo(
    () =>
      activeCategory === 'all'
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    setVisibleCount((prev) =>
      filteredProducts.length === 0 ? 0 : Math.min(prev, filteredProducts.length)
    );
  }, [filteredProducts]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredProducts.length;

  useEffect(() => {
    if (!canLoadMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCount((prev) =>
              Math.min(prev + LOAD_BATCH_SIZE, filteredProducts.length)
            );
          }
        });
      },
      { rootMargin: '200px' }
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [canLoadMore, filteredProducts]);

  return (
    <div className="page catalog-page">
      <CategoryFilter activeCategory={activeCategory} onSelect={onCategoryChange} />
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product.id)} />
        ))}
      </div>
      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
      <div className="infinite-scroll-status">
        {filteredProducts.length === 0 && <span>Товары не найдены</span>}
        {filteredProducts.length > 0 && !canLoadMore && <span>Вы просмотрели все товары</span>}
      </div>
    </div>
  );
};
