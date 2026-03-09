import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  user: { name: string; email: string } | null;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ cartCount, wishlistCount, user, onCartClick, onWishlistClick, onLoginClick, onLogoutClick, onNavigate, currentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'Deals', id: 'deals' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <span className="text-black font-bold text-xl tracking-tighter">KIYA I-STORE</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-orange-600',
                currentPage === link.id ? 'text-orange-600' : 'text-gray-600'
              )}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors">
            <Search size={20} />
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-orange-600 transition-colors relative"
            onClick={onWishlistClick}
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            className="p-2 text-gray-600 hover:text-orange-600 transition-colors relative"
            onClick={onCartClick}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button 
              className="p-2 text-gray-600 hover:text-orange-600 transition-colors relative"
              onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : onLoginClick()}
            >
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden lg:block text-xs font-bold text-black max-w-[80px] truncate">{user.name}</span>
                </div>
              ) : (
                <User size={20} />
              )}
            </button>

            <AnimatePresence>
              {isUserMenuOpen && user && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsUserMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-black/5 rounded-2xl shadow-xl overflow-hidden py-2"
                  >
                    <div className="px-4 py-2 border-b border-black/5 mb-2">
                      <p className="text-xs font-bold text-black truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onLogoutClick();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'text-lg font-medium flex items-center justify-between',
                    currentPage === link.id ? 'text-orange-600' : 'text-gray-600'
                  )}
                >
                  {link.name}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
