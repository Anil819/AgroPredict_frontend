import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wheat, 
  Layers, 
  CloudSun, 
  Scan, 
  Droplets, 
  IndianRupee,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  const services = [
    {
      num: '01',
      title: 'Precision Crop Planning',
      description: 'AI-powered crop recommendations tailored to your unique soil composition, local climate patterns, and historical yield data to ensure maximum viability.',
      icon: Wheat,
      link: '/crop-prediction'
    },
    {
      num: '02',
      title: 'Intelligent Soil Analysis',
      description: 'Comprehensive soil health monitoring and nutrient analysis to determine precise fertilizer requirements, reducing waste and improving soil longevity.',
      icon: Layers,
      link: '/soil-analysis'
    },
    {
      num: '03',
      title: 'Weather-Based Decisions',
      description: 'Real-time weather intelligence and hyper-local forecasting to help you plan sowing, harvesting, and application of treatments with confidence.',
      icon: CloudSun,
      link: '/weather'
    },
    {
      num: '04',
      title: 'AI Plant Diagnosis',
      description: 'Instant plant disease detection using computer vision technology. Simply upload a photo to receive an accurate diagnosis and treatment plan.',
      icon: Scan,
      link: '/disease-detection'
    },
    {
      num: '05',
      title: 'Smart Irrigation',
      description: 'Data-driven irrigation scheduling to optimize water usage based on soil moisture levels, evapotranspiration rates, and impending rainfall.',
      icon: Droplets,
      link: '/irrigation'
    },
    {
      num: '06',
      title: 'Farm Profit Intelligence',
      description: 'Advanced revenue estimation, operational cost analysis, and profit forecasting to help you manage the financial health of your agricultural enterprise.',
      icon: IndianRupee,
      link: '/profit-prediction'
    }
  ];

  return (
    <div className="w-full bg-surface-50 dark:bg-dark-bg min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="section-padding text-center max-w-4xl mx-auto">
        <motion.div {...fadeIn}>
          <h1 className="page-header text-5xl lg:text-6xl">
            From Seed To Harvest,<br />
            <span className="text-gradient">AgroPredict AI Works With You.</span>
          </h1>
          <p className="page-subtitle text-xl mt-6">
            Explore our comprehensive suite of intelligent services designed to support and optimize your workflow at every stage of your farming journey.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="section-padding max-w-7xl mx-auto pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="card relative bg-white dark:bg-dark-card p-8 rounded-2xl shadow-card border border-surface-100 dark:border-dark-border overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Large Background Number */}
              <div className="absolute top-4 right-4 text-7xl font-black text-primary-50 dark:text-primary-900/10 group-hover:text-primary-100 dark:group-hover:text-primary-900/20 transition-colors duration-300 z-0 select-none">
                {service.num}
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-xl flex items-center justify-center mb-6">
                  <service.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 min-h-[100px]">
                  {service.description}
                </p>
                
                <Link 
                  to={service.link}
                  className="inline-flex items-center text-gray-900 dark:text-white font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors group/btn"
                >
                  Learn More <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform text-primary-600" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;
