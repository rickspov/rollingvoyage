import { motion } from "motion/react";
import { useLanguage } from "../../i18n/context";
import type { Locale } from "../../i18n/types";

type LanguageToggleProps = {
  variant?: "header" | "footer";
  /** Unique id so desktop/mobile instances don't share the same layout pill */
  instanceId?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function LanguageToggle({
  variant = "header",
  instanceId = "default",
}: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();
  const isHeader = variant === "header";
  const layoutId = `lang-pill-${variant}-${instanceId}`;

  return (
    <div
      className={`relative inline-flex items-center border text-xs tracking-[0.15em] uppercase font-[family-name:var(--font-ui)] font-semibold overflow-hidden ${
        isHeader
          ? "border-primary/30 bg-background text-primary"
          : "border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground"
      }`}
      role="group"
      aria-label="Language"
    >
      {(["en", "es"] as Locale[]).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            className={`relative z-10 px-3.5 py-2 min-h-[40px] min-w-[44px] transition-colors duration-300 ${
              active
                ? isHeader
                  ? "text-primary-foreground"
                  : "text-primary"
                : isHeader
                  ? "text-primary/55 hover:text-primary"
                  : "text-primary-foreground/55 hover:text-primary-foreground"
            }`}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className={`absolute inset-0 -z-10 ${
                  isHeader ? "bg-primary" : "bg-primary-foreground"
                }`}
                transition={{ duration: 0.35, ease }}
              />
            )}
            <span className="relative z-10">{lang.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}
