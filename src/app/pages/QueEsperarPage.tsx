import { routes, useLanguage } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";

export function QueEsperarPage() {
  const { t } = useLanguage();

  return (
    <div>
      {/* 3.1 Process timeline — no button in PDF */}
      <ResponsiveBanner banner="process" priority alt="" />

      {/* 3.2 Guide — Encuentra tu manera de viajar → /servicios */}
      <ResponsiveBanner
        banner="guidePreview"
        alt=""
        cta={{ to: routes.services, label: t.whatToExpect.guide.cta }}
      />
    </div>
  );
}
