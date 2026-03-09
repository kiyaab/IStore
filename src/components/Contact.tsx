import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageSquare, ExternalLink } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <div>
            <h2 className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-2">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-6">Contact KIYA I-STORE</h3>
            
            {/* Founder/Seller Profile */}
            <div className="flex items-center gap-6 mb-12 p-6 bg-gray-50 rounded-[32px] border border-black/5 shadow-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-orange-500/30 flex-shrink-0">
                <img 
                  src="https://storage.googleapis.com/test-media-genai/direct_sales_manager.jpg" 
                  alt="Direct Sales Manager" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-black font-bold text-xl">Direct Sales Manager</h4>
                <p className="text-orange-600 text-sm font-medium mb-2">Available for 24/7 Chat</p>
                <a 
                  href="https://t.me/melos_30k" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-orange-600 px-4 py-2 rounded-full hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                  Chat on Telegram
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            <p className="text-gray-600 text-lg mb-12 max-w-lg leading-relaxed">
              Have questions about our products or need assistance with your order? Our team is here to help you 24/7.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-600 border border-black/5 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Phone</p>
                  <p className="text-black font-bold text-xl">0913962738</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-600 border border-black/5 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Telegram</p>
                  <p className="text-black font-bold text-xl">@melos_30k</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-600 border border-black/5 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Email</p>
                  <p className="text-black font-bold text-xl">codwithkiya@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-orange-600 border border-black/5 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">Location</p>
                  <p className="text-black font-bold text-xl">Ethiopia, Bale Robe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[40px] border border-black/5 shadow-xl"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full bg-gray-50 border border-black/5 rounded-2xl px-6 py-4 text-black focus:outline-none focus:border-orange-500 transition-all resize-none"
                />
              </div>
              <button className="w-full py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-600/20 group">
                Send Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
