import { useLanguage, useRoutes } from "../i18n/context";
import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";

export function ServiciosPage() {
  const { t } = useLanguage();
  const routes = useRoutes();

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
