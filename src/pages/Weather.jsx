import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Droplets, Wind, CloudRain, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { weatherData } from '@/utils/mockData';

const WeatherCard = ({ day }) => {
  return (
    <div className="card text-center p-4">
      <p className="text-sm text-surface-500 dark:text-surface-400 font-medium mb-2">{day.day}</p>
      <div className="flex justify-center mb-2">
        {day.condition === 'Sunny' ? (
          <span className="text-yellow-500 text-3xl">☀️</span>
        ) : day.condition === 'Rain' ? (
          <CloudRain className="w-8 h-8 text-blue-500" />
        ) : (
          <span className="text-gray-400 text-3xl">☁️</span>
        )}
      </div>
      <p className="text-lg font-bold text-surface-900 dark:text-white">{day.temp}°C</p>
      <p className="text-xs text-surface-500 dark:text-surface-400">{day.condition}</p>
    </div>
  );
};

export default function Weather() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="page-header">Weather Forecast</h1>
          <p className="page-subtitle">Real-time weather insights for your farm.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white border-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <CloudRain className="w-48 h-48" />
        </div>
        <div className="relative z-10 p-8">
          <div className="flex items-center space-x-2 text-primary-100 mb-6">
            <MapPin className="w-5 h-5" />
            <span className="text-lg font-medium">Indore, India</span>
          </div>
          
          <div className="flex items-end space-x-4 mb-4">
            <h2 className="text-6xl font-bold">28°C</h2>
            <div className="pb-1 text-primary-100">
              <p className="text-xl font-medium">Partly Cloudy</p>
              <p className="text-sm">Feels like 30°C</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card flex items-center p-6 space-x-4">
          <div className="p-4 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500">
            <Droplets className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Humidity</p>
            <p className="text-2xl font-bold text-surface-900 dark:text-white">60%</p>
          </div>
        </div>
        <div className="card flex items-center p-6 space-x-4">
          <div className="p-4 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-500">
            <Wind className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Wind</p>
            <p className="text-2xl font-bold text-surface-900 dark:text-white">12 km/h</p>
          </div>
        </div>
        <div className="card flex items-center p-6 space-x-4">
          <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500">
            <CloudRain className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Rain Chance</p>
            <p className="text-2xl font-bold text-surface-900 dark:text-white">20%</p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {weatherData.forecast.map((day, idx) => (
            <WeatherCard key={idx} day={day} />
          ))}
        </div>
      </div>

      {/* Farming Weather Intelligence */}
      <div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">Farming Weather Intelligence</h3>
        <div className="grid gap-4">
          {weatherData.farmingAdvice.map((advice, idx) => {
            const isInfo = advice.type === 'info';
            const isWarning = advice.type === 'warning';
            const isSuccess = advice.type === 'success';

            const Icon = isWarning ? AlertTriangle : isSuccess ? CheckCircle : Info;
            const borderColors = isWarning ? 'border-amber-500' : isSuccess ? 'border-green-500' : 'border-blue-500';
            const iconColors = isWarning ? 'text-amber-500' : isSuccess ? 'text-green-500' : 'text-blue-500';

            return (
              <div key={idx} className={`card border-l-4 ${borderColors} p-4 flex space-x-4 items-start`}>
                <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${iconColors}`} />
                <div>
                  <h4 className="font-semibold text-surface-900 dark:text-white">{advice.title}</h4>
                  <p className="text-surface-600 dark:text-surface-300 mt-1">{advice.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
