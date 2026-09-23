import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, ChevronRight, TestTube, Thermometer, Droplets, MapPin } from 'lucide-react';
import { mlAPI, reportsAPI } from '@/services/api';

export default function CropPrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nitrogen: '', phosphorus: '', potassium: '', ph: '',
    temperature: '', humidity: '', rainfall: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await mlAPI.recommendCrop({
        n: Number(formData.nitrogen), p: Number(formData.phosphorus),
        k: Number(formData.potassium), ph: Number(formData.ph),
        temperature: Number(formData.temperature), humidity: Number(formData.humidity),
        rainfall: Number(formData.rainfall),
      });
      const predictionResult = { crop: response.data.crop, confidence: response.data.confidence, status: response.data.matchQuality, checks: response.data.details.map((item) => `${item.parameter}: ${item.status}`), alternatives: response.data.alternativeCrops };
      setResult(predictionResult);
      reportsAPI.generate({ title: 'Crop Recommendation Report', reportType: 'Crop', predictionId: 'crop-latest', inputData: formData, outputData: predictionResult }).catch(() => {});
    } catch (requestError) {
      setResult(null);
      setError(requestError.response?.data?.detail || 'The trained crop model could not return a result.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-surface-50 dark:bg-dark-bg min-h-screen">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Find The Right Crop For Your Land</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Enter your soil and climate parameters to get the best crop recommendation backed by AI intelligence.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 shadow-card border border-surface-100 dark:border-dark-border"
        >
          <form onSubmit={handlePredict} className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TestTube className="h-5 w-5 text-primary-600" /> Soil Parameters
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nitrogen (N)</label>
                  <input type="number" name="nitrogen" required value={formData.nitrogen} onChange={handleChange} placeholder="40" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phosphorus (P)</label>
                  <input type="number" name="phosphorus" required value={formData.phosphorus} onChange={handleChange} placeholder="45" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Potassium (K)</label>
                  <input type="number" name="potassium" required value={formData.potassium} onChange={handleChange} placeholder="48" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">pH Level</label>
                  <input type="number" name="ph" step="0.1" required value={formData.ph} onChange={handleChange} placeholder="6.5" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-primary-600" /> Climate
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Temperature (°C)</label>
                  <input type="number" name="temperature" required value={formData.temperature} onChange={handleChange} placeholder="25" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Humidity (%)</label>
                  <input type="number" name="humidity" required value={formData.humidity} onChange={handleChange} placeholder="70" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rainfall (mm)</label>
                  <input type="number" name="rainfall" required value={formData.rainfall} onChange={handleChange} placeholder="200" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-dark-border bg-transparent dark:text-white focus:ring-2 focus:ring-primary-600" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70">
              {loading ? 'Analyzing Data...' : <><Sparkles className="h-5 w-5" /> Predict Crop</>}
            </button>
          </form>
        </motion.div>

        {/* Right: Result */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-full flex"
        >
          {loading ? (
            <div className="w-full bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card border border-surface-100 dark:border-dark-border flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Predicting ideal crop...</p>
              <p className="text-sm text-slate-400 mt-2">Running AI models on your parameters</p>
            </div>
          ) : result ? (
            <div className="w-full bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card border border-surface-100 dark:border-dark-border">
              <div className="text-center mb-8">
                <span className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  {result.confidence}% Confidence
                </span>
                <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase mb-2">
                  {result.crop}
                </h2>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">{result.status}</p>
              </div>

              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Why this is a good match:</h4>
                {result.checks.map((check, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-1 rounded-full text-green-600 dark:text-green-400 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{check}</p>
                  </div>
                ))}
              </div>

              {result.alternatives && result.alternatives.length > 0 && (
                <div className="mb-8 pt-6 border-t border-slate-100 dark:border-dark-border">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Alternative Crops to Consider:</h4>
                  <div className="flex gap-3 flex-wrap">
                    {result.alternatives.map((alt, i) => (
                      <span key={i} className="bg-slate-100 dark:bg-dark-surface px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-dark-border">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                View Details <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="w-full bg-slate-50 dark:bg-dark-surface rounded-2xl p-8 border-2 border-dashed border-slate-200 dark:border-dark-border flex flex-col items-center justify-center min-h-[400px] text-center">
              <MapPin className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">Ready to predict</h3>
              <p className="text-slate-500 max-w-sm">{error || 'Enter your land parameters on the left and click Predict to see the trained model recommendation.'}</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
