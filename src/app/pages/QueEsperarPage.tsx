import { useLanguage, useRoutes } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";

export function QueEsperarPage() {
  const { t } = useLanguage();
  const routes = useRoutes();

  return (
    <div>
      <ResponsiveBanner banner="process" priority alt="" />

      <ResponsiveBanner
        banner="guidePreview"
        alt=""
        cta={{ to: routes.services, label: t.whatToExpect.guide.cta }}
      />
    </div>
  );
}
