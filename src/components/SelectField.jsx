import React from 'react';
import { ChevronDown } from 'lucide-react';

const SelectField = ({ label, options = [], value, onChange, placeholder, required, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label} {required && <span className="text-red-500">*</span>}</label>}
      <div className="relative">
        <select 
          value={value} 
          onChange={onChange} 
          className={`appearance-none w-full bg-white dark:bg-dark-bg border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-dark-border focus:ring-primary-500'} rounded-xl px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt, i) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const lbl = typeof opt === 'object' ? opt.label : opt;
            return <option key={i} value={val}>{lbl}</option>;
          })}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDown size={18} />
        </div>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
export default SelectField;
