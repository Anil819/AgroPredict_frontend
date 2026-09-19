import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ onFileSelect, accept = ".jpg,.jpeg,.png,.webp", maxSize = 5 * 1024 * 1024 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;
    
    if (selectedFile.size > maxSize) {
      setError('File is too large. Max size is 5MB.');
      return;
    }
    
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div 
          className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-2xl transition-all ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-surface/50 hover:bg-gray-100 dark:hover:bg-dark-surface'}`}
          onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
          <UploadCloud className="w-12 h-12 text-gray-400 mb-4" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upload Plant Image</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">Drag & drop an image here or click to browse.</p>
          <span className="text-xs text-gray-400 dark:text-gray-500 mb-6">JPG, PNG, WEBP (Max 5MB)</span>
          <button type="button" className="btn-primary py-2 px-6 rounded-full text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors pointer-events-none">Upload Image</button>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border group">
          <img src={preview} alt="Preview" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <button type="button" onClick={removeFile} className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"><X size={24} /></button>
          </div>
        </div>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
export default FileUpload;
