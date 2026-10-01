import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wheat, Layers, CloudSun, Scan, TrendingUp, Droplets, IndianRupee, Bot, History, FileText, Play, User, Settings, LogOut, X } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const mainLinks = [
    { icon: LayoutDashboard, name: t('dashboard'), path: '/dashboard' },
    { icon: Wheat, name: t('cropPrediction'), path: '/crop-prediction' },
    { icon: Layers, name: t('soilAnalysis'), path: '/soil-analysis' },
    { icon: CloudSun, name: t('weather'), path: '/weather' },
    { icon: Scan, name: t('diseaseDetection'), path: '/disease-detection' },
    { icon: TrendingUp, name: t('yieldPrediction'), path: '/yield-prediction' },
    { icon: Droplets, name: t('irrigation'), path: '/irrigation' },
    { icon: IndianRupee, name: t('profitPrediction'), path: '/profit-prediction' },
    { icon: Bot, name: t('aiAssistant'), path: '/chatbot' },
  ];
  const secondaryLinks = [
    { icon: History, name: t('predictionHistory'), path: '/prediction-history' },
    { icon: FileText, name: t('reports'), path: '/reports' },
    { icon: Play, name: t('videos'), path: '/videos' },
  ];
  const userLinks = [
    { icon: User, name: t('profile'), path: '/profile' },
    { icon: Settings, name: t('settings'), path: '/settings' },
    { icon: LogOut, name: t('logout'), path: '/logout' },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-dark-surface border-r border-gray-100 dark:border-dark-border w-64 overflow-y-auto pb-4">
      <div className="p-6 sticky top-0 bg-white dark:bg-dark-surface z-10 flex justify-between items-center">
        <Logo size="md" />
        {onClose && <button onClick={onClose} className="md:hidden text-gray-500"><X size={20} /></button>}
      </div>
      <div className="px-4 flex-1">
        <nav className="space-y-1 mb-6">
          {mainLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
              <link.icon size={20} />
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-gray-100 dark:border-dark-border pt-6 mb-6">
          <nav className="space-y-1">
            {secondaryLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                <link.icon size={20} />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-100 dark:border-dark-border pt-6">
          <nav className="space-y-1">
            {userLinks.map((link) => (
              <NavLink key={link.name} to={link.path} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                <link.icon size={20} />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block fixed left-0 top-0 h-screen"><SidebarContent /></div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 left-0 h-full z-50 md:hidden">
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Sidebar;
