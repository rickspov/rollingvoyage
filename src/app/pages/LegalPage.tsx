import { useLanguage } from "../i18n/context";
import { legalSrc } from "../data/banners";

type LegalDoc = "terms" | "privacy";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const { locale, t } = useLanguage();
  const src = legalSrc(locale, doc);
  const title = doc === "terms" ? t.site.termsLabel : t.site.privacyLabel;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl text-primary">{title}</h1>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-5 py-2 text-sm font-[family-name:var(--font-ui)] font-semibold border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
          >
            {locale === "es" ? "Abrir PDF" : "Open PDF"}
          </a>
        </div>
        <div className="border border-border bg-card overflow-hidden min-h-[70vh]">
          <iframe
            title={title}
            src={src}
            className="w-full h-[75vh]"
          />
        </div>
      </div>
    </section>
  );
}

export function TermsPage() {
  return <LegalPage doc="terms" />;
}

export function PrivacyPage() {
  return <LegalPage doc="privacy" />;
}
