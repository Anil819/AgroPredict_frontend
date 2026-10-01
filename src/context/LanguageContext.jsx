import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileAPI } from '@/services/api';
import { translations } from '@/utils/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const { user } = useAuth();

  const [lang, setLangState] = useState(() => {
    // Priority: localStorage → user.preferredLanguage → 'Hindi'
    const stored = localStorage.getItem('agropredict-lang');
    if (stored && translations[stored]) return stored;
    const userLang = user?.preferredLanguage;
    if (userLang && translations[userLang]) return userLang;
    return 'Hindi';
  });

  // Sync with user.preferredLanguage when user first loads (e.g. after login)
  useEffect(() => {
    const stored = localStorage.getItem('agropredict-lang');
    if (!stored && user?.preferredLanguage && translations[user.preferredLanguage]) {
      setLangState(user.preferredLanguage);
    }
  }, [user?.preferredLanguage]);

  const setLang = useCallback(async (newLang) => {
    if (!translations[newLang]) return;
    setLangState(newLang);
    localStorage.setItem('agropredict-lang', newLang);
    // Persist to DB only when a user is logged in
    if (user) {
      try {
        await profileAPI.update({ preferredLanguage: newLang });
      } catch {
        // Non-fatal — language is already updated locally
      }
    }
  }, [user]);

  const t = useCallback((key) => {
    return translations[lang]?.[key] ?? translations['English']?.[key] ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
