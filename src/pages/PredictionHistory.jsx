import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle, Activity, TrendingUp, DollarSign } from 'lucide-react';
import { predictionHistory } from '@/utils/mockData';

const tabs = ['All', 'Crop', 'Disease', 'Yield', 'Profit', 'Soil'];

export default function PredictionHistory() {
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredHistory = activeTab === 'All' 
    ? predictionHistory 
    : predictionHistory.filter(item => item.type === activeTab);

  const getTypeColor = (type) => {
    switch(type) {
      case 'Disease': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Yield': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Profit': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Crop': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'Disease': return <Activity className="w-4 h-4 mr-1" />;
      case 'Yield': return <TrendingUp className="w-4 h-4 mr-1" />;
      case 'Profit': return <DollarSign className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">Prediction History</h1>
        <p className="page-subtitle">View your past AI predictions and analysis.</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-dark-surface text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-dark-border hover:bg-surface-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        {filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-50 dark:bg-dark-surface border-b border-surface-200 dark:border-dark-border text-surface-500 dark:text-surface-400 text-sm">
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Result</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-dark-border">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-50 dark:hover:bg-dark-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                        {getIcon(item.type)}
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{item.result}</p>
                      {item.confidence && <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">Confidence: {item.confidence}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600 dark:text-surface-300 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors" title="Download Report">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-surface-300 dark:text-surface-600 mb-4" />
            <p className="text-surface-600 dark:text-surface-300 font-medium">No records found</p>
            <p className="text-sm text-surface-400 mt-1">Try selecting a different category or run a new prediction.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
