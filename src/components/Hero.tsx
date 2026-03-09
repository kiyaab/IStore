import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import { IPhoneModel, Particles } from './ThreeDModels';
import { ChevronRight, Play } from 'lucide-react';

export function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-100 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-50 rounded-full blur-[120px] opacity-40" />
        <Canvas className="opacity-30">
          <Particles count={100} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-[1px] bg-orange-600" />
            <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">The Future is Orange</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold text-black tracking-tighter leading-[0.85] mb-8">
            iPhone 17 <br />
            <span className="text-orange-600">Pro Max</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
            A new era of brilliance. Featuring the most advanced holographic display and the all-new A19 Pro chip in a stunning Solar Orange finish.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={onExplore}
              className="w-full sm:w-auto px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-600/20 group"
            >
              Shop Now
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-black/5 hover:bg-black/10 text-black rounded-2xl font-bold flex items-center justify-center gap-2 backdrop-blur-md transition-all border border-black/5">
              <Play size={20} fill="currentColor" />
              Watch Film
            </button>
          </div>
        </motion.div>

        <div className="relative h-[500px] lg:h-[700px] flex items-center justify-center">
          {/* Main Floating Image with 3D Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              y: [0, -20, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 10, 0]
            }}
            transition={{ 
              duration: 1, 
              ease: 'easeOut',
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative z-20 w-full max-w-[500px] preserve-3d"
          >
            <img 
              src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=1000" 
              alt="iPhone 17 Pro Solar Orange"
              className="w-full h-auto drop-shadow-[0_35px_35px_rgba(255,107,0,0.3)]"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Glass Cards */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-white/40 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 shadow-2xl z-30 hidden md:block"
            >
              <p className="text-[10px] uppercase tracking-widest font-bold text-orange-600 mb-1">Display</p>
              <p className="text-xl font-bold text-black">Holographic</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white/40 backdrop-blur-xl p-6 rounded-[32px] border border-white/20 shadow-2xl z-30 hidden md:block"
            >
              <p className="text-[10px] uppercase tracking-widest font-bold text-orange-600 mb-1">Chip</p>
              <p className="text-xl font-bold text-black">A19 Pro</p>
            </motion.div>
          </motion.div>

          {/* Background Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-orange-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-orange-500/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-orange-600/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
    </section>
  );
}
