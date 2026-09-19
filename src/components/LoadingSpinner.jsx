import React from 'react';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="text-primary-600 dark:text-primary-400 mb-4"
      >
        <Leaf size={40} />
      </motion.div>
      <p className="text-gray-600 dark:text-gray-400 font-medium animate-pulse">{text}</p>
    </div>
  );
};
export default LoadingSpinner;
