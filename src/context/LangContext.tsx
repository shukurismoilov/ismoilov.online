import { createContext, useContext, useState, ReactNode } from 'react';
import { Lang, translations } from '@/lib/i18n';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations['en'];
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('en');
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

/* eslint-disable react-refresh/only-export-components */
export const useLang = () => useContext(LangContext);
