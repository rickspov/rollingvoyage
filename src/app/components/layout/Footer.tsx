import { Link } from "react-router";
import { useLanguage, useRoutes } from "../../i18n/context";

export function Footer() {
  const { t } = useLanguage();
  const routes = useRoutes();

  const linkClass =
    "text-[11px] sm:text-xs tracking-[0.22em] uppercase font-[family-name:var(--font-ui)] font-light text-white/95 hover:text-white transition-colors duration-300";

  return (
    <footer>
      {/* Main navy block */}
      <div className="bg-[#29466c] text-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-14 sm:py-16 md:py-20 flex flex-col items-center text-center">
          <Link to={routes.home} className="block mb-10 sm:mb-12">
            <img
              src="/assets/brand/logos/logo-footer-wordmark.png"
              alt={t.site.name}
              className="h-28 sm:h-36 md:h-44 w-auto mx-auto object-contain"
            />
          </Link>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-3"
          >
            <a href={`mailto:${t.site.email}`} className={linkClass}>
              {t.site.emailLabel}
            </a>
            <a
              href={t.site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {t.site.instagramLabel}
            </a>
            <a
              href={t.site.foraProfile}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {t.site.foraProfileLabel}
            </a>
          </nav>
        </div>
      </div>

      {/* Light blue legal bar */}
      <div className="bg-[var(--rv-sky)] text-[#29466c]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-3.5">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between gap-6 text-[11px] tracking-wide font-[family-name:var(--font-ui)] font-light">
            <div className="flex items-center gap-6">
              <span>{t.site.copyright}</span>
              <span>{t.site.foraAffiliate}</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to={routes.privacy} className="hover:opacity-70 transition-opacity">
                {t.site.privacyLabel}
              </Link>
              <Link to={routes.terms} className="hover:opacity-70 transition-opacity">
                {t.site.termsLabel}
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col items-center gap-3 text-[11px] tracking-wide font-[family-name:var(--font-ui)] font-light text-center">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              <span>{t.site.copyright}</span>
              <span>{t.site.foraAffiliate}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link to={routes.privacy} className="hover:opacity-70 transition-opacity">
                {t.site.privacyLabel}
              </Link>
              <Link to={routes.terms} className="hover:opacity-70 transition-opacity">
                {t.site.termsLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
