import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Cloud, Droplets, ThermometerSun, Wind } from 'lucide-react';
import { IMAGES } from '@/utils/mockData';
import { weatherAPI } from '@/services/api';

const StatCard = ({ title, value, icon, trend, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card border border-surface-100 dark:border-dark-border flex items-center gap-4"
  >
    <div className={`p-4 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
        {trend && <span className="text-xs font-medium text-green-600 dark:text-green-400">{trend}</span>}
      </div>
    </div>
  </motion.div>
);

const WeatherCard = ({ day, temp, icon, condition }) => (
  <div className="min-w-[100px] flex-shrink-0 bg-white dark:bg-dark-card p-4 rounded-xl border border-surface-100 dark:border-dark-border text-center shadow-sm">
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{day}</p>
    <div className="flex justify-center mb-2 text-primary-600 dark:text-primary-400">
      {icon === 'sun' ? <ThermometerSun className="h-6 w-6" /> : icon === 'rain' ? <Droplets className="h-6 w-6" /> : <Cloud className="h-6 w-6" />}
    </div>
    <p className="text-lg font-bold text-slate-900 dark:text-white">{temp}°</p>
    <p className="text-xs text-slate-500 mt-1">{condition}</p>
  </div>
);

const ProgressBar = ({ label, value, color }) => (
  <div className="mb-3">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <span className="text-slate-500">{value}%</span>
    </div>
    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [liveForecast, setLiveForecast] = useState(null);
  const [weatherError, setWeatherError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([weatherAPI.current(), weatherAPI.forecast()])
      .then(([currentResponse, forecastResponse]) => {
        setCurrentWeather(currentResponse.data);
        setLiveForecast(forecastResponse.data.forecast);
      })
      .catch((error) => {
        setWeatherError(error.response?.data?.detail || 'Live weather data is unavailable.');
      });
  }, []);

  const liveStats = currentWeather ? [
    { title: 'Temperature', value: `${currentWeather.temperature}°C`, icon: <ThermometerSun />, trend: currentWeather.condition, color: 'bg-orange-100 text-orange-600' },
    { title: 'Humidity', value: `${currentWeather.humidity}%`, icon: <Droplets />, trend: 'Current', color: 'bg-blue-100 text-blue-600' },
    { title: 'Rain Chance', value: `${currentWeather.rainChance}%`, icon: <Cloud />, trend: 'Forecast', color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Wind Speed', value: `${currentWeather.wind} km/h`, icon: <Wind />, trend: 'Current', color: 'bg-teal-100 text-teal-600' },
  ] : null;

  const liveWeather = liveForecast?.map((day) => ({
    day: day.day,
    temp: day.high,
    icon: day.icon === 'sun' ? 'sun' : day.icon === 'cloud-rain' ? 'rain' : 'cloud',
    condition: day.icon === 'sun' ? 'Sunny' : day.icon === 'cloud-rain' ? 'Rain' : 'Cloudy',
  }));

  return (
    <div className="p-4 md:p-8 space-y-8 bg-surface-50 dark:bg-dark-bg min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {liveStats ? liveStats.map((stat, i) => (
          <StatCard key={i} {...stat} delay={i * 0.1} />
        )) : <p className="col-span-full text-center text-slate-500">Loading live weather data...</p>}
      </div>

      {/* AI Recommendation Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative w-full rounded-2xl overflow-hidden shadow-card"
      >
        <div className="absolute inset-0">
          <img src={IMAGES?.wheat || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=2089&auto=format&fit=crop'} alt="Wheat field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-primary-900/70" />
        </div>
        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
              <span className="text-yellow-400">✨</span> AI Recommendation
            </h2>
            <p className="text-white/90 text-lg">Your current soil and weather conditions are highly suitable for Wheat.</p>
          </div>
          <button
            onClick={() => navigate('/crop-prediction')}
            className="bg-white text-primary-800 hover:bg-surface-50 font-semibold py-3 px-6 rounded-lg whitespace-nowrap transition-colors shadow-sm"
          >
            View Full Analysis
          </button>
        </div>
      </motion.div>

      {/* Two-column Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Weather Forecast */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card border border-surface-100 dark:border-dark-border">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">7-Day Weather Forecast</h3>
            <div className="flex overflow-x-auto gap-4 pb-2 snap-x">
              {liveWeather?.map((w, i) => (
                <div key={i} className="snap-start">
                  <WeatherCard {...w} />
                </div>
              ))}
            </div>
            {weatherError && <p className="mt-3 text-sm text-red-600">{weatherError}</p>}
            {!liveWeather && !weatherError && <p className="text-sm text-slate-500">Loading live forecast...</p>}
          </div>

          {/* Crop Growth Chart */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card border border-surface-100 dark:border-dark-border">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Crop Growth</h3>
            <div className="h-72 w-full">
              {<div className="h-full flex items-center justify-center text-slate-500">Live crop growth data is not available yet.</div>}
              {/* Crop growth chart requires a persisted crop observation API. */}
              {/* <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="growth" stroke="#16A34A" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
              </ResponsiveContainer> */}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          {/* Soil Health Card */}
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-card border border-surface-100 dark:border-dark-border h-full flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Soil Health</h3>
            
            <div className="flex justify-center items-center mb-8 flex-1">
              {/* Simple mock gauge */}
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#16A34A" strokeWidth="8" strokeDasharray={`${87 * 2.83} 283`} className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">87%</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Excellent</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-auto">
              <ProgressBar label="Nitrogen (N)" value={75} color="bg-blue-500" />
              <ProgressBar label="Phosphorus (P)" value={60} color="bg-orange-500" />
              <ProgressBar label="Potassium (K)" value={82} color="bg-purple-500" />
              <ProgressBar label="Moisture" value={68} color="bg-teal-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
