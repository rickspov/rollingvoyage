import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { en } from "./en";
import { es } from "./es";
import type { Content, Locale } from "./types";

const STORAGE_KEY = "rv-locale";

const dictionaries: Record<Locale, Content> = { en, es };

export type RouteKey =
  | "home"
  | "approach"
  | "whatToExpect"
  | "services"
  | "contact"
  | "terms"
  | "privacy";

export type AppRoutes = Record<RouteKey, string>;

export const routesByLocale: Record<Locale, AppRoutes> = {
  en: {
    home: "/",
    approach: "/approach",
    whatToExpect: "/what-to-expect",
    services: "/ways-to-travel",
    contact: "/contact",
    terms: "/terms",
    privacy: "/privacy",
  },
  es: {
    home: "/",
    approach: "/enfoque",
    whatToExpect: "/que-esperar",
    services: "/servicios",
    contact: "/contacto",
    terms: "/terminos",
    privacy: "/privacidad",
  },
};

/** @deprecated Prefer useRoutes() for locale-aware paths */
export const routes = routesByLocale.es;

const pathToMeta = (() => {
  const map = new Map<string, { key: RouteKey; locale: Locale }>();
  (["en", "es"] as Locale[]).forEach((locale) => {
    (Object.entries(routesByLocale[locale]) as [RouteKey, string][]).forEach(
      ([key, path]) => {
        // Home "/" is shared — don't bind it to a locale
        if (path === "/") return;
        map.set(path, { key, locale });
      },
    );
  });
  return map;
})();

export function getRouteKeyFromPath(pathname: string): RouteKey | null {
  if (pathname === "/" || pathname === "") return "home";
  return pathToMeta.get(pathname)?.key ?? null;
}

export function getLocaleFromPath(pathname: string): Locale | null {
  if (pathname === "/" || pathname === "") return null;
  return pathToMeta.get(pathname)?.locale ?? null;
}

export function localizePath(pathname: string, locale: Locale): string {
  const key = getRouteKeyFromPath(pathname);
  if (!key) return pathname;
  return routesByLocale[locale][key];
}

type LanguageContextValue = {
  locale: Locale;
  t: Content;
  setLocale: (locale: Locale) => void;
  routes: AppRoutes;
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
  const routesForLocale = routesByLocale[locale];

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
    <LanguageContext.Provider
      value={{ locale, t, setLocale, routes: routesForLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/** Locale-aware app paths (EN vs ES). */
export function useRoutes(): AppRoutes {
  return useLanguage().routes;
}

export function useNavItems() {
  const { t, routes: r } = useLanguage();
  return [
    { label: t.nav.home, path: r.home },
    { label: t.nav.approach, path: r.approach },
    { label: t.nav.whatToExpect, path: r.whatToExpect },
    { label: t.nav.services, path: r.services },
    { label: t.nav.contact, path: r.contact },
  ];
}
