import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Eye, Star, Plus, Minus, Heart, SlidersHorizontal, ChevronDown, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '@/src/constants';
import { cn } from '@/src/lib/utils';

interface ProductCatalogProps {
  onAddToCart: (product: Product, color: string, storage: string) => void;
  onQuickView: (product: Product) => void;
  onGeneratePreview: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistItems: Product[];
}

export function ProductCatalog({ onAddToCart, onQuickView, onGeneratePreview, onToggleWishlist, wishlistItems }: ProductCatalogProps) {
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Pro', 'Standard'];
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under $800', value: 'under-800' },
    { label: '$800 - $1200', value: '800-1200' },
    { label: 'Over $1200', value: 'over-1200' },
  ];
  const ratings = [0, 4, 4.5, 4.8];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      
      let matchesPrice = true;
      if (priceRange === 'under-800') matchesPrice = p.price < 800;
      else if (priceRange === '800-1200') matchesPrice = p.price >= 800 && p.price <= 1200;
      else if (priceRange === 'over-1200') matchesPrice = p.price > 1200;

      const matchesRating = p.rating >= minRating;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [category, priceRange, minRating]);

  return (
    <section id="shop" className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-2">Our Collection</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Choose Your iPhone</h3>
          </motion.div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex bg-white p-1 rounded-xl border border-black/5 shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                    category === cat ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20" : "text-gray-500 hover:text-black"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 bg-white border border-black/5 rounded-xl text-sm font-bold transition-all shadow-sm",
                showFilters ? "text-orange-600 border-orange-600/20" : "text-black hover:bg-gray-50"
              )}
            >
              <SlidersHorizontal size={18} />
              Filters
              <ChevronDown size={16} className={cn("transition-transform duration-300", showFilters && "rotate-180")} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Price Range Filter */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Price Range</h4>
                  <div className="flex flex-wrap gap-3">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setPriceRange(range.value)}
                        className={cn(
                          "px-5 py-2.5 rounded-xl text-sm font-bold transition-all border",
                          priceRange === range.value 
                            ? "bg-black text-white border-black" 
                            : "bg-gray-50 text-gray-500 border-transparent hover:border-black/10"
                        )}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Minimum Rating</h4>
                  <div className="flex flex-wrap gap-3">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={cn(
                          "px-5 py-2.5 rounded-xl text-sm font-bold transition-all border flex items-center gap-2",
                          minRating === rating 
                            ? "bg-black text-white border-black" 
                            : "bg-gray-50 text-gray-500 border-transparent hover:border-black/10"
                        )}
                      >
                        {rating === 0 ? 'All Ratings' : (
                          <>
                            <Star size={14} fill={minRating === rating ? "currentColor" : "none"} />
                            {rating}+ Stars
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onGeneratePreview={onGeneratePreview}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistItems.some(item => item.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-black/5">
              <SlidersHorizontal size={32} className="text-gray-300" />
            </div>
            <h4 className="text-2xl font-bold text-black mb-2">No products found</h4>
            <p className="text-gray-500 mb-8">Try adjusting your filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setCategory('All');
                setPriceRange('All');
                setMinRating(0);
              }}
              className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ 
  product, 
  index, 
  onAddToCart, 
  onQuickView,
  onGeneratePreview,
  onToggleWishlist,
  isWishlisted
}: { 
  product: Product; 
  index: number;
  onAddToCart: (product: Product, color: string, storage: string) => void;
  onQuickView: (product: Product) => void;
  onGeneratePreview: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(product.storage[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-orange-500/50 transition-all duration-500 shadow-sm hover:shadow-xl"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            New
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product);
        }}
        className={cn(
          "absolute top-5 right-5 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md border shadow-sm",
          isWishlisted 
            ? "bg-orange-600 text-white border-orange-600 shadow-orange-600/20" 
            : "bg-white/90 text-gray-400 border-black/5 hover:text-orange-600 hover:scale-110"
        )}
      >
        <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} className={cn(isWishlisted && "animate-pulse")} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={() => onQuickView(product)}
            className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
            title="Quick View"
          >
            <Eye size={20} />
          </button>
          <button 
            onClick={() => onGeneratePreview(product)}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors"
            title="Generate AI Preview"
          >
            <Sparkles size={20} />
          </button>
          <button 
            onClick={() => onAddToCart(product, selectedColor, selectedStorage)}
            className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="text-xl font-bold text-black"
          >
            {product.name}
          </motion.h4>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-light">
          {product.description}
        </p>

        {/* Options */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Colors</span>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-4 h-4 rounded-full border border-black/10 transition-all",
                    selectedColor === color ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-white" : "opacity-50 hover:opacity-100"
                  )}
                  style={{ backgroundColor: getColorHex(color) }}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Storage</span>
            <div className="flex gap-2">
              {product.storage.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedStorage(size)}
                  className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded border transition-all",
                    selectedStorage === size ? "bg-black text-white border-black" : "text-gray-500 border-black/10 hover:border-black/30"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/5">
          <span className="text-2xl font-bold text-black">${product.price}</span>
          <button 
            onClick={() => onAddToCart(product, selectedColor, selectedStorage)}
            className="text-sm font-bold text-orange-600 hover:text-orange-500 flex items-center gap-1 transition-colors"
          >
            Add to Cart
            <Plus size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function getColorHex(color: string): string {
  const colors: Record<string, string> = {
    'Titanium Black': '#1a1a1a',
    'Titanium White': '#f5f5f0',
    'Natural Titanium': '#bebebe',
    'Desert Titanium': '#d4af37',
    'Solar Orange': '#ff6b00',
    'Pearl White': '#f8f8ff',
    'Titanium Silver': '#c0c0c0',
    'Black': '#000000',
    'White': '#ffffff',
    'Pink': '#ffc0cb',
    'Teal': '#008080',
    'Ultramarine': '#120a8f',
    'Black Titanium': '#2a2a2a',
    'White Titanium': '#e3e3e3',
    'Blue Titanium': '#4682b4',
    'Yellow': '#ffff00',
    'Green': '#008000',
    'Blue': '#0000ff',
    'Midnight': '#191970',
    'Starlight': '#faf0e6',
    'Purple': '#800080',
    'Red': '#ff0000',
  };
  return colors[color] || '#888';
}
