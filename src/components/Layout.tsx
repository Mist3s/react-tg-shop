import React from 'react';
import { Sun, Moon, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
  onCartClick?: () => void;
  cartCount: number;
  showBackButton?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  onBack,
  onCartClick,
  cartCount,
  showBackButton = false,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-left">
          {showBackButton ? (
            <button className="icon-button" onClick={onBack} aria-label="Назад">
              <ArrowLeft size={20} strokeWidth={2.2} />
            </button>
          ) : (
            <div className="logo">TeaGram</div>
          )}
        </div>
        <div className="header-title">{title}</div>
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Переключить тему">
            {theme === 'light' ? <Sun size={20} strokeWidth={2.2} /> : <Moon size={20} strokeWidth={2.2} />}
          </button>
          <button className="icon-button cart-button" onClick={onCartClick} aria-label="Корзина">
            <ShoppingCart size={20} strokeWidth={2.2} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>
      <main className="app-content">{children}</main>
    </div>
  );
};
