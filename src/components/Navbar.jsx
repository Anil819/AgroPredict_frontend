import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'How It Works', path: '/about#how-it-works' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-3 z-50 mx-4">
      <div className="bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md shadow-sm border border-gray-100 dark:border-dark-border rounded-full px-6 py-3 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={({ isActive }) => `text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${isActive ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-600 dark:text-gray-300'}`}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 transition-colors"><Search size={20} /></button>
          <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 transition-colors">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isAuthenticated ? (
            <Link to="/dashboard" className="py-2 px-4 rounded-full text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md">Dashboard</Link>
          ) : (
            <Link to="/login" className="py-2 px-4 rounded-full text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md">Login</Link>
          )}
        </div>
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2 text-gray-500 dark:text-gray-400">{isDarkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-gray-700 dark:text-gray-200"><Menu size={24} /></button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-dark-surface shadow-2xl z-50 flex flex-col p-6">
              <div className="flex justify-between items-center mb-8"><Logo size="sm" /><button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400"><X size={24} /></button></div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `text-base font-medium py-2 border-b border-gray-100 dark:border-dark-border ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-200'}`}>{link.name}</NavLink>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-3">
                {isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-primary-600 text-white rounded-xl font-medium">Dashboard</Link>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 border border-gray-200 dark:border-dark-border rounded-xl font-medium text-gray-700 dark:text-gray-200">Login</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-3 bg-primary-600 text-white rounded-xl font-medium">Register</Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
