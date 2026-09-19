import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatMessages as initialMessages, suggestedQuestions } from '@/utils/mockData';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages || []);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: 'I can help with that. Based on your farm data, this looks like an issue that requires immediate attention. Would you like me to analyze further?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary-600 text-white shadow-lg hover:bg-primary-700 transition-all z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <Bot size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 md:w-[400px] w-[calc(100%-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white dark:bg-dark-surface rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100 dark:border-dark-border"
          >
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot size={24} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary-600 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-semibold">AgroPredict AI</h3>
                  <p className="text-xs text-primary-100">Online | Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-100 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-dark-bg">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 flex items-center justify-center mr-2 shrink-0">
                        <Bot size={16} />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-white dark:bg-dark-surface text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-dark-border rounded-bl-none shadow-sm'}`}>
                      <p>{msg.text}</p>
                      <span className={`text-[10px] mt-1 block ${msg.sender === 'user' ? 'text-primary-200' : 'text-gray-400'}`}>{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 flex items-center justify-center mr-2 shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white dark:bg-dark-surface border border-gray-100 dark:border-dark-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-dark-border">
              <div className="flex flex-wrap gap-2 mb-3">
                {suggestedQuestions && suggestedQuestions.slice(0, 2).map((q, i) => (
                  <button key={i} onClick={() => handleSend(q)} className="text-xs bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors truncate max-w-[200px]">
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask me anything..." 
                  className="flex-1 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                />
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default ChatWidget;
