import { Link } from "react-router";
import { Instagram, Mail } from "lucide-react";
import { useLanguage, routes } from "../../i18n/context";
import { LanguageToggle } from "../ui/LanguageToggle";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-8 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12 items-start">
          <div>
            <img
              src="/assets/brand/logos/logo-nav-white.png"
              alt={t.site.name}
              className="h-14 w-auto mb-4 opacity-95"
            />
            <p className="font-script text-2xl text-[var(--rv-sky)] mb-2">{t.site.slogan}</p>
            <p className="text-sm text-primary-foreground/70">{t.site.foraAffiliate}</p>
          </div>

          <div className="space-y-3 text-sm">
            <a
              href={`mailto:${t.site.email}`}
              className="flex items-center gap-2 hover:text-[var(--rv-sky)] transition-colors"
            >
              <Mail size={16} />
              {t.site.email}
            </a>
            <a
              href={t.site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--rv-sky)] transition-colors"
            >
              <Instagram size={16} />
              @rollingvoyagerd
            </a>
            <a
              href={t.site.foraProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--rv-sky)] transition-colors block"
            >
              {t.site.foraProfileLabel}
            </a>
          </div>

          <div className="space-y-3 text-sm md:text-right">
            <Link to={routes.terms} className="block hover:text-[var(--rv-sky)] transition-colors">
              {t.site.termsLabel}
            </Link>
            <Link to={routes.privacy} className="block hover:text-[var(--rv-sky)] transition-colors">
              {t.site.privacyLabel}
            </Link>
            <div className="pt-2 md:flex md:justify-end">
              <LanguageToggle variant="footer" instanceId="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/15 text-center text-xs text-primary-foreground/55">
          {t.site.name} · {t.site.slogan}
        </div>
      </div>
    </footer>
  );
}
