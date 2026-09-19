import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudDrizzle } from 'lucide-react';
import { motion } from 'framer-motion';

const WeatherCard = ({ day, icon, high, low, rain }) => {
  const iconMap = {
    'sun': <Sun size={32} className="text-amber-500" />,
    'cloud-sun': <CloudSun size={32} className="text-amber-400" />,
    'cloud': <Cloud size={32} className="text-gray-400" />,
    'cloud-rain': <CloudRain size={32} className="text-blue-500" />,
    'cloud-drizzle': <CloudDrizzle size={32} className="text-blue-400" />
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white dark:bg-dark-surface rounded-2xl p-4 border border-gray-100 dark:border-dark-border flex flex-col items-center justify-center text-center shadow-sm">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{day}</span>
      <div className="mb-3">
        {iconMap[icon] || <CloudSun size={32} className="text-amber-400" />}
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-lg font-bold text-gray-900 dark:text-white">{high}°</span>
        <span className="text-sm font-medium text-gray-400">{low}°</span>
      </div>
      <div className="text-xs font-medium text-blue-500 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full">
        {rain}% Rain
      </div>
    </motion.div>
  );
};
export default WeatherCard;
