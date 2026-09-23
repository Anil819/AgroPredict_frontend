import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X, ExternalLink } from 'lucide-react';
import { videosData } from '@/utils/mockData';

const categories = ['All', 'Modern Farming', 'Crop Management', 'Soil Health', 'Irrigation', 'Disease Prevention', 'Organic Farming'];

export default function Videos() {
  const [activeCat, setActiveCat] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredVideos = activeCat === 'All' ? videosData : videosData.filter(v => v.category === activeCat);

  const selectVideo = (video) => {
    const videoId = video.url?.match(/[?&]v=([^&]+)/)?.[1];
    setSelectedVideo({
      ...video,
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : video.url,
    });
  };

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
          <button type="button" key={video.id} onClick={() => selectVideo(video)} className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-all text-left w-full">
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
          </button>
        ))}
        {filteredVideos.length === 0 && (
          <div className="col-span-full py-12 text-center text-surface-500">
            No videos found for this category.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 p-4 flex items-center justify-center" onClick={() => setSelectedVideo(null)}>
            <motion.div initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} className="w-full max-w-4xl bg-white dark:bg-dark-surface rounded-2xl overflow-hidden shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-surface-200 dark:border-dark-border">
                <h2 className="font-semibold text-surface-900 dark:text-white truncate pr-4">{selectedVideo.title}</h2>
                <button type="button" onClick={() => setSelectedVideo(null)} className="p-2 text-surface-500 hover:text-surface-900 dark:hover:text-white" title="Close video"><X className="w-5 h-5" /></button>
              </div>
              <div className="aspect-video bg-black flex justify-center items-center">
                {selectedVideo.embedUrl.includes('.mp4') ? (
                  <video className="w-full h-full object-contain" src={selectedVideo.embedUrl} autoPlay controls playsInline />
                ) : (
                  <iframe className="w-full h-full" src={selectedVideo.embedUrl} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                )}
              </div>
              <div className="px-5 py-4 flex justify-end">
                <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"><ExternalLink className="w-4 h-4" /> Open Source</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
