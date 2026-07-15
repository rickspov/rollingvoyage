import { routes, useLanguage } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";

export function ServiciosPage() {
  const { t } = useLanguage();

  return (
    <div>
      <ResponsiveBanner
        banner="services"
        priority
        alt=""
        cta={{ to: routes.contact, label: t.services.cta, padBottom: true }}
      />
    </div>
  );
}
