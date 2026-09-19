import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal, Bot, User, Trash2 } from 'lucide-react';
import { chatMessages, suggestedQuestions } from '@/utils/mockData';

export default function Chatbot() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    const newUserMsg = { id: Date.now(), text, sender: 'user', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I'm a virtual assistant. Here's a general farming tip: Rotate your crops to maintain soil health!";
      const lower = text.toLowerCase();
      if (lower.includes('weather')) replyText = "The weather today is mostly sunny with a high of 28°C. Perfect for field work.";
      else if (lower.includes('disease') || lower.includes('blight')) replyText = "For Early Blight, ensure good airflow around plants and apply a copper-based fungicide.";
      else if (lower.includes('yield')) replyText = "Yield looks promising this season based on rainfall data! Expect around 3.2 tons/acre.";
      else if (lower.includes('irrigate') || lower.includes('water')) replyText = "Soil moisture is currently at 45%. You can hold off on irrigation for another day.";

      const newBotMsg = { id: Date.now() + 1, text: replyText, sender: 'bot', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      setMessages(prev => [...prev, newBotMsg]);
    }, 1500);
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
