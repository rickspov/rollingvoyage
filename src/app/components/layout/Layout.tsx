import { useEffect } from "react";
import { ScrollRestoration, useLocation } from "react-router";
import { getLocaleFromPath, useLanguage } from "../../i18n/context";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";

/** Keep language in sync when landing on / visiting a locale-specific URL. */
function LocalePathSync() {
  const location = useLocation();
  const { locale, setLocale } = useLanguage();

  useEffect(() => {
    const fromPath = getLocaleFromPath(location.pathname);
    if (fromPath && fromPath !== locale) {
      setLocale(fromPath);
    }
  }, [location.pathname, locale, setLocale]);

  return null;
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <LocalePathSync />
      <Header />
      <main className="flex-1 pt-16 sm:pt-20">
        <PageTransition />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
