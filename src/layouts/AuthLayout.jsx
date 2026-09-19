import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ image, title, subtitle, features, children }) => {
  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Left side - Image & Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-900">
        <div className="absolute inset-0">
          <img
            src={image || 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80'}
            alt="Agriculture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30 dark:from-black dark:via-black/70 dark:to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-end p-12 text-white h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block mb-12">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">AI</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">AgroPredict</span>
              </div>
            </Link>

            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md">{subtitle}</p>
            
            <div className="space-y-4">
              {features?.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary-400" />
                  <span className="text-gray-200">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-dark-surface relative">
        <Link 
          to="/" 
          className="lg:hidden absolute top-8 left-6 flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">AI</span>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">AgroPredict</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
