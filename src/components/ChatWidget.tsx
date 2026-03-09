import React from 'react';
import { MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export function ChatWidget() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring' }}
      className="fixed bottom-8 left-8 z-50"
    >
      <a
        href="https://t.me/melos_30k"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-full shadow-2xl shadow-blue-600/40 group transition-all"
      >
        <div className="relative">
          <MessageSquare size={24} fill="currentColor" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-blue-600 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-70">Direct Chat</span>
          <span className="text-sm font-bold">@melos_30k</span>
        </div>
        <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
    </motion.div>
  );
}
