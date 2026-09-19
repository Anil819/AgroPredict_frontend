import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { IMAGES, indianStates } from '@/utils/mockData';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    state: '',
    district: '',
    village: '',
    language: 'English',
    accountType: 'Farmer',
    agreed: false
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert('Please agree to the Terms & Privacy Policy');
      return;
    }
    setLoading(true);
    try {
      if (register) {
        await register({
          fullName: formData.name,
          email: formData.email,
          mobileNumber: formData.phone,
          password: formData.password,
          state: formData.state,
          district: formData.district,
          village: formData.village,
          preferredLanguage: formData.language,
          accountType: formData.accountType,
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-surface-50 dark:bg-dark-bg">
      {/* Left Half */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-end p-12">
        <div className="absolute inset-0">
          <img src={IMAGES?.registerBg || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop'} alt="Farming field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-primary-900/70" />
        </div>
        <div className="relative z-10 text-white max-w-xl">
          <h1 className="text-4xl font-bold mb-4">Better Data.<br/>Better Decisions.<br/>Better Harvests.</h1>
        </div>
      </div>

      {/* Right Half */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto max-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card border border-surface-100 dark:border-dark-border my-auto"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 transition-shadow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 transition-shadow" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Mobile Number" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 transition-shadow" />
              </div>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleChange} placeholder="Password" className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600 transition-shadow" />
              {formData.password && (
                <div className="mt-1 text-xs text-primary-600">Password strength: {formData.password.length > 8 ? 'Strong' : 'Weak'}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select name="state" required value={formData.state} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600">
                <option value="" disabled>State</option>
                {(indianStates || ['Maharashtra', 'Punjab', 'Haryana']).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="text" name="district" required value={formData.district} onChange={handleChange} placeholder="District" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600" />
              <input type="text" name="village" value={formData.village} onChange={handleChange} placeholder="Village" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600" />
            </div>

            <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-600">
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish</option>
            </select>

            <div className="pt-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Account Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Farmer 🌾', 'Agriculture Professional 🔬', 'Student 📚'].map((type) => (
                  <label key={type} className={`border rounded-lg p-2 text-center text-sm cursor-pointer transition-colors ${formData.accountType === type.split(' ')[0] ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-dark-surface'}`}>
                    <input type="radio" name="accountType" value={type.split(' ')[0]} checked={formData.accountType === type.split(' ')[0]} onChange={handleChange} className="hidden" />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center text-sm pt-2">
              <label className="flex items-center text-slate-600 dark:text-slate-400 cursor-pointer">
                <input type="checkbox" name="agreed" checked={formData.agreed} onChange={handleChange} className="mr-2 rounded border-slate-300 text-primary-600 focus:ring-primary-600" />
                I agree to Terms & Privacy Policy
              </label>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center mt-4">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-800 font-semibold transition-colors">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
