import { routes, useLanguage } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";

export function EnfoquePage() {
  const { t } = useLanguage();

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
