import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle, ChevronRight, Activity } from 'lucide-react';
import { mlAPI, reportsAPI } from '@/services/api';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setResult(null);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setError('');
    try {
      const response = await mlAPI.detectDisease(selectedFile);
      setResult(response.data);
      const imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });
      reportsAPI.generate({
        title: 'Plant Disease Report',
        reportType: 'Disease',
        predictionId: 'disease-latest',
        inputData: { fileName: selectedFile.name, fileType: selectedFile.type, fileSize: selectedFile.size },
        outputData: response.data,
        imageData,
        imageName: selectedFile.name,
      }).catch(() => {});
    } catch (requestError) {
      setResult(null);
      setError(requestError.response?.data?.detail || 'The trained disease model could not return a result.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="text-center md:text-left mb-8">
        <h1 className="text-4xl font-bold text-surface-900 dark:text-white whitespace-pre-line">
          {'See The Problem\nBefore It Spreads.'}
        </h1>
        <p className="text-lg text-surface-600 dark:text-surface-300 mt-4 max-w-2xl">
          Upload a clear image of your plant's leaf, and our AI will detect early signs of diseases and recommend the right actions.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Upload */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">Upload Leaf Image</h2>
          
          <div className="border-2 border-dashed border-surface-300 dark:border-dark-border rounded-xl p-8 flex flex-col items-center justify-center bg-surface-50 dark:bg-dark-surface cursor-pointer hover:border-primary-500 transition-colors" onClick={() => document.getElementById('file-upload').click()}>
            <Upload className="w-12 h-12 text-surface-400 dark:text-surface-500 mb-4" />
            <p className="text-surface-700 dark:text-surface-200 font-medium mb-1">Click to upload or drag and drop</p>
            <p className="text-sm text-surface-500 dark:text-surface-400 text-center">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>

          {selectedFile && (
            <div className="mt-4 p-3 bg-surface-100 dark:bg-dark-surface rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium text-surface-700 dark:text-surface-200 truncate pr-4">{selectedFile.name}</span>
              <button className="text-sm text-red-500 hover:text-red-700" onClick={() => setSelectedFile(null)}>Remove</button>
            </div>
          )}

          <button 
            className={`btn-primary w-full mt-6 ${(!selectedFile || isAnalyzing) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!selectedFile || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? 'Analyzing leaf image...' : 'Analyze Image'}
          </button>
        </div>

        {/* Right Column - Results */}
        <div className="card p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white mb-4">AI Diagnosis</h2>
          
          <div className="flex-1 flex flex-col justify-center">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-100 border-t-primary-600"></div>
                <p className="text-surface-600 dark:text-surface-300 font-medium animate-pulse">Analyzing leaf image...</p>
              </div>
            ) : result ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-surface-900 dark:text-white">{result.disease}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {result.confidence}% Confidence
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.severity === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {result.severity} Severity
                      </span>
                    </div>
                  </div>
                  {selectedFile && (
                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-surface-200 dark:border-dark-border shadow-sm" />
                  )}
                </div>

                <div className="bg-surface-50 dark:bg-dark-surface p-4 rounded-xl border border-surface-200 dark:border-dark-border">
                  <h4 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary-600" />
                    Recommended Actions
                  </h4>
                  <ol className="space-y-2 list-decimal list-inside text-surface-600 dark:text-surface-300">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="pl-1">{rec}</li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
                <div className="p-4 bg-surface-100 dark:bg-dark-surface rounded-full text-surface-400 dark:text-surface-500">
                  <AlertCircle className="w-12 h-12" />
                </div>
                <p className="text-surface-500 dark:text-surface-400">{error || 'Upload a plant image to detect diseases with the trained model.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-surface-500 dark:text-surface-400">
        <p>AI disease detection is advisory. Consult an agricultural expert for serious or uncertain cases.</p>
      </div>
    </motion.div>
  );
}
