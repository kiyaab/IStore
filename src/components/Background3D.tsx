import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Smartphone, Zap, Shield, Sparkles } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { InteractiveParticles, FloatingShapes } from './ThreeDModels';

export function Background3D() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mousePosition.x, { stiffness: 50, damping: 20 });
  const springY = useSpring(mousePosition.y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const floatingElements = [
    { Icon: Smartphone, size: 120, top: '15%', left: '10%', delay: 0, color: 'text-orange-500/10' },
    { Icon: Zap, size: 80, top: '45%', left: '85%', delay: 2, color: 'text-blue-500/10' },
    { Icon: Shield, size: 100, top: '75%', left: '15%', delay: 4, color: 'text-emerald-500/10' },
    { Icon: Sparkles, size: 60, top: '25%', left: '75%', delay: 1, color: 'text-purple-500/10' },
    { Icon: Smartphone, size: 150, top: '60%', left: '80%', delay: 3, color: 'text-orange-500/5' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Three.js Background Layer */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <InteractiveParticles count={300} />
          <FloatingShapes />
        </Canvas>
      </div>

      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute inset-0"
      >
        {floatingElements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              delay: item.delay,
              ease: "easeInOut"
            }}
            style={{ 
              position: 'absolute', 
              top: item.top, 
              left: item.left,
              rotateZ: rotateX
            }}
            className={item.color}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Gradient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-orange-500/5 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[100px]"
      />
    </div>
  );
}
