import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cropsList } from '@/utils/mockData';
import { profitAPI, reportsAPI } from '@/services/api';

export default function ProfitPrediction() {
  const [formData, setFormData] = useState({
    crop: '', area: '', yield: '', price: '', 
    fertilizer: '', labor: '', irrigation: '', other: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCalculating(true);
    setError('');

    const payload = {
      crop: formData.crop,
      landArea: Number(formData.area),
      expectedYield: Number(formData.yield),
      marketPrice: Number(formData.price),
      fertilizerCost: Number(formData.fertilizer),
      laborCost: Number(formData.labor),
      irrigationCost: Number(formData.irrigation),
      otherCosts: Number(formData.other),
    };

    try {
      const response = await profitAPI.predict(payload);
      const prediction = {
        ...response.data,
        estimatedProfit: response.data.estimatedProfit ?? response.data.profit,
      };
      setResult(prediction);
      reportsAPI.generate({
        title: `${formData.crop} Profit Report`,
        reportType: 'Profit',
        predictionId: 'profit-latest',
        inputData: formData,
        outputData: prediction,
      }).catch(() => {});
    } catch (requestError) {
      const detail = requestError.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Unable to calculate profit. Please check your inputs and try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const chartData = result ? [
    { name: 'Financials', Revenue: result.revenue, Cost: result.totalCost, Profit: result.estimatedProfit }
  ] : [];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="page-header whitespace-pre-line">{"Know Your Farm's Potential\nBefore You Plant."}</h1>
        <p className="page-subtitle mt-2">Estimate costs, revenues, and net profits with high accuracy.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left - Form */}
        <div className="lg:col-span-5 card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-200 dark:border-dark-border pb-2">Inputs & Estimates</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Crop</label>
                <select name="crop" value={formData.crop} onChange={handleChange} className="input-field w-full" required>
                  <option value="">Select Crop</option>
                  {cropsList.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Land Area (acres)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} className="input-field w-full" min="0.01" step="any" required />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Expected Yield (tons/acre)</label>
                <input type="number" name="yield" value={formData.yield} onChange={handleChange} className="input-field w-full" min="0.01" step="any" required />
              </div>
              
              <div className="col-span-2">
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Market Price (₹/quintal)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="input-field w-full" min="0.01" step="any" required />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-surface-900 dark:text-white border-b border-surface-200 dark:border-dark-border pb-2 mt-6">Cost Breakdown (₹)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Fertilizer Cost</label>
                <input type="number" name="fertilizer" value={formData.fertilizer} onChange={handleChange} className="input-field w-full" min="0" step="any" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Labor Cost</label>
                <input type="number" name="labor" value={formData.labor} onChange={handleChange} className="input-field w-full" min="0" step="any" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Irrigation Cost</label>
                <input type="number" name="irrigation" value={formData.irrigation} onChange={handleChange} className="input-field w-full" min="0" step="any" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Other Costs</label>
                <input type="number" name="other" value={formData.other} onChange={handleChange} className="input-field w-full" min="0" step="any" required />
              </div>
            </div>

            <p className="text-xs text-surface-500 dark:text-surface-400">Revenue = land area × yield × 10 quintals per tonne × market price. Cost inputs are totals for the full land area.</p>

            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <button type="submit" className="btn-primary w-full py-3 mt-4 flex justify-center items-center space-x-2" disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <IndianRupee className="w-5 h-5" />
                  <span>Calculate Profit</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right - Results */}
        <div className="lg:col-span-7">
          {result ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5 border-l-4 border-l-blue-500">
                  <p className="text-sm text-surface-500 dark:text-surface-400 font-medium mb-1">Estimated Revenue</p>
                  <p className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.revenue)}</p>
                </div>
                
                <div className="card p-5 border-l-4 border-l-red-500">
                  <p className="text-sm text-surface-500 dark:text-surface-400 font-medium mb-1">Total Cost</p>
                  <p className="text-2xl font-bold text-surface-900 dark:text-white">{formatCurrency(result.totalCost)}</p>
                </div>
              </div>

              <div className="card p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 border-primary-200 dark:border-primary-800 border-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-primary-700 dark:text-primary-400 font-bold uppercase tracking-wider mb-2">Estimated Net Profit</p>
                    <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-400">{formatCurrency(result.estimatedProfit)}</p>
                  </div>
                  <div className="p-4 bg-white dark:bg-dark-surface rounded-full shadow-sm">
                    <TrendingUp className="w-8 h-8 text-primary-600" />
                  </div>
                </div>
              </div>

              <div className="card p-6 h-64">
                <h3 className="text-sm font-semibold text-surface-700 dark:text-surface-200 mb-4">Financial Overview</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" hide />
                    <YAxis tickFormatter={(value) => `₹${value / 1000}k`} stroke="#94a3b8" fontSize={12} />
                    <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => formatCurrency(value)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Profit" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ) : (
            <div className="card p-6 h-full flex flex-col items-center justify-center text-center min-h-[500px]">
              <div className="w-24 h-24 bg-surface-50 dark:bg-dark-surface rounded-full flex items-center justify-center mb-6">
                <Wallet className="w-12 h-12 text-surface-300 dark:text-surface-600" />
              </div>
              <h3 className="text-xl font-medium text-surface-900 dark:text-white mb-2">Ready to Calculate</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md">
                Enter your crop details, expected yield, and estimated costs to get a comprehensive financial projection for your upcoming season.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
