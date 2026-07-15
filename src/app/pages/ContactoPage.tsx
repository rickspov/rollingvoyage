import { ResponsiveBanner } from "../components/ui/ResponsiveBanner";
import { ContactForm } from "../components/sections/ContactForm";
import { useLanguage } from "../i18n/context";

export function ContactoPage() {
  const { t } = useLanguage();

  return (
    <div>
      <ResponsiveBanner banner="contact" priority alt={t.contact.title} />
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-xl mx-auto px-4 sm:px-5 md:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
