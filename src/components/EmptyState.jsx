import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const EmptyState = ({ icon, title, description, buttonText, buttonLink }) => {
  const Icon = Icons[icon] || Icons.FolderOpen;
  
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 dark:bg-dark-surface/50 rounded-2xl border border-dashed border-gray-200 dark:border-dark-border">
      <div className="h-20 w-20 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center text-gray-400 dark:text-gray-500 mb-6">
        <Icon size={40} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">{description}</p>
      {buttonText && buttonLink && (
        <Link to={buttonLink} className="btn-primary py-2 px-6 rounded-full text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors">
          {buttonText}
        </Link>
      )}
    </div>
  );
};
export default EmptyState;
