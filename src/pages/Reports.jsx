import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Edit3, Eye, FileText, Loader2, Plus, Send, Trash2 } from 'lucide-react';
import { reportsAPI } from '@/services/api';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState(null);

  const loadReports = async () => {
    try {
      const response = await reportsAPI.history();
      setReports(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Unable to load reports.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadReports();
  }, []);

  const generateReport = async () => {
    setBusy('generate');
    setMessage(null);
    try {
      await reportsAPI.generate({ title: 'Farm Prediction Report', reportType: 'Prediction', predictionId: 'latest' });
      await loadReports();
      setMessage({ type: 'success', text: 'Report generated successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Unable to generate report.' });
    } finally {
      setBusy(null);
    }
  };

  const openPdf = async (report, action) => {
    setBusy(`${action}-${report.id}`);
    setMessage(null);
    try {
      const response = action === 'view'
        ? await reportsAPI.view(report.id)
        : await reportsAPI.download(report.id);
      const url = URL.createObjectURL(response.data);
      if (action === 'view') {
        window.open(url, '_blank', 'noopener,noreferrer');
        window.setTimeout(() => URL.revokeObjectURL(url), 60000);
      } else {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${report.id}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || `Unable to ${action} report.` });
    } finally {
      setBusy(null);
    }
  };

  const sendReport = async (report) => {
    setBusy(`send-${report.id}`);
    setMessage(null);
    try {
      const response = await reportsAPI.send(report.id);
      setMessage({ type: 'success', text: `Report sent to ${response.data.email}.` });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Unable to send report.' });
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
      await loadReports();
      setMessage({ type: 'success', text: 'Report updated.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Unable to update report.' });
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
      setMessage({ type: 'success', text: 'Report deleted.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.detail || 'Unable to delete report.' });
    } finally {
      setBusy(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="page-header">Reports</h1>
          <p className="page-subtitle">View and download your generated farm reports.</p>
        </div>
        <button onClick={generateReport} disabled={busy === 'generate'} className="btn-primary flex items-center space-x-2">
          {busy === 'generate' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          <span>{busy === 'generate' ? 'Generating...' : 'Generate New Report'}</span>
        </button>
      </div>

      {message && <div className={`rounded-lg px-4 py-3 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{message.text}</div>}

      {loading ? <div className="card p-10 text-center text-surface-500">Loading reports...</div> : reports.length === 0 ? <div className="card p-10 text-center text-surface-500">No reports yet. Generate your first report.</div> : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="card p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary-600 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-surface-100 dark:bg-dark-surface text-surface-600 dark:text-surface-300 text-xs font-medium rounded-full">
                {report.type}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2 line-clamp-1">{report.title}</h3>
            <p className="text-sm text-surface-500 dark:text-surface-400 mb-6">{report.date}</p>
            <p className="text-xs text-surface-500 mb-4">Inputs: {Object.keys(report.inputData || {}).length} · Outputs: {Object.keys(report.outputData || {}).length}</p>
            
            <div className="mt-auto flex space-x-3 pt-4 border-t border-surface-100 dark:border-dark-border">
              <button onClick={() => openPdf(report, 'download')} disabled={busy === `download-${report.id}`} className="flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium text-primary-600 bg-primary-50 dark:bg-primary-900/10 dark:text-primary-400 rounded-lg hover:bg-primary-100 transition-colors disabled:opacity-50">
                {busy === `download-${report.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span>Download</span>
              </button>
              <button onClick={() => openPdf(report, 'view')} disabled={busy === `view-${report.id}`} className="flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-medium text-surface-700 bg-surface-100 dark:bg-dark-surface dark:text-surface-300 rounded-lg hover:bg-surface-200 transition-colors disabled:opacity-50">
                {busy === `view-${report.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
                <span>View</span>
              </button>
            </div>
            <button onClick={() => sendReport(report)} disabled={busy === `send-${report.id}`} className="mt-3 w-full flex items-center justify-center space-x-2 py-2 text-sm font-medium text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-dark-border rounded-lg hover:bg-surface-50 transition-colors disabled:opacity-50">
              {busy === `send-${report.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Send to registered email</span>
            </button>
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => updateReport(report)} disabled={busy === `update-${report.id}`} className="p-2 text-surface-500 hover:text-primary-600 rounded-lg" title="Update report"><Edit3 className="w-4 h-4" /></button>
              <button onClick={() => deleteReport(report)} disabled={busy === `delete-${report.id}`} className="p-2 text-surface-500 hover:text-red-600 rounded-lg" title="Delete report"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
      )}
    </motion.div>
  );
}
