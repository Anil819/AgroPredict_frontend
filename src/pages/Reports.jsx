import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye } from 'lucide-react';
import { reportsData } from '@/utils/mockData';

export default function Reports() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="page-header">Reports</h1>
          <p className="page-subtitle">View and download your generated farm reports.</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Generate New Report</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportsData.map((report) => (
          <div key={report.id} className="card p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-surface-100 dark:bg-dark-surface text-surface-600 dark:text-surface-300 text-xs font-medium rounded-full">
                {report.type}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 line-clamp-1">{report.title}</h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">{report.date}</p>
            
            <div className="mt-auto flex space-x-3 pt-4 border-t border-surface-100 dark:border-dark-border">
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/10 dark:text-primary-400 rounded-lg hover:bg-primary-100 transition-colors">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium text-surface-700 bg-surface-100 dark:bg-dark-surface dark:text-surface-300 rounded-lg hover:bg-surface-200 transition-colors">
                <Eye className="w-4 h-4" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
