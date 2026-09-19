import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sprout, 
  ArrowRight, 
  Users, 
  Target, 
  Wheat, 
  Bot, 
  Database, 
  Brain, 
  Activity 
} from 'lucide-react';
import { IMAGES, videosData } from '@/utils/mockData';
import { useCountUp } from '@/hooks/useCountUp';
import VideoCard from '@/components/VideoCard';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const farmersCount = useCountUp(10000, 2000).count;
  const accuracyCount = useCountUp(95, 2000).count;
  const cropsCount = useCountUp(50, 2000).count;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="w-full bg-surface-50 dark:bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side */}
          <motion.div 
            className="lg:w-1/2 flex flex-col items-start z-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-100 mb-6 border border-primary-200 dark:border-primary-800/50">
              <Sprout size={18} className="text-primary-600" />
              <span className="text-sm font-medium">AI Powered Agriculture</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Predict Better.<br />
              <span className="text-gradient">Grow Smarter.</span><br />
              Farm The Future.
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Leverage the power of Artificial Intelligence to make data-driven decisions for your farm. Optimize yields, reduce risks, and secure your agricultural future with AgroPredict.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/login" className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Start Predicting <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="btn-secondary flex items-center justify-center px-8 py-4 text-lg">
                Explore Products
              </Link>
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div 
            className="lg:w-1/2 relative w-full h-[500px] lg:h-[600px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/20 rounded-[3rem] transform rotate-3 scale-105 -z-10 blur-xl opacity-50"></div>
            <img 
              src={IMAGES.hero} 
              alt="Farmer using technology in field" 
              className="w-full h-full object-cover rounded-[2rem] shadow-2xl border-4 border-white dark:border-dark-surface"
            />
            
            {/* Floating Badges */}
            <motion.div 
              className="glass-card absolute top-10 right-[-1rem] lg:right-[-2rem] p-4 flex items-center gap-4 rounded-xl shadow-lg border border-white/40 dark:border-white/10"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600">
                <Wheat size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">AI Crop Prediction</p>
                <p className="font-bold text-gray-900 dark:text-white">Wheat</p>
                <p className="text-xs text-primary-600 font-semibold">94% Confidence</p>
              </div>
            </motion.div>

            <motion.div 
              className="glass-card absolute top-1/2 left-[-1rem] lg:left-[-3rem] -translate-y-1/2 p-4 flex items-center gap-4 rounded-xl shadow-lg border border-white/40 dark:border-white/10"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Weather Intelligence</p>
                <p className="font-bold text-gray-900 dark:text-white">28°C</p>
                <p className="text-xs text-blue-600 font-semibold">Optimal Conditions</p>
              </div>
            </motion.div>

            <motion.div 
              className="glass-card absolute bottom-10 right-10 p-4 flex items-center gap-4 rounded-xl shadow-lg border border-white/40 dark:border-white/10"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
            >
              <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-600">
                <Database size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Soil Health</p>
                <p className="font-bold text-gray-900 dark:text-white">87%</p>
                <p className="text-xs text-amber-600 font-semibold">Excellent</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-primary-50 dark:bg-dark-surface border-y border-primary-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-primary-200/50 dark:divide-dark-border/50">
            <div className="flex flex-col items-center text-center px-4">
              <Users className="text-primary-600 mb-3" size={32} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{farmersCount}K+</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Farmers</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <Target className="text-primary-600 mb-3" size={32} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{accuracyCount}%</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">AI Prediction Accuracy</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <Wheat className="text-primary-600 mb-3" size={32} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{cropsCount}+</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Crop Types</p>
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <Bot className="text-primary-600 mb-3" size={32} />
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">24/7</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">AI Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" {...fadeIn}>
          <h2 className="page-header">How AgroPredict Works</h2>
          <p className="page-subtitle mx-auto">
            Our powerful AI turns complex agricultural data into simple, actionable insights in four easy steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-primary-100 dark:bg-dark-border -translate-y-1/2 z-0 rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
            {[
              { num: '01', title: 'COLLECT', desc: 'Soil + Weather + Crop Data', icon: Database },
              { num: '02', title: 'ANALYZE', desc: 'AI/ML Processing & Analysis', icon: Brain },
              { num: '03', title: 'PREDICT', desc: 'Accurate Recommendations', icon: Target },
              { num: '04', title: 'ACT', desc: 'Farmer Action', icon: Sprout }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card border border-surface-100 dark:border-dark-border text-center relative group hover:-translate-y-2 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={32} />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-primary-600/30 border-4 border-white dark:border-dark-bg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-surface-50 dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" {...fadeIn}>
            <h2 className="page-header">Watch How AgroPredict Works</h2>
            <p className="page-subtitle mx-auto">
              See our AI platform in action and learn how farmers are transforming their yields.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videosData.slice(0, 4).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
