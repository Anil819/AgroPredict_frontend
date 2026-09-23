import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal, Bot, User, Trash2 } from 'lucide-react';
import { chatMessages, suggestedQuestions } from '@/utils/mockData';
import { chatAPI } from '@/services/api';

const initialChatMessages = chatMessages.map((message) => ({
  id: message.id,
  text: message.text || message.content,
  sender: message.sender || message.role,
  time: message.time || message.timestamp,
}));

export default function Chatbot() {
  const [messages, setMessages] = useState(initialChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    
    const newUserMsg = { id: Date.now(), text, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);
    setError('');
    try {
      const response = await chatAPI.send(text);
      setIsTyping(false);
      const newBotMsg = { id: Date.now() + 1, text: response.data.response, sender: 'assistant', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setMessages(prev => [...prev, newBotMsg]);
    } catch (requestError) {
      setIsTyping(false);
      setError(requestError.response?.data?.detail || 'The assistant could not respond. Please try again.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-bg rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-surface-900 dark:text-white">AgroPredict AI Assistant</h1>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">Online</p>
          </div>
        </div>
        <button onClick={() => setMessages([])} className="p-2 text-surface-500 hover:text-red-500 transition-colors" title="Clear Chat">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
        {suggestedQuestions.map((q, idx) => (
          <button key={idx} onClick={() => handleSend(q)} className="whitespace-nowrap px-4 py-2 bg-white dark:bg-dark-surface border border-surface-200 dark:border-dark-border rounded-full text-sm font-medium text-surface-700 dark:text-surface-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
            {q}
          </button>
        ))}
      </div>

      <div className="card flex-1 flex flex-col overflow-hidden bg-surface-50 dark:bg-dark-bg border-surface-200 dark:border-dark-border">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-surface-400">
              <Bot className="w-12 h-12 mb-4 opacity-50" />
              <p>Start a conversation! Ask me about your farm.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-white dark:bg-dark-surface border border-surface-100 dark:border-dark-border text-surface-800 dark:text-surface-200 rounded-tl-sm shadow-sm'}`}>
                  <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-primary-200 text-right' : 'text-surface-400 dark:text-surface-500'}`}>{msg.time}</span>
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-dark-surface border border-surface-100 dark:border-dark-border rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex space-x-1">
                <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white dark:bg-dark-surface border-t border-surface-200 dark:border-dark-border">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex space-x-2">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask anything about farming..." 
              className="input-field flex-1 !rounded-full"
            />
            <button type="submit" disabled={!input.trim()} className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <SendHorizontal className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
