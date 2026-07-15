import { routes, useLanguage } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";
import { BannerCarousel } from "../components/sections/BannerCarousel";
import { testimonialKeys } from "../data/banners";

/** Temporarily hidden — set to true to restore the home guide teaser. */
const SHOW_GUIDE_TEASER = false;

export function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="-mt-16 sm:-mt-20">
      {/* 1.1 Hero — PDF no CTA button (removed by request) */}
      <ResponsiveBanner banner="hero" priority alt="Rolling Voyage" />

      {/* 1.2 About — Conoce nuestro enfoque → /enfoque */}
      <ResponsiveBanner
        banner="about"
        alt=""
        cta={{ to: routes.approach, label: t.home.about.cta }}
      />

      {/* 1.3 Audience — Encuentra tu manera de viajar → /servicios */}
      <ResponsiveBanner
        banner="audience"
        alt=""
        cta={{ to: routes.services, label: t.home.audience.cta }}
      />

      {/* 1.4 Guide teaser — Mira lo que te espera → /que-esperar (hidden for now) */}
      {SHOW_GUIDE_TEASER && (
        <ResponsiveBanner
          banner="guideTeaser"
          alt=""
          cta={{ to: routes.whatToExpect, label: t.home.guide.cta }}
        />
      )}

      {/* 1.5 Testimonials — no button in PDF */}
      <BannerCarousel banners={testimonialKeys} alt="" />

      {/* 1.6 Final CTA — Hablemos → /contacto */}
      <ResponsiveBanner
        banner="cta"
        alt=""
        cta={{ to: routes.contact, label: t.home.cta.button }}
      />
    </div>
  );
}
