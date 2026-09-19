import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { IMAGES } from '@/utils/mockData';

export default function Logout() {
  const [showConfirm, setShowConfirm] = useState(true);
  const [loggedOut, setLoggedOut] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowConfirm(false);
    setLoggedOut(true);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.logoutBg})` }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <AnimatePresence mode="wait">
        {showConfirm && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-10 card w-full max-w-md p-8 text-center bg-white dark:bg-dark-card"
          >
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Leaving AgroPredict?</h2>
            <p className="text-surface-600 dark:text-surface-300 mb-8">Are you sure you want to logout of your account?</p>
            
            <div className="flex space-x-4">
              <button onClick={handleCancel} className="flex-1 btn-secondary py-3">
                Cancel
              </button>
              <button onClick={handleLogout} className="flex-1 btn-primary py-3 bg-red-500 hover:bg-red-600 border-red-500">
                Logout
              </button>
            </div>
          </motion.div>
        )}

        {loggedOut && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 card w-full max-w-md p-8 text-center bg-white dark:bg-dark-card"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle className="w-20 h-20 text-green-500" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Successfully Logged Out</h2>
            <p className="text-surface-600 dark:text-surface-300 mb-8">Your farming journey is always welcome here.</p>
            
            <button onClick={() => navigate('/')} className="w-full btn-primary py-3">
              Return Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
