import { useLanguage, useRoutes } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";
import { BannerCarousel } from "../components/sections/BannerCarousel";
import { testimonialKeys } from "../data/banners";

export function HomePage() {
  const { t } = useLanguage();
  const routes = useRoutes();

  return (
    <div className="-mt-16 sm:-mt-20">
      {/* 1.1 Hero — PDF no CTA button (removed by request) */}
      <ResponsiveBanner banner="hero" priority alt="Rolling Voyage" />

      {/* 1.2 About → approach */}
      <ResponsiveBanner
        banner="about"
        alt=""
        cta={{ to: routes.approach, label: t.home.about.cta }}
      />

      {/* 1.3 Audience → services */}
      <ResponsiveBanner
        banner="audience"
        alt=""
        cta={{ to: routes.services, label: t.home.audience.cta }}
      />

      {/* 1.4 Guide teaser (RVingles) → what to expect */}
      <ResponsiveBanner
        banner="guideTeaser"
        alt=""
        cta={{ to: routes.whatToExpect, label: t.home.guide.cta }}
      />

      {/* 1.5 Testimonials */}
      <BannerCarousel banners={testimonialKeys} alt="" />

      {/* 1.6 Final CTA → contact */}
      <ResponsiveBanner
        banner="cta"
        alt=""
        cta={{ to: routes.contact, label: t.home.cta.button }}
      />
    </div>
  );
}
