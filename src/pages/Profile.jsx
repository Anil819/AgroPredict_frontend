import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, User, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { NavLink } from 'react-router-dom';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || user?.mobileNumber || '',
    state: user?.state || '',
    district: user?.district || '',
    village: user?.village || '',
    language: user?.language || user?.preferredLanguage || 'English',
    farmName: user?.farmName || '',
    farmArea: user?.farmArea || '',
    crops: user?.crops ? (Array.isArray(user.crops) ? user.crops.join(', ') : user.crops) : ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [isPhotoSaving, setIsPhotoSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setStatus({ type: 'error', message: 'Please select a JPG, PNG, or WEBP image.' });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'Profile photo must be smaller than 2MB.' });
      return;
    }

    setIsPhotoSaving(true);
    setStatus({ type: '', message: '' });
    try {
      const reader = new FileReader();
      const avatar = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      await updateProfile({ avatar });
      setStatus({ type: 'success', message: 'Profile photo updated successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to update profile photo.' });
    } finally {
      setIsPhotoSaving(false);
    }
  };

  const handleRemovePhoto = async () => {
    if (!user?.avatar || !window.confirm('Remove your profile photo?')) return;
    setIsPhotoSaving(true);
    setStatus({ type: '', message: '' });
    try {
      await updateProfile({ avatar: null });
      setStatus({ type: 'success', message: 'Profile photo removed.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Failed to remove profile photo.' });
    } finally {
      setIsPhotoSaving(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: '', message: '' });
    try {
      let parsedCrops = [];
      if (typeof formData.crops === 'string') {
        parsedCrops = formData.crops.split(',').map(c => c.trim()).filter(Boolean);
      }
      const updates = { ...formData, crops: parsedCrops };
      await updateProfile(updates);
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">My Profile</h1>
        <p className="page-subtitle">Manage your personal and farm details.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 hidden md:block flex-shrink-0 space-y-2">
          <NavLink to="/dashboard/profile" className={({isActive}) => `block px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'text-surface-600 hover:bg-surface-50 dark:text-surface-300 dark:hover:bg-dark-surface'}`}>
            Profile Details
          </NavLink>
          <NavLink to="/dashboard/settings" className={({isActive}) => `block px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400' : 'text-surface-600 hover:bg-surface-50 dark:text-surface-300 dark:hover:bg-dark-surface'}`}>
            Settings
          </NavLink>
          <NavLink to="/dashboard/logout" className="block px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10 transition-colors">
            Logout
          </NavLink>
        </div>

        {/* Main Content */}
        <div className="flex-1 card p-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center gap-6 pb-8 border-b border-surface-200 dark:border-dark-border">
            <div className="relative group">
              <div className="w-24 h-24 bg-primary-600 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" /> : getInitials(formData.name)}
              </div>
              <label htmlFor="profile-photo" className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
                <input id="profile-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" disabled={isPhotoSaving} />
              </label>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">{formData.name}</h2>
              <p className="text-surface-500 dark:text-surface-400 flex items-center justify-center md:justify-start gap-1 mt-1">
                <MapPin className="w-4 h-4" /> {formData.village}, {formData.district}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <label htmlFor="profile-photo-action" className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 cursor-pointer">
                  {isPhotoSaving ? 'Saving...' : 'Edit Photo'}
                  <input id="profile-photo-action" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" disabled={isPhotoSaving} />
                </label>
                {user?.avatar && <button type="button" onClick={handleRemovePhoto} disabled={isPhotoSaving} className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50">Remove</button>}
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSave}>
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="input-field w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-surface-400" />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field w-full pl-10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Preferred Language</label>
                <select name="language" value={formData.language} onChange={handleChange} className="input-field w-full">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Marathi">Marathi</option>
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-surface-900 dark:text-white pt-4">Location</h3>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">District</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Village/Town</label>
                <input type="text" name="village" value={formData.village} onChange={handleChange} className="input-field w-full" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-surface-900 dark:text-white pt-4">Farm Information</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Farm Name</label>
                <input type="text" name="farmName" value={formData.farmName} onChange={handleChange} className="input-field w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Total Area (Acres)</label>
                <input type="number" name="farmArea" value={formData.farmArea} onChange={handleChange} className="input-field w-full" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Primary Crops Grown</label>
                <input type="text" name="crops" value={formData.crops} onChange={handleChange} className="input-field w-full" placeholder="Comma separated e.g. Wheat, Rice" />
              </div>
            </div>

            {status.message && (
              <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'}`}>
                {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <p className="font-medium">{status.message}</p>
              </div>
            )}

            <div className="pt-6 flex justify-end">
              <button type="submit" disabled={isSaving} className="btn-primary px-8 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </motion.div>
  );
}
