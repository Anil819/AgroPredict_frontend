import React from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = 'Processing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      {/* Simple & Luxury Loader Container */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        
        {/* Sleek SVG Spinner */}
        <svg 
          className="absolute inset-0 w-full h-full animate-[spin_1.5s_linear_infinite]" 
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="simpleLuxury" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />   
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />  
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" /> 
            </linearGradient>
          </defs>
          
          {/* Faint Background Track */}
          <circle 
            cx="50" cy="50" r="47" 
            stroke="currentColor" 
            strokeWidth="1" 
            fill="none" 
            className="text-surface-200 dark:text-surface-800/40" 
          />
          
          {/* Elegant Gradient Sweep */}
          <circle 
            cx="50" cy="50" r="47" 
            stroke="url(#simpleLuxury)" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
            strokeDasharray="150 200"
          />
        </svg>

        {/* Minimalist Center Icon */}
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative z-10 text-emerald-600 dark:text-emerald-500"
        >
          <Leaf size={24} strokeWidth={1} />
        </motion.div>
      </div>

      {/* Clean Premium Typography */}
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <p className="text-[10px] font-semibold tracking-[0.4em] uppercase text-surface-500 dark:text-surface-400">
          {text}
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
