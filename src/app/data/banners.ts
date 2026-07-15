import type { Locale } from "../i18n/types";

export type BannerKey =
  | "hero"
  | "about"
  | "audience"
  | "guideTeaser"
  | "testimonial1"
  | "testimonial2"
  | "testimonial3"
  | "cta"
  | "approach"
  | "process"
  | "guidePreview"
  | "services"
  | "contact";

const files: Record<BannerKey, string> = {
  hero: "01-hero.jpg",
  about: "02-about.jpg",
  audience: "03-audience.jpg",
  guideTeaser: "04-guide-teaser.jpg",
  testimonial1: "05-testimonial-1.jpg",
  testimonial2: "06-testimonial-2.jpg",
  testimonial3: "07-testimonial-3.jpg",
  cta: "08-cta.jpg",
  approach: "09-approach.jpg",
  process: "10-process.jpg",
  guidePreview: "11-guide-preview.jpg",
  services: "12-services.jpg",
  contact: "13-contact.jpg",
};

export function bannerSrc(locale: Locale, key: BannerKey, device: "desktop" | "mobile") {
  return `/assets/banners/${locale}/${device}/${files[key]}`;
}

export function legalSrc(locale: Locale, doc: "terms" | "privacy") {
  return `/assets/banners/legal/${doc}-${locale}.pdf`;
}

export const testimonialKeys: BannerKey[] = [
  "testimonial1",
  "testimonial2",
  "testimonial3",
];
