import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, CheckCircle, Activity, TrendingUp, DollarSign, Edit3, Send, Trash2, Loader2 } from 'lucide-react';
import { reportsAPI } from '@/services/api';

const tabs = ['All', 'Crop', 'Disease', 'Yield', 'Profit', 'Soil'];

export default function PredictionHistory() {
  const [activeTab, setActiveTab] = useState('All');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState(null);

  const loadReports = async () => {
    try {
      const response = await reportsAPI.history();
      setReports(response.data);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to load report history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadReports();
  }, []);

  const filteredHistory = activeTab === 'All' 
    ? reports
    : reports.filter(item => item.type === activeTab);

  const getTypeColor = (type) => {
    switch(type) {
      case 'Disease': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Yield': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Profit': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Crop': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'Disease': return <Activity className="w-4 h-4 mr-1" />;
      case 'Yield': return <TrendingUp className="w-4 h-4 mr-1" />;
      case 'Profit': return <DollarSign className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  const openReport = async (item, action) => {
    setBusy(`${action}-${item.id}`);
    setMessage(null);
    try {
      const response = action === 'view'
        ? await reportsAPI.view(item.id)
        : await reportsAPI.download(item.id);
      const url = URL.createObjectURL(response.data);
      if (action === 'view') {
        window.open(url, '_blank', 'noopener,noreferrer');
        window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${item.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      setMessage(error.response?.data?.detail || `Unable to ${action} report.`);
    } finally {
      setBusy(null);
    }
  };

  const sendReport = async (report) => {
    setBusy(`send-${report.id}`);
    setMessage(null);
    try {
      const response = await reportsAPI.send(report.id);
      setMessage(`Report sent to ${response.data.email}.`);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to send report.');
    } finally {
      setBusy(null);
    }
  };

  const updateReport = async (report) => {
    const title = window.prompt('Report title', report.title);
    if (!title || title === report.title) return;
    setBusy(`update-${report.id}`);
    try {
      await reportsAPI.update(report.id, { title });
      setReports((current) => current.map((item) => item.id === report.id ? { ...item, title } : item));
      setMessage('Report updated.');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to update report.');
    } finally {
      setBusy(null);
    }
  };

  const deleteReport = async (report) => {
    if (!window.confirm(`Delete ${report.title}?`)) return;
    setBusy(`delete-${report.id}`);
    try {
      await reportsAPI.remove(report.id);
      setReports((current) => current.filter((item) => item.id !== report.id));
      setMessage('Report deleted.');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Unable to delete report.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="page-header">Report History</h1>
        <p className="page-subtitle">Manage, view, download, and send your generated reports.</p>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary-600 text-white shadow-md' : 'bg-white dark:bg-dark-surface text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-dark-border hover:bg-surface-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {message && <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>}

      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-surface-500">Loading report history...</div>
        ) : filteredHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-50 dark:bg-dark-surface border-b border-surface-200 dark:border-dark-border text-surface-500 dark:text-surface-400 text-sm">
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Result</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-dark-border">
                  {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-50 dark:hover:bg-dark-surface/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getTypeColor(item.type)}`}>
                        {getIcon(item.type)}
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-surface-900 dark:text-white">{item.title}</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">Inputs: {Object.keys(item.inputData || {}).length} · Outputs: {Object.keys(item.outputData || {}).length}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-surface-600 dark:text-surface-300 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-xs font-medium text-green-600 dark:text-green-400">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Completed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => openReport(item, 'view')} disabled={busy === `view-${item.id}`} className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors disabled:opacity-50" title="View Report">
                          {busy === `view-${item.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button onClick={() => openReport(item, 'download')} disabled={busy === `download-${item.id}`} className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors disabled:opacity-50" title="Download Report">
                          {busy === `download-${item.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        </button>
                        <button onClick={() => sendReport(item)} disabled={busy === `send-${item.id}`} className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors disabled:opacity-50" title="Send Report"><Send className="w-4 h-4" /></button>
                        <button onClick={() => updateReport(item)} disabled={busy === `update-${item.id}`} className="p-2 text-surface-500 hover:text-primary-600 rounded-lg" title="Rename Report"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => deleteReport(item)} disabled={busy === `delete-${item.id}`} className="p-2 text-surface-500 hover:text-red-600 rounded-lg" title="Delete Report"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <FileText className="w-12 h-12 text-surface-300 dark:text-surface-600 mb-4" />
            <p className="text-surface-600 dark:text-surface-300 font-medium">No records found</p>
            <p className="text-sm text-surface-400 mt-1">Try selecting a different category or run a new prediction.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
