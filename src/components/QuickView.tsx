import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Shield, Truck, RotateCcw, Heart } from 'lucide-react';
import { Product } from '@/src/constants';
import { cn } from '@/src/lib/utils';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { IPhoneModel } from './ThreeDModels';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, storage: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export function QuickView({ product, onClose, onAddToCart, onToggleWishlist, isWishlisted }: QuickViewProps) {
  const [selectedColor, setSelectedColor] = React.useState('');
  const [selectedStorage, setSelectedStorage] = React.useState('');

  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedStorage(product.storage[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-[#0a0a0a] border border-white/10 z-[90] rounded-[40px] overflow-hidden flex flex-col lg:flex-row shadow-2xl"
          >
            {/* 3D Viewer Side */}
            <div className="lg:w-1/2 h-64 lg:h-full bg-[#111] relative">
              <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <IPhoneModel color={getColorHex(selectedColor)} />
                <Environment preset="city" />
                <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                <OrbitControls enableZoom={true} />
              </Canvas>
              <div className="absolute bottom-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-white font-bold uppercase tracking-widest">
                3D Interactive View
              </div>
              <button 
                onClick={onClose}
                className="lg:hidden absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md rounded-full text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Details Side */}
            <div className="lg:w-1/2 h-full overflow-y-auto p-8 md:p-12 bg-black">
              <button 
                onClick={onClose}
                className="hidden lg:flex absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-600/20 text-blue-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {product.category} Series
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-gray-300">{product.rating}</span>
                  </div>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{product.name}</h2>
                <p className="text-gray-400 text-lg mb-8 font-light leading-relaxed">
                  {product.description}
                </p>

                <div className="space-y-8 mb-12">
                  {/* Colors */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4">Select Color</h4>
                    <div className="flex flex-wrap gap-3">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2",
                            selectedColor === color 
                              ? "bg-white text-black border-white" 
                              : "text-gray-400 border-white/10 hover:border-white/30"
                          )}
                        >
                          <div 
                            className="w-3 h-3 rounded-full border border-black/10" 
                            style={{ backgroundColor: getColorHex(color) }} 
                          />
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Storage */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4">Select Storage</h4>
                    <div className="flex flex-wrap gap-3">
                      {product.storage.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedStorage(size)}
                          className={cn(
                            "px-6 py-3 rounded-2xl border text-sm font-bold transition-all",
                            selectedStorage === size 
                              ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20" 
                              : "text-gray-400 border-white/10 hover:border-white/30"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mb-12">
                  <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Shield size={20} className="mx-auto mb-2 text-blue-500" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold">1 Year Warranty</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <Truck size={20} className="mx-auto mb-2 text-blue-500" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Free Shipping</p>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                    <RotateCcw size={20} className="mx-auto mb-2 text-blue-500" />
                    <p className="text-[10px] text-gray-400 uppercase font-bold">30 Day Return</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/10 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mb-1">Total Price</p>
                    <p className="text-white font-bold text-4xl">${product.price}</p>
                  </div>
                  <div className="flex gap-3 flex-1 justify-end">
                    <button 
                      onClick={() => onToggleWishlist(product)}
                      className={cn(
                        "p-5 rounded-2xl border transition-all",
                        isWishlisted ? "bg-pink-600 text-white border-pink-600" : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30"
                      )}
                    >
                      <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => onAddToCart(product, selectedColor, selectedStorage)}
                      className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 flex-1 justify-center"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
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
