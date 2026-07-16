import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useLanguage } from "../../i18n/context";
import { bannerSrc, type BannerKey } from "../../data/banners";
import { SectionCta } from "./SectionCta";

const MOBILE_MQ = "(max-width: 767px)";

function useIsMobileBanner() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(MOBILE_MQ).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}

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
  const isMobile = useIsMobileBanner();
  const src = bannerSrc(locale, banner, isMobile ? "mobile" : "desktop");

  const image = (
    <img
      key={src}
      src={src}
      alt={alt}
      className={`w-full h-auto block ${className}`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
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
