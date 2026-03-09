import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Timer, Zap, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/src/constants';

export function Deals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.slice(0, 2);

  return (
    <section id="deals" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-orange-50 to-white p-8 md:p-16 rounded-[40px] border border-orange-500/10 relative overflow-hidden shadow-sm">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] -z-10" />
          
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
                  <Zap size={20} fill="currentColor" />
                </div>
                <h2 className="text-orange-600 font-bold tracking-widest text-sm uppercase">Flash Sale</h2>
              </div>
              
              <h3 className="text-5xl md:text-7xl font-bold text-black tracking-tighter mb-8 leading-tight">
                Weekly Deals <br /> Up to 20% Off
              </h3>

              <div className="flex gap-4 mb-12">
                {[
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-3xl font-bold text-black mb-2">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.label}</span>
                  </div>
                ))}
              </div>

              <button className="px-10 py-5 bg-black text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all group">
                View All Deals
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {dealProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm group hover:border-orange-500/30 transition-all"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-black font-bold mb-1">{product.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-600 font-bold text-xl">${Math.round(product.price * 0.8)}</span>
                        <span className="text-gray-400 line-through text-sm">${product.price}</span>
                      </div>
                    </div>
                    <div className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      -20%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
