import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, PlayCircle } from 'lucide-react';
import { IMAGES } from '@/utils/mockData';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="w-full bg-surface-50 dark:bg-dark-bg min-h-screen pt-24 pb-12">
      {/* Hero Section */}
      <section className="section-padding text-center max-w-4xl mx-auto pb-12">
        <motion.div {...fadeIn}>
          <h1 className="page-header text-5xl lg:text-6xl">
            Let's Grow <span className="text-gradient">Something Better.</span>
          </h1>
          <p className="page-subtitle text-xl mt-6">
            Have a question, suggestion or collaboration idea? We'd love to hear from you. Our team is ready to help you optimize your agricultural journey.
          </p>
        </motion.div>
      </section>

      {/* Two Column Layout */}
      <section className="section-padding max-w-7xl mx-auto pt-0">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Contact Info */}
          <motion.div 
            className="lg:w-1/3 flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card border border-surface-100 dark:border-dark-border h-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Our Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">India, Madhya Pradesh</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Global operations managed from our MP headquarters.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Email Us</h3>
                    <a href="mailto:support@agropredict.ai" className="text-primary-600 font-medium hover:underline">
                      support@agropredict.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">+91 XXXXX XXXXX</p>
                    <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Mon-Fri from 9am to 6pm IST.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="lg:w-2/3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-card border border-surface-100 dark:border-dark-border">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us A Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-800/50 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                  </div>
                  <p className="font-medium">Thank you! Your message has been sent successfully. We will get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-dark-border bg-surface-50 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-dark-border bg-surface-50 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-dark-border bg-surface-50 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="input-field w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-dark-border bg-surface-50 dark:bg-dark-surface text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary flex items-center justify-center gap-2 py-4 mt-2 w-full md:w-auto md:px-8 self-end">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Image Section */}
      <section className="section-padding max-w-7xl mx-auto pb-0">
        <motion.div 
          className="relative rounded-3xl overflow-hidden shadow-2xl h-80 lg:h-96 w-full flex items-center justify-center group cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src={IMAGES.contactBg || 'https://images.unsplash.com/photo-1592982537447-6f29a009efdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'} 
            alt="Agriculture landscape" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gray-900/40 group-hover:bg-gray-900/50 transition-colors duration-300"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <PlayCircle size={40} className="ml-1" />
            </div>
            <p className="text-white font-medium tracking-widest uppercase text-sm">Watch Our Story</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;
