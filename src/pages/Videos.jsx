import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { videosData } from '@/utils/mockData';

const categories = ['All', 'Modern Farming', 'Crop Management', 'Soil Health', 'Irrigation', 'Disease Prevention', 'Organic Farming'];

export default function Videos() {
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredVideos = activeCat === 'All' ? videosData : videosData.filter(v => v.category === activeCat);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">Learn Better Farming</h1>
        <p className="page-subtitle">Explore helpful farming videos and educational content.</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCat === cat ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-dark-surface text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-dark-border hover:bg-surface-50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div key={video.id} className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
            <div className="relative aspect-video bg-surface-200 dark:bg-dark-surface">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
              </div>
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                {video.duration}
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1 block uppercase tracking-wider">{video.category}</span>
              <h3 className="font-bold text-surface-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">{video.title}</h3>
              <div className="flex justify-between items-center text-sm text-surface-500 dark:text-surface-400">
                <span>{video.author}</span>
                <span>{video.views} views</span>
              </div>
            </div>
          </div>
        ))}
        {filteredVideos.length === 0 && (
          <div className="col-span-full py-12 text-center text-surface-500">
            No videos found for this category.
          </div>
        )}
      </div>
    </motion.div>
  );
}
