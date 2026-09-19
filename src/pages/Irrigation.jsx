import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, CloudRain, Clock, AlertTriangle } from 'lucide-react';
import { cropsList, soilTypes, irrigationResult } from '@/utils/mockData';

export default function Irrigation() {
  const [formData, setFormData] = useState({
    crop: '', moisture: '', temp: '', humidity: '', rain: '', soil: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setResult(irrigationResult);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">Smart Irrigation Advisor</h1>
        <p className="page-subtitle">Get data-driven irrigation recommendations based on soil moisture and weather.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Crop</label>
                <select name="crop" value={formData.crop} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Crop</option>
                  {cropsList.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Soil Moisture (%)</label>
                <input type="number" min="0" max="100" name="moisture" value={formData.moisture} onChange={handleChange} className="input-field w-full" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Soil Type</label>
                <select name="soil" value={formData.soil} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Soil</option>
                  {soilTypes.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Temperature (°C)</label>
                <input type="number" name="temp" value={formData.temp} onChange={handleChange} className="input-field w-full" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Humidity (%)</label>
                <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} className="input-field w-full" required />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Rain Forecast</label>
                <select name="rain" value={formData.rain} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Forecast</option>
                  <option value="No Rain">No Rain</option>
                  <option value="Light Rain">Light Rain</option>
                  <option value="Moderate Rain">Moderate Rain</option>
                  <option value="Heavy Rain">Heavy Rain</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3 mt-2 flex justify-center items-center space-x-2" disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Droplets className="w-5 h-5" />
                  <span>Get Recommendation</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Result */}
        <div className="card p-6 flex flex-col justify-center">
          {result ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <div className={`text-center p-6 rounded-2xl ${result.action === 'Delay Irrigation' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-100' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'}`}>
                <h2 className="text-3xl font-extrabold mb-2">{result.action}</h2>
                <p className="text-sm font-medium opacity-80">{result.reason}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-surface-900 dark:text-white">Details & Recommendations</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-50 dark:bg-dark-surface p-4 rounded-xl border border-surface-100 dark:border-dark-border flex flex-col items-center justify-center text-center">
                    <Droplets className="w-6 h-6 text-blue-500 mb-2" />
                    <p className="text-xs text-surface-500 dark:text-surface-400">Recommended Water</p>
                    <p className="font-bold text-surface-900 dark:text-white mt-1">{result.waterQuantity}</p>
                  </div>
                  
                  <div className="bg-surface-50 dark:bg-dark-surface p-4 rounded-xl border border-surface-100 dark:border-dark-border flex flex-col items-center justify-center text-center">
                    <Clock className="w-6 h-6 text-primary-500 mb-2" />
                    <p className="text-xs text-surface-500 dark:text-surface-400">Best Time to Irrigate</p>
                    <p className="font-bold text-surface-900 dark:text-white mt-1">{result.bestTime}</p>
                  </div>
                </div>

                <ul className="space-y-3 mt-4">
                  {result.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm">
                      <div className="mt-1 bg-primary-100 dark:bg-primary-900/30 p-1 rounded-full">
                        <AlertTriangle className="w-3 h-3 text-primary-600 dark:text-primary-400" />
                      </div>
                      <span className="text-surface-700 dark:text-surface-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-surface-500 dark:text-surface-400 py-12">
              <Droplets className="w-16 h-16 text-surface-300 dark:text-surface-600 mb-4" />
              <p>Enter your field conditions to receive a custom irrigation schedule.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
