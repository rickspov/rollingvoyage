import { useEffect, useId, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import { localizePath, useLanguage } from "../../i18n/context";
import type { Locale } from "../../i18n/types";

type LanguageToggleProps = {
  variant?: "header" | "footer";
  /** Kept for call-site compatibility (desktop / mobile / footer). */
  instanceId?: string;
};

const labels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
};

export function LanguageToggle({
  variant = "header",
  instanceId = "default",
}: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const isHeader = variant === "header";

  const switchLocale = (lang: Locale) => {
    setOpen(false);
    if (lang === locale) return;
    setLocale(lang);
    const nextPath = localizePath(location.pathname, lang);
    if (nextPath !== location.pathname) {
      navigate(nextPath, { replace: true });
    }
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div ref={rootRef} className="relative inline-block" data-instance={instanceId}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-ui)] font-semibold border transition-colors duration-300 ${
          isHeader
            ? "border-primary/30 bg-background text-primary hover:bg-primary/5"
            : "border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10"
        }`}
      >
        {labels[locale]}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Language"
          className={`absolute right-0 top-full z-50 mt-1 min-w-full border shadow-sm overflow-hidden ${
            isHeader
              ? "border-primary/20 bg-background text-primary"
              : "border-primary-foreground/20 bg-primary text-primary-foreground"
          }`}
        >
          {(["en", "es"] as Locale[]).map((lang) => {
            const active = locale === lang;
            return (
              <li key={lang} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => switchLocale(lang)}
                  className={`w-full text-left px-3.5 py-2.5 text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-ui)] font-semibold transition-colors duration-200 ${
                    active
                      ? isHeader
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary-foreground text-primary"
                      : isHeader
                        ? "text-primary/70 hover:bg-primary/5 hover:text-primary"
                        : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  }`}
                >
                  {labels[lang]}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
