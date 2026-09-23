import React, { useEffect, useRef, useState } from 'react';
import { Search, Bell, Menu, Check, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { notificationsAPI } from '@/services/api';
import { useTheme } from '@/context/ThemeContext';

const DashboardHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef(null);

  const destinations = [
    { label: 'Dashboard Home', path: '/dashboard', keywords: 'home overview main start dashboard overall status' },
    { label: 'Crop Recommendation', path: '/crop-prediction', keywords: 'crop prediction recommendation plant seed grow agriculture farming fruit vegetable wheat corn rice' },
    { label: 'Disease Detection', path: '/disease-detection', keywords: 'plant disease image scan leaf sick rot pest fungus bacteria health check' },
    { label: 'Smart Irrigation', path: '/irrigation', keywords: 'irrigate water schedule predict moisture soil rain forecast wet dry' },
    { label: 'Soil Health Analysis', path: '/soil-analysis', keywords: 'soil test nitrogen phosphorus potassium ph moisture npk dirt health' },
    { label: 'Weather Forecast', path: '/weather', keywords: 'weather forecast rain temperature humidity wind climate hot cold' },
    { label: 'Profit Prediction', path: '/profit-prediction', keywords: 'profit finance money cost revenue roi calculate margin expense investment' },
    { label: 'Yield Prediction', path: '/yield-prediction', keywords: 'yield harvest tons acre production estimate' },
    { label: 'AI Farm Assistant', path: '/chat', keywords: 'chat ai assistant bot help question ask expert' },
    { label: 'Report History', path: '/prediction-history', keywords: 'reports history download past saved data records' },
    { label: 'Settings', path: '/settings', keywords: 'preferences theme password account profile avatar dark mode light' },
  ];

  useEffect(() => {
    notificationsAPI.list().then((response) => setNotifications(response.data)).catch(() => {});
  }, []);

  const matches = query.trim()
    ? destinations.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()))
    : destinations.slice(0, 5);
  const unreadCount = notifications.filter((item) => !item.read).length;

  const markRead = async (notification) => {
    if (notification.read) return;
    try {
      await notificationsAPI.markRead(notification.id);
      setNotifications((current) => current.map((item) => item.id === notification.id ? { ...item, read: true } : item));
    } catch {}
  };
  
  return (
    <header className="bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-dark-border py-4 px-6 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="md:hidden text-gray-500 dark:text-gray-400"><Menu size={24} /></button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Good Morning, {user?.fullName?.split(' ')[0] || 'Farmer'} 👋</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Here is your farm intelligence overview.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div ref={searchRef} className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input value={query} onFocus={() => setShowSearch(true)} onChange={(event) => { setQuery(event.target.value); setShowSearch(true); }} type="search" placeholder="Search pages..." className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-64" />
            {showSearch && (
              <div className="absolute right-0 top-12 w-72 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface shadow-xl p-2 z-50">
                {matches.length ? matches.map((item) => (
                  <button key={item.path} onClick={() => { navigate(item.path); setQuery(''); setShowSearch(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-dark-bg">{item.label}</button>
                )) : <p className="px-3 py-2 text-sm text-gray-500">No matching pages</p>}
              </div>
            )}
          </div>
          <button onClick={() => setShowNotifications((current) => !current)} className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-full transition-colors">
            <Bell size={20} />
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] rounded-full border border-white dark:border-dark-surface">{unreadCount}</span>}
          </button>
          <button onClick={toggleTheme} className="hidden sm:block p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-full" title="Toggle theme">
            {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <div className="h-9 w-9 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 rounded-full flex items-center justify-center font-bold shadow-sm cursor-pointer border border-primary-200 dark:border-primary-800 overflow-hidden">
            {user?.avatar ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" /> : user?.fullName?.charAt(0) || 'F'}
          </div>
        </div>
      </div>
      {showNotifications && (
        <div className="absolute right-6 top-16 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface shadow-xl p-3 z-50">
          <div className="flex justify-between items-center px-2 pb-2 border-b border-gray-100 dark:border-dark-border"><h2 className="font-semibold text-gray-900 dark:text-white">Notifications</h2><span className="text-xs text-gray-500">{unreadCount} unread</span></div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.length ? notifications.map((notification) => (
              <button key={notification.id} onClick={() => markRead(notification)} className={`w-full text-left p-3 mt-1 rounded-lg flex gap-2 ${notification.read ? 'text-gray-500' : 'bg-primary-50 dark:bg-dark-bg text-gray-800 dark:text-gray-100'}`}>
                <span className="flex-1 text-sm">{notification.message}</span>
                {!notification.read && <Check size={16} className="text-primary-600 mt-0.5" />}
              </button>
            )) : <p className="p-4 text-sm text-gray-500">No notifications yet.</p>}
          </div>
        </div>
      )}
    </header>
  );
};
export default DashboardHeader;
