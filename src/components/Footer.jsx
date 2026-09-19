import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-1">
          <Logo />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Predict Better. Grow Smarter.</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Products</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/crop-prediction" className="hover:text-primary-600 transition-colors">Crop Prediction</Link></li>
            <li><Link to="/soil-analysis" className="hover:text-primary-600 transition-colors">Soil Analysis</Link></li>
            <li><Link to="/weather" className="hover:text-primary-600 transition-colors">Weather</Link></li>
            <li><Link to="/disease-detection" className="hover:text-primary-600 transition-colors">Disease Detection</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary-600 transition-colors">Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary-600 transition-colors">Contact</Link></li>
            <li><Link to="/about#how-it-works" className="hover:text-primary-600 transition-colors">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li><Link to="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary-600 transition-colors">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="hover:text-primary-600 transition-colors">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-500">© 2026 AgroPredict AI. All rights reserved.</p>
        <div className="flex items-center gap-4 text-gray-400">
          <a href="#" className="hover:text-primary-600 transition-colors"><Twitter size={20} /></a>
          <a href="#" className="hover:text-primary-600 transition-colors"><Facebook size={20} /></a>
          <a href="#" className="hover:text-primary-600 transition-colors"><Instagram size={20} /></a>
          <a href="#" className="hover:text-primary-600 transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
