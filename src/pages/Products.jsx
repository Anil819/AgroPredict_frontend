import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wheat, 
  Layers, 
  CloudSun, 
  Scan, 
  Droplets, 
  TrendingUp, 
  ArrowRight 
} from 'lucide-react';
import { IMAGES } from '@/utils/mockData';

const ProductCard = ({ icon: Icon, title, description, linkText, linkTo, index }) => (
  <motion.div 
    className="card bg-white dark:bg-dark-card p-8 rounded-2xl shadow-card border border-surface-100 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700/50 transition-all duration-300 flex flex-col h-full group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow">{description}</p>
    <Link 
      to={linkTo} 
      className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors mt-auto group/link"
    >
      {linkText} <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
    </Link>
  </motion.div>
);

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const products = [
    {
      icon: Wheat,
      title: 'Crop Prediction',
      description: 'Find the best crop for your soil and climate using advanced AI modeling.',
      linkText: 'Try Now',
      linkTo: '/crop-prediction'
    },
    {
      icon: Layers,
      title: 'Soil Analysis',
      description: 'Understand your soil health and nutrient condition to optimize fertilizer usage.',
      linkText: 'Analyze Soil',
      linkTo: '/soil-analysis'
    },
    {
      icon: CloudSun,
      title: 'Weather Intelligence',
      description: 'Get real-time weather information and historical data tailored for your farm.',
      linkText: 'View Weather',
      linkTo: '/weather'
    },
    {
      icon: Scan,
      title: 'Disease Detection',
      description: 'Identify crop diseases instantly using AI-powered image analysis and get treatment plans.',
      linkText: 'Detect Disease',
      linkTo: '/disease-detection'
    },
    {
      icon: Droplets,
      title: 'Smart Irrigation',
      description: 'Know exactly when and how much to irrigate based on hyper-local data.',
      linkText: 'Check Irrigation',
      linkTo: '/irrigation'
    },
    {
      icon: TrendingUp,
      title: 'Profit Prediction',
      description: 'Estimate crop yield, calculate potential profit and analyze financial risks.',
      linkText: 'Calculate Profit',
      linkTo: '/profit-prediction'
    }
  ];

  return (
    <div className="w-full bg-surface-50 dark:bg-dark-bg min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="section-padding text-center max-w-4xl mx-auto">
        <motion.div {...fadeIn}>
          <h1 className="page-header text-5xl lg:text-6xl">
            Powerful AI Tools<br />
            <span className="text-gradient">For Modern Farming</span>
          </h1>
          <p className="page-subtitle text-xl mt-6">
            One intelligent platform for every important farming decision. Maximize your yield and minimize risk with data-driven insights.
          </p>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="section-padding max-w-7xl mx-auto pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} index={index} {...product} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding max-w-7xl mx-auto">
        <motion.div 
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 z-0">
            <img 
              src={IMAGES.field || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} 
              alt="Lush green agriculture field" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/70 dark:bg-gray-900/80 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 py-16 px-6 text-center lg:py-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart Tools. Better Harvests.
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              Join thousands of farmers using AgroPredict for better crop decisions. Experience the future of agriculture today.
            </p>
            <Link to="/register" className="btn-primary inline-flex px-10 py-4 text-lg">
              Get Started for Free
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Products;
