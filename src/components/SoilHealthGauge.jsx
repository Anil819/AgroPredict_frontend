import React from 'react';
import { motion } from 'framer-motion';

const SoilHealthGauge = ({ score, status }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getColor = (s) => {
    if (s >= 80) return '#16A34A'; // green
    if (s >= 60) return '#D97706'; // amber
    return '#DC2626'; // red
  };
  
  const color = getColor(score);

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width="160" height="160" className="transform -rotate-90">
        <circle cx="80" cy="80" r={radius} stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100 dark:text-gray-800" />
        <motion.circle 
          cx="80" cy="80" r={radius} stroke={color} strokeWidth="12" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{score}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">/ 100</span>
      </div>
      {status && (
        <div className="mt-4 text-center">
          <span className="text-sm font-semibold" style={{ color }}>{status}</span>
        </div>
      )}
    </div>
  );
};
export default SoilHealthGauge;
