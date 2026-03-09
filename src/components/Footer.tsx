import React from 'react';
import { motion } from 'motion/react';
import { Apple, Instagram, Twitter, Facebook, Youtube, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/5 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
              <span className="text-black font-bold text-2xl tracking-tighter">KIYA I-STORE</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-xs">
              Premium Apple products for the modern digital lifestyle. Experience luxury and innovation in every detail.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-black font-bold mb-8 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Shop', 'Deals', 'Reviews', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-1 group">
                    {link}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-black font-bold mb-8 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4">
              {['Order Tracking', 'Shipping Policy', 'Returns & Refunds', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-orange-600 transition-colors flex items-center gap-1 group">
                    {link}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-black font-bold mb-8 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-6">Subscribe to get special offers and first look at new products.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-gray-50 border border-black/5 rounded-xl px-4 py-3 text-black text-sm focus:outline-none focus:border-orange-500 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-xs mb-2">
              © 2026 KIYA I-STORE. All rights reserved. Designed for excellence.
            </p>
            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">
              Contact: codwithkiya@gmail.com | 0913962738 | Ethiopia, Bale Robe
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Apple size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Authorized Reseller</span>
            </div>
            <div className="flex gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-30 grayscale" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-30 grayscale" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
