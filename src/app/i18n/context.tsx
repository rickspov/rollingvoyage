import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "./en";
import { es } from "./es";
import type { Content, Locale } from "./types";

const STORAGE_KEY = "rv-locale";

const dictionaries: Record<Locale, Content> = { en, es };

type LanguageContextValue = {
  locale: Locale;
  t: Content;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);
  const t = dictionaries[locale];

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.meta.description);
  }, [locale, t]);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

export const routes = {
  home: "/",
  approach: "/enfoque",
  whatToExpect: "/que-esperar",
  services: "/servicios",
  contact: "/contacto",
  terms: "/terminos",
  privacy: "/privacidad",
} as const;

export function useNavItems() {
  const { t } = useLanguage();
  return [
    { label: t.nav.home, path: routes.home },
    { label: t.nav.approach, path: routes.approach },
    { label: t.nav.whatToExpect, path: routes.whatToExpect },
    { label: t.nav.services, path: routes.services },
    { label: t.nav.contact, path: routes.contact },
  ];
}
