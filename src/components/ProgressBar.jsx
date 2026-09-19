import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, label, status, color = 'green' }) => {
  const colorClasses = {
    green: 'bg-primary-500 dark:bg-primary-600',
    yellow: 'bg-amber-500 dark:bg-amber-600',
    red: 'bg-red-500 dark:bg-red-600'
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
        {status && <span className={`text-xs font-semibold ${color === 'green' ? 'text-primary-600 dark:text-primary-400' : color === 'yellow' ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>{status}</span>}
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-2.5 rounded-full ${colorClasses[color]}`}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
