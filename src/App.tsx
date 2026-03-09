/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { Deals } from './components/Deals';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { QuickView } from './components/QuickView';
import { Checkout } from './components/Checkout';
import { AuthModal } from './components/AuthModal';
import { ChatWidget } from './components/ChatWidget';
import { Background3D } from './components/Background3D';
import { ProductPreviewGenerator } from './components/ProductPreviewGenerator';
import { Product, CartItem } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // Scroll to section when navigating
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addToCart = (product: Product, color?: string, storage?: string) => {
    setCartItems(prev => {
      const selectedColor = color || product.colors[0];
      const selectedStorage = storage || product.storage[0];
      
      const existingItem = prev.find(item => 
        item.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedStorage === selectedStorage
      );

      if (existingItem) {
        return prev.map(item => 
          item === existingItem 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      return [...prev, { ...product, quantity: 1, selectedColor, selectedStorage }];
    });
    
    setIsCartOpen(true);
    setQuickViewProduct(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const isWishlisted = prev.some(item => item.id === product.id);
      if (isWishlisted) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
    // Maybe show a success message or redirect
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-orange-500 selection:text-white relative">
      <Background3D />
      <Navbar 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        wishlistCount={wishlistItems.length}
        user={user ? { name: user.displayName || 'User', email: user.email || '' } : null}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onLoginClick={() => setIsAuthOpen(true)}
        onLogoutClick={logout}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <main>
        <Hero onExplore={() => handleNavigate('shop')} />
        <ProductCatalog 
          onAddToCart={addToCart} 
          onQuickView={(p) => setQuickViewProduct(p)} 
          onGeneratePreview={(p) => setPreviewProduct(p)}
          onToggleWishlist={toggleWishlist}
          wishlistItems={wishlistItems}
        />
        <Deals />
        <Reviews />
        <Contact />
      </main>

      <Footer />

      {/* Modals & Overlays */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          if (!user) {
            setIsAuthOpen(true);
          } else {
            setIsCheckoutOpen(true);
          }
        }}
      />

      <Wishlist 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onExplore={() => {
          setIsWishlistOpen(false);
          handleNavigate('shop');
        }}
        items={wishlistItems}
        onRemove={(id) => setWishlistItems(prev => prev.filter(item => item.id !== id))}
        onAddToCart={(p) => addToCart(p)}
      />

      <QuickView 
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? wishlistItems.some(item => item.id === quickViewProduct.id) : false}
      />

      <Checkout 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onComplete={handleCheckoutComplete}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <ProductPreviewGenerator 
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
      />

      <ChatWidget />

      {/* Global Custom Scrollbar Styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        ::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
