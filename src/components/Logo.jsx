import React from 'react';
import { Leaf, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ size = 'md' }) => {
  const sizeClasses = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' };
  const iconSizes = { sm: 20, md: 24, lg: 32 };

  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 p-2 rounded-xl group-hover:bg-primary-200 transition-colors">
        <Leaf className="text-primary-600 dark:text-primary-400 absolute" size={iconSizes[size]} />
        <Cpu className="text-primary-800 dark:text-primary-200 opacity-40 ml-3 mt-3" size={iconSizes[size] * 0.6} />
      </div>
      <div className="flex items-baseline">
        <span className={`font-bold text-gray-900 dark:text-white ${sizeClasses[size]}`}>AgroPredict</span>
        <span className={`font-bold text-primary-600 dark:text-primary-400 ml-1 ${size === 'lg' ? 'text-xl' : size === 'sm' ? 'text-xs' : 'text-sm'}`}>AI</span>
      </div>
    </Link>
  );
};
export default Logo;
