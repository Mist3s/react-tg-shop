import React from 'react';
import { Sun, Moon, ShoppingCart, ArrowLeft, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  onCartClick?: () => void;
  cartCount: number;
  showBackButton?: boolean;
  headerVariant?: 'default' | 'minimal';
  showTitle?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  title,
  children,
  onBack,
  onClose,
  onCartClick,
  cartCount,
  showBackButton = false,
  headerVariant = 'default',
  showTitle = true,
}) => {
  const { theme, toggleTheme } = useTheme();

  const renderDefaultHeader = () => (
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
      <div className="header-title">{showTitle ? title : null}</div>
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
  );

  const renderMinimalHeader = () => {
    const handleClose = () => {
      if (onClose) {
        onClose();
        return;
      }

      if (onBack) {
        onBack();
      }
    };

    return (
      <header className="app-header app-header--minimal">
        <button className="icon-button" onClick={handleClose} aria-label="Закрыть" type="button">
          <X size={20} strokeWidth={2.2} />
        </button>
        <div className="header-title header-title--center">{title}</div>
        <div className="header-spacer" />
      </header>
    );
  };

  return (
    <div className="app-shell">
      {headerVariant === 'minimal' ? renderMinimalHeader() : renderDefaultHeader()}
      <main className={`app-content${headerVariant === 'minimal' ? ' app-content--flush' : ''}`}>{children}</main>
    </div>
  );
};
