import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Beaker, Droplets, ArrowLeft, Loader2 } from 'lucide-react';
import api from '@/services/api';

const ParameterCard = ({ name, value, max, unit, status }) => {
  const percentage = Math.min((value / max) * 100, 100);
  const statusColor = status === 'Optimal' ? 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30' : 
                      status === 'Low' ? 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30' : 
                      'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
  
  const barColor = status === 'Optimal' ? 'bg-green-500' : status === 'Low' ? 'bg-orange-500' : 'bg-red-500';

  return (
    <div className="bg-white dark:bg-dark-card p-5 rounded-xl shadow-sm border border-surface-100 dark:border-dark-border">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{name}</span>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>{status}</span>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
        <span className="text-sm text-slate-500">{unit}</span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default function SoilAnalysis() {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    moisture: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        ph: parseFloat(formData.ph),
        moisture: parseFloat(formData.moisture)
      };

      const response = await api.post('/soil/analyze', payload);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze soil. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!result) {
    return (
      <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 bg-surface-50 dark:bg-dark-bg min-h-screen">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Soil Health Analysis</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Enter your soil test parameters to get a comprehensive health score and AI recommendations.</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-surface-200 dark:border-dark-border p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nitrogen (mg/kg)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Beaker className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="number" step="0.1" required name="nitrogen" value={formData.nitrogen} onChange={handleChange} placeholder="e.g. 45" className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-dark-surface border border-surface-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phosphorus (mg/kg)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Beaker className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="number" step="0.1" required name="phosphorus" value={formData.phosphorus} onChange={handleChange} placeholder="e.g. 20" className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-dark-surface border border-surface-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Potassium (mg/kg)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Beaker className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="number" step="0.1" required name="potassium" value={formData.potassium} onChange={handleChange} placeholder="e.g. 85" className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-dark-surface border border-surface-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">pH Level</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlertTriangle className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="number" step="0.1" required name="ph" value={formData.ph} onChange={handleChange} placeholder="e.g. 6.8" className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-dark-surface border border-surface-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Soil Moisture (%)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplets className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="number" step="0.1" required name="moisture" value={formData.moisture} onChange={handleChange} placeholder="e.g. 45" className="w-full pl-10 pr-4 py-3 bg-surface-50 dark:bg-dark-surface border border-surface-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all shadow-sm flex justify-center items-center gap-2">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Analyze Soil Health'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard Results View
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-surface-50 dark:bg-dark-bg min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setResult(null)} className="p-2 bg-white dark:bg-dark-card rounded-lg shadow-sm border border-surface-200 dark:border-dark-border text-slate-600 hover:text-primary-600 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Analysis Results</h1>
      </div>

      {/* Large Gauge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-8"
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-800" />
            <circle cx="50" cy="50" r="45" fill="none" stroke={result.healthScore >= 70 ? '#16A34A' : result.healthScore >= 50 ? '#F59E0B' : '#EF4444'} strokeWidth="8" strokeDasharray={`${result.healthScore * 2.83} 283`} className="transition-all duration-1000 ease-out drop-shadow-md" />
          </svg>
          <div className="absolute flex flex-col items-center bg-white dark:bg-dark-card p-6 rounded-full shadow-lg border border-surface-100 dark:border-dark-border">
            <span className="text-5xl font-bold text-slate-900 dark:text-white">{result.healthScore}<span className="text-2xl text-slate-400">%</span></span>
            <span className={`font-semibold mt-1 ${result.healthScore >= 70 ? 'text-green-600' : result.healthScore >= 50 ? 'text-orange-600' : 'text-red-600'}`}>
              {result.status}
            </span>
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-6 font-medium">Overall Soil Health Score</p>
      </motion.div>

      {/* Parameters Grid */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Current Parameters</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {result.parameters.map((param, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <ParameterCard 
                name={param.name} 
                value={param.value} 
                max={param.name === 'pH' ? 14 : 100} 
                unit={param.name === 'pH' ? '' : (param.name === 'Moisture' ? '%' : 'mg/kg')} 
                status={param.status} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">AI Recommendations</h3>
        <div className="space-y-4">
          {result.recommendations.map((rec, i) => {
            const isWarning = rec.includes('Apply agricultural lime') || rec.includes('Too alkaline');
            return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="bg-white dark:bg-dark-card p-5 rounded-xl shadow-sm border border-surface-100 dark:border-dark-border flex gap-4 items-start"
            >
              <div className={`p-2 rounded-full flex-shrink-0 mt-1 ${isWarning ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' : 'bg-green-100 text-green-600 dark:bg-green-900/30'}`}>
                {isWarning ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-lg">Recommendation {i + 1}</h4>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{rec}</p>
              </div>
            </motion.div>
          )})}
        </div>
      </div>

      <div className="text-center bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 mt-8">
        <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
          <Info className="h-4 w-4" /> This system provides AI-based agricultural estimates based on your field data inputs.
        </p>
      </div>
    </div>
  );
}
