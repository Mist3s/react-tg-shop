import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { fetchCategories, fetchProducts } from '../api/catalog';
import type { CategoryFilterValue, Product } from '../types';

interface CatalogPageProps {
  onSelectProduct: (productId: string) => void;
  activeCategory: CategoryFilterValue;
  onCategoryChange: (category: CategoryFilterValue) => void;
}

const LOAD_BATCH_SIZE = 5;

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  activeCategory,
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState<{ id: CategoryFilterValue; label: string }[]>([
    { id: 'all', label: 'Все' },
  ]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchCategories()
      .then((response) =>
        setCategories([{ id: 'all', label: 'Все' }, ...response.items.map((item) => ({ id: item.id, label: item.label }))])
      )
      .catch(() => setError('Не удалось загрузить категории'));
  }, []);

  const loadProducts = useCallback(
    async (mode: 'reset' | 'append') => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchProducts({
          category: activeCategory === 'all' ? undefined : activeCategory,
          offset: mode === 'append' ? products.length : 0,
          limit: LOAD_BATCH_SIZE,
        });

        if (mode === 'reset') {
          setProducts(response.items);
        } else {
          setProducts((prev) => [...prev, ...response.items]);
        }

        setHasMore(response.items.length + (mode === 'append' ? products.length : 0) < response.total);
      } catch (err) {
        console.error(err);
        setError('Не удалось загрузить товары');
      } finally {
        setIsLoading(false);
      }
    },
    [activeCategory, isLoading, products.length]
  );

  useEffect(() => {
    void loadProducts('reset');
  }, [activeCategory, loadProducts]);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            void loadProducts('append');
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
  }, [hasMore, loadProducts]);

  return (
    <div className="page catalog-page">
      <CategoryFilter options={categories} activeCategory={activeCategory} onSelect={onCategoryChange} />
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onClick={() => onSelectProduct(product.id)} />
        ))}
      </div>
      {error && <div className="infinite-scroll-status">{error}</div>}
      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
      <div className="infinite-scroll-status">
        {!isLoading && products.length === 0 && <span>Товары не найдены</span>}
        {isLoading && <span>Загрузка...</span>}
        {!isLoading && products.length > 0 && !hasMore && <span>Вы просмотрели все товары</span>}
      </div>
    </div>
  );
};
