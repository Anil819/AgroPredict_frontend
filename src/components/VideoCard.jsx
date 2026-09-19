import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoCard = ({ title, thumbnail, duration, category, url }) => {
  return (
    <motion.a 
      href={url} target="_blank" rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-dark-border group block"
    >
      <div className="relative aspect-video">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="h-12 w-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="text-white fill-white ml-1" size={24} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-2 inline-block uppercase tracking-wider">{category}</span>
        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">{title}</h3>
      </div>
    </motion.a>
  );
};
export default VideoCard;
