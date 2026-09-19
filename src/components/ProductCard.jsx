import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

const ProductCard = ({ icon, title, description, buttonText, buttonLink, index = 0 }) => {
  const Icon = Icons[icon] || Icons.HelpCircle;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-dark-surface rounded-2xl p-8 shadow-card border border-gray-100 dark:border-dark-border hover:shadow-card-hover transition-all flex flex-col h-full"
    >
      <div className="h-14 w-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 flex-1 leading-relaxed">{description}</p>
      <Link to={buttonLink} className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
        {buttonText} <Icons.ArrowRight size={18} className="ml-2" />
      </Link>
    </motion.div>
  );
};
export default ProductCard;
