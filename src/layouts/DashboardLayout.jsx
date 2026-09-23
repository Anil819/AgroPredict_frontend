import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Wheat, CloudSun, Bot, User } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ChatWidget from '@/components/ChatWidget';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const bottomNavItems = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Predictions', path: '/crop-prediction', icon: Wheat },
    { name: 'Weather', path: '/weather', icon: CloudSun },
    { name: 'AI', path: '/chatbot', icon: Bot },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardHeader onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-dark-bg p-4 md:p-6 pb-20 lg:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          {bottomNavItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-500'
                    : 'text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                }`
              }
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default DashboardLayout;
