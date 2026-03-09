import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tech Enthusiast',
    content: 'The 3D viewer is incredible! I could see every detail of the iPhone 16 Pro before buying. The delivery was super fast too.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Professional Photographer',
    content: 'KIYA I-STORE is the best place to get Apple products. Their customer service is top-notch and the website experience is premium.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    verified: true
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Digital Nomad',
    content: 'Love the minimal design of the store. Buying my new iPhone was a breeze. Highly recommended for anyone looking for a luxury experience.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    verified: true
  }
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-orange-600 font-bold tracking-widest text-sm uppercase mb-2">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-black tracking-tight">What Our Customers Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-black/5 relative group hover:border-orange-500/30 transition-all shadow-sm"
            >
              <Quote className="absolute top-6 right-8 text-orange-500/10 w-12 h-12" />
              
              <div className="flex items-center gap-1 text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < review.rating ? "currentColor" : "none"} 
                    className={i < review.rating ? "" : "text-gray-300"}
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed italic">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-black font-bold text-sm">{review.name}</h4>
                    {review.verified && <CheckCircle2 size={14} className="text-orange-600" />}
                  </div>
                  <p className="text-gray-400 text-xs">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-black/5 pt-16">
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-1">4.9/5</p>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-1">15k+</p>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-1">99%</p>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-black mb-1">24/7</p>
            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
