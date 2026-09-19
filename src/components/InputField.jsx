import React from 'react';

const InputField = ({ label, type = 'text', placeholder, value, onChange, error, icon: Icon, required, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label} {required && <span className="text-red-500">*</span>}</label>}
      <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={18} /></div>}
        <input 
          type={type} 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange} 
          className={`w-full bg-white dark:bg-dark-bg border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-dark-border focus:ring-primary-500'} rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${Icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
export default InputField;
