import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon, color = 'green' }) => {
  const Icon = Icons[icon] || Icons.HelpCircle;
  
  const colorMap = {
    green: 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    blue: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    cyan: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-dark-surface rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <div className={`p-3 rounded-full ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};
export default StatCard;
