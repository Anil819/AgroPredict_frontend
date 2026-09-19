import React from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from './Badge';

const PredictionResultCard = ({ title, confidence, status, details = [], icon: Icon }) => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-dark-surface rounded-2xl p-6 md:p-8 shadow-card border-t-4 border-primary-500">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
              <Icon size={32} />
            </div>
          )}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
            <div className="flex items-center gap-3">
              <Badge variant={confidence > 80 ? 'green' : confidence > 60 ? 'amber' : 'red'}>
                {confidence}% Confidence
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">{status}</span>
            </div>
          </div>
        </div>
      </div>
      
      {details.length > 0 && (
        <div className="bg-gray-50 dark:bg-dark-bg rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Analysis Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {details.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {detail.status === 'good' ? (
                  <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <X size={12} strokeWidth={3} />
                  </div>
                )}
                <span className="text-sm text-gray-700 dark:text-gray-300">{detail.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <button className="flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
          View Detailed Report <ChevronRight size={18} className="ml-1" />
        </button>
      </div>
    </motion.div>
  );
};
export default PredictionResultCard;
