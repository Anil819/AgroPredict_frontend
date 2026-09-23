import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Droplets, Wind, CloudRain, Search } from 'lucide-react';
import { weatherAPI } from '@/services/api';

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
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Indore');
  const [placeQuery, setPlaceQuery] = useState('Indore');
  const [places, setPlaces] = useState([]);

  const loadWeather = async (selectedCity) => {
    setLoading(true);
    setError('');
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        weatherAPI.current(selectedCity),
        weatherAPI.forecast(selectedCity),
      ]);
      setCurrent(currentResponse.data);
      setForecast(forecastResponse.data.forecast);
    } catch (requestError) {
      setCurrent(null);
      setForecast([]);
      setError(requestError.response?.data?.detail || 'Unable to load live weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadWeather(city);
  }, [city]);

  useEffect(() => {
    if (placeQuery.trim().length < 2 || placeQuery.trim() === city) {
      setPlaces([]);
      return undefined;
    }
    const timer = window.setTimeout(async () => {
      try {
        const response = await weatherAPI.searchPlaces(placeQuery);
        setPlaces(response.data);
      } catch {
        setPlaces([]);
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [placeQuery, city]);

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
        <div className="relative w-72 max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input value={placeQuery} onChange={(event) => setPlaceQuery(event.target.value)} placeholder="Search city, district, village" className="input-field w-full pl-9 py-2" />
          {places.length > 0 && (
            <div className="absolute z-20 top-12 left-0 right-0 rounded-xl border border-surface-200 dark:border-dark-border bg-white dark:bg-dark-surface shadow-xl p-2 max-h-64 overflow-y-auto">
              {places.map((place) => (
                <button key={`${place.latitude}-${place.longitude}`} type="button" onClick={() => { setCity(place.label); setPlaceQuery(place.label); setPlaces([]); }} className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-bg">
                  <span className="block text-sm font-medium text-surface-900 dark:text-white">{place.name}</span>
                  <span className="block text-xs text-surface-500 dark:text-surface-400">{place.label}</span>
                </button>
              ))}
            </div>
          )}
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
            <span className="text-lg font-medium">{current?.city || 'Loading...'}, {current?.country || ''}</span>
          </div>
          
          <div className="flex items-end space-x-4 mb-4">
            <h2 className="text-6xl font-bold">{current ? `${current.temperature}°C` : '--'}</h2>
            <div className="pb-1 text-primary-100">
              <p className="text-xl font-medium">{current?.condition || 'Loading weather...'}</p>
              <p className="text-sm">{current ? `Feels like ${current.feelsLike}°C` : ''}</p>
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
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{current ? `${current.humidity}%` : '--'}</p>
          </div>
        </div>
        <div className="card flex items-center p-6 space-x-4">
          <div className="p-4 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-500">
            <Wind className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Wind</p>
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{current ? `${current.wind} km/h` : '--'}</p>
          </div>
        </div>
        <div className="card flex items-center p-6 space-x-4">
          <div className="p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500">
            <CloudRain className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-surface-500 dark:text-surface-400">Rain Chance</p>
            <p className="text-2xl font-bold text-surface-900 dark:text-white">{current ? `${current.rainChance}%` : '--'}</p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">7-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecast.map((day, idx) => (
            <WeatherCard key={idx} day={{ ...day, temp: day.high }} />
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-surface-500">Loading live weather...</p>}
      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    </motion.div>
  );
}
