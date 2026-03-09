import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '@/src/constants';
import { cn } from '@/src/lib/utils';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export function Wishlist({ isOpen, onClose, onExplore, items, onRemove, onAddToCart }: WishlistProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-black/5 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-black/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-600">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Wishlist</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Heart size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">Wishlist is empty</h3>
                  <p className="text-gray-400 mb-8 max-w-[200px]">Save your favorite iPhones to view them here later.</p>
                  <button 
                    onClick={onExplore}
                    className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                  >
                    Explore Store
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-5 group">
                    <div className="w-28 h-28 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-black/5 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-lg font-bold text-black truncate">{item.name}</h4>
                      </div>
                      <p className="text-xs text-gray-400 mb-4">
                        {item.category} Series • ${item.price}
                      </p>
                      <button 
                        onClick={() => onAddToCart(item)}
                        className="w-full py-3 bg-gray-50 hover:bg-orange-600 text-black hover:text-white rounded-xl text-xs font-bold transition-all border border-black/5 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-black/5">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold text-center mb-4">
                  Items in your wishlist are not reserved
                </p>
                <button 
                  onClick={onExplore}
                  className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20 group"
                >
                  Continue Shopping
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
