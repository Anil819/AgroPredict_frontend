import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Mail, Moon, Sun, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { notificationSettings } from '@/utils/mockData';
import { profileAPI } from '@/services/api';

export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(notificationSettings);

  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passStatus, setPassStatus] = useState({ type: '', message: '' });
  const [isChangingPass, setIsChangingPass] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleToggle = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPassStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    setIsChangingPass(true);
    setPassStatus({ type: '', message: '' });
    try {
      await profileAPI.changePassword({ 
        currentPassword: passwords.currentPassword, 
        newPassword: passwords.newPassword 
      });
      setPassStatus({ type: 'success', message: 'Password updated successfully!' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPassStatus({ type: 'error', message: err.response?.data?.detail || err.response?.data?.message || err.message || 'Failed to update password' });
    } finally {
      setIsChangingPass(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">Settings</h1>
        <p className="page-subtitle">Manage your account preferences and app settings.</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
            <Moon className="w-5 h-5 mr-2" /> Appearance
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div 
              onClick={() => isDarkMode && toggleTheme()}
              className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center space-y-2 transition-colors ${!isDarkMode ? 'border-primary-600 bg-primary-50 dark:bg-transparent' : 'border-surface-200 dark:border-dark-border hover:bg-surface-50 dark:hover:bg-dark-surface'}`}
            >
              <Sun className={`w-8 h-8 ${!isDarkMode ? 'text-primary-600' : 'text-surface-400'}`} />
              <span className={`font-medium ${!isDarkMode ? 'text-primary-700' : 'text-surface-600 dark:text-surface-300'}`}>Light Mode</span>
            </div>
            <div 
              onClick={() => !isDarkMode && toggleTheme()}
              className={`border-2 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center space-y-2 transition-colors ${isDarkMode ? 'border-primary-600 bg-primary-900/20' : 'border-surface-200 dark:border-dark-border hover:bg-surface-50 dark:hover:bg-dark-surface'}`}
            >
              <Moon className={`w-8 h-8 ${isDarkMode ? 'text-primary-400' : 'text-surface-400'}`} />
              <span className={`font-medium ${isDarkMode ? 'text-primary-400' : 'text-surface-600'}`}>Dark Mode</span>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
            <Globe className="w-5 h-5 mr-2" /> Language
          </h2>
          <div className="max-w-md">
            <select className="input-field w-full">
              <option value="en">English</option>
              <option value="hi">Hindi (हिंदी)</option>
              <option value="mr">Marathi (मराठी)</option>
              <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
            </select>
            <p className="text-xs text-surface-500 mt-2">Choose the language for the AgroPredict AI interface.</p>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" /> Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between py-3 border-b border-surface-100 dark:border-dark-border last:border-0 last:pb-0">
                <div>
                  <h3 className="font-medium text-surface-900 dark:text-white">{setting.title}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{setting.description}</p>
                </div>
                <button 
                  onClick={() => handleToggle(setting.id)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${setting.enabled ? 'bg-primary-600' : 'bg-surface-300 dark:bg-surface-600'}`}
                >
                  <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${setting.enabled ? 'transform translate-x-6' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Account & Security */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" /> Account Security
          </h2>
          <div className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Email Address</label>
              <div className="flex space-x-3">
                <input type="email" value={user?.email || ''} readOnly className="input-field flex-1 bg-surface-50 dark:bg-dark-bg text-surface-500 cursor-not-allowed" />
                <button className="btn-secondary whitespace-nowrap">Change</button>
              </div>
            </div>
            
            <form onSubmit={handlePasswordChange} className="pt-4 border-t border-surface-100 dark:border-dark-border space-y-4">
              <h3 className="font-medium text-surface-900 dark:text-white">Change Password</h3>
              <div>
                <input type="password" placeholder="Current Password" value={passwords.currentPassword} onChange={e => setPasswords({...passwords, currentPassword: e.target.value})} required className="input-field w-full" />
              </div>
              <div>
                <input type="password" placeholder="New Password" value={passwords.newPassword} onChange={e => setPasswords({...passwords, newPassword: e.target.value})} required className="input-field w-full" />
              </div>
              <div>
                <input type="password" placeholder="Confirm New Password" value={passwords.confirmPassword} onChange={e => setPasswords({...passwords, confirmPassword: e.target.value})} required className="input-field w-full" />
              </div>
              {passStatus.message && (
                <div className={`p-3 rounded-lg flex items-center gap-2 text-sm ${passStatus.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                  {passStatus.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{passStatus.message}</span>
                </div>
              )}
              <button type="submit" disabled={isChangingPass} className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed">
                {isChangingPass ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
