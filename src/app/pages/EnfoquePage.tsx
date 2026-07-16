import { useLanguage, useRoutes } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";

export function EnfoquePage() {
  const { t } = useLanguage();
  const routes = useRoutes();

  return (
    <div>
      <ResponsiveBanner
        banner="approach"
        priority
        alt=""
        cta={{ to: routes.whatToExpect, label: t.approach.cta }}
      />
    </div>
  );
}
