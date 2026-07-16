import { Link } from "react-router";
import { useLanguage } from "../../i18n/context";
import { bannerSrc, type BannerKey } from "../../data/banners";
import { SectionCta } from "./SectionCta";

type ResponsiveBannerProps = {
  banner: BannerKey;
  alt?: string;
  className?: string;
  to?: string;
  priority?: boolean;
  /** CTA pinned to the bottom of this banner (PDF section-end buttons). */
  cta?: {
    to: string;
    label: string;
    /**
     * Reserve blank space under the image so the overlay CTA
     * does not cover banner copy (e.g. services closing note).
     */
    padBottom?: boolean;
  };
};

export function ResponsiveBanner({
  banner,
  alt = "",
  className = "",
  to,
  priority = false,
  cta,
}: ResponsiveBannerProps) {
  const { locale } = useLanguage();
  const desktop = bannerSrc(locale, banner, "desktop");
  const mobile = bannerSrc(locale, banner, "mobile");

  const image = (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile} />
      <source media="(min-width: 768px)" srcSet={desktop} />
      <img
        src={mobile}
        alt={alt}
        className={`w-full h-auto block ${className}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );

  const framed = cta ? (
    <div
      className={`relative ${
        cta.padBottom ? "bg-background pb-20 sm:pb-24 md:pb-28" : ""
      }`}
    >
      {to ? (
        <Link to={to} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          {image}
        </Link>
      ) : (
        image
      )}
      <SectionCta to={cta.to} label={cta.label} overlay />
    </div>
  ) : to ? (
    <Link to={to} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      {image}
    </Link>
  ) : (
    image
  );

  return framed;
}
