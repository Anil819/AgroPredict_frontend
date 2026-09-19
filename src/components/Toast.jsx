import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => {
            const icons = {
              success: <CheckCircle className="text-green-500" size={20} />,
              error: <XCircle className="text-red-500" size={20} />,
              warning: <AlertTriangle className="text-amber-500" size={20} />,
              info: <Info className="text-blue-500" size={20} />
            };
            const bgs = {
              success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
              error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
              warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
              info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            };
            return (
              <motion.div key={toast.id} initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.9 }} className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-lg border ${bgs[toast.type]} min-w-[300px]`}>
                {icons[toast.type]}
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 flex-1">{toast.message}</p>
                <button onClick={() => removeToast(toast.id)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"><X size={16} /></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
