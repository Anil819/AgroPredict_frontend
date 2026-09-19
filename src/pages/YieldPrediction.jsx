import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Calendar, CloudRain, Thermometer, Droplets, MapPin, TrendingUp, HelpCircle } from 'lucide-react';
import { cropsList, indianStates, seasonsList, yieldPredictionResult } from '@/utils/mockData';

export default function YieldPrediction() {
  const [formData, setFormData] = useState({
    crop: '', area: '', state: '', district: '', season: '',
    rainfall: '', temperature: '', fertilizer: '', irrigation: ''
  });
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPredicting(true);
    setTimeout(() => {
      setIsPredicting(false);
      setResult(yieldPredictionResult);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">Predict Your Crop Yield</h1>
        <p className="page-subtitle">Estimate expected yield based on your farm conditions.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-7 card p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Crop</label>
                <select name="crop" value={formData.crop} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Crop</option>
                  {cropsList.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Area (acres)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="input-field w-full" placeholder="e.g. 5" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">State</label>
                <select name="state" value={formData.state} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select State</option>
                  {indianStates.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">District</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className="input-field w-full" placeholder="e.g. Pune" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Season</label>
                <select name="season" value={formData.season} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Season</option>
                  {seasonsList.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Irrigation Method</label>
                <select name="irrigation" value={formData.irrigation} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Method</option>
                  <option value="Rainfed">Rainfed</option>
                  <option value="Canal">Canal</option>
                  <option value="Drip">Drip</option>
                  <option value="Sprinkler">Sprinkler</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Rainfall (mm)</label>
                <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} className="input-field w-full" placeholder="e.g. 800" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Temperature (°C)</label>
                <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} className="input-field w-full" placeholder="e.g. 25" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Fertilizer Usage (kg/acre)</label>
                <input type="number" name="fertilizer" value={formData.fertilizer} onChange={handleChange} className="input-field w-full" placeholder="e.g. 50" required />
              </div>
            </div>
            
            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center space-x-2" disabled={isPredicting}>
              {isPredicting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span>Predict Yield</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-5">
          {result ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-surface dark:to-dark-card border border-primary-200 dark:border-primary-900/30 h-full flex flex-col">
              <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-6">Prediction Results</h2>
              
              <div className="text-center mb-8">
                <p className="text-sm font-medium text-primary-700 dark:text-primary-400 mb-2 uppercase tracking-wide">Expected Yield</p>
                <div className="text-5xl font-extrabold text-primary-600 dark:text-primary-500 mb-2">{result.yield}</div>
                <p className="text-lg text-surface-600 dark:text-surface-300 font-medium">tons/acre</p>
              </div>

              <div className="bg-white dark:bg-dark-surface rounded-xl p-4 shadow-sm mb-6 flex justify-between items-center border border-surface-100 dark:border-dark-border">
                <div>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Estimated Range</p>
                  <p className="font-semibold text-surface-900 dark:text-white">{result.range} tons/acre</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-surface-500 dark:text-surface-400">AI Confidence</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">{result.confidence}%</p>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 text-sm">Key Factors</h3>
                <div className="space-y-3">
                  {result.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm">
                      <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${factor.impact === 'positive' ? 'bg-green-500' : factor.impact === 'negative' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                      <p className="text-surface-700 dark:text-surface-300">{factor.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-primary-200 dark:border-dark-border flex items-start space-x-2 text-xs text-surface-500 dark:text-surface-400">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>AI estimate — actual yield may vary depending on field conditions.</p>
              </div>
            </motion.div>
          ) : (
            <div className="card p-6 h-full flex flex-col items-center justify-center text-center text-surface-500 dark:text-surface-400 min-h-[400px]">
              <div className="w-20 h-20 bg-surface-100 dark:bg-dark-surface rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-surface-300 dark:text-surface-600" />
              </div>
              <h3 className="text-lg font-medium text-surface-900 dark:text-white mb-2">Awaiting Data</h3>
              <p className="max-w-xs">Fill out the form and click Predict Yield to see your AI-generated estimate.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
