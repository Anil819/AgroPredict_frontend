import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-surface-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-grow flex flex-col"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default PublicLayout;
