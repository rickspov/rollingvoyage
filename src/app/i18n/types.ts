export type Locale = "en" | "es";

export type Content = {
  site: {
    name: string;
    slogan: string;
    email: string;
    instagram: string;
    foraProfile: string;
    termsUrl: string;
    privacyUrl: string;
    foraAffiliate: string;
    foraProfileLabel: string;
    termsLabel: string;
    privacyLabel: string;
  };
  nav: {
    home: string;
    approach: string;
    whatToExpect: string;
    services: string;
    contact: string;
    cta: string;
    openMenu: string;
    closeMenu: string;
  };
  home: {
    hero: { subtitle: string; cta: string };
    about: { title: string; body: string; cta: string };
    audience: { title: string; intro: string; items: string[]; cta: string };
    guide: { title: string; body: string; cta: string };
    testimonials: {
      title: string;
      items: { quote: string; trip: string }[];
      prev: string;
      next: string;
      label: (n: number) => string;
    };
    cta: { title: string; body: string; button: string };
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    pillars: { title: string; body: string }[];
    story: { title: string; body: string; birdAlt: string };
    cta: string;
  };
  whatToExpect: {
    eyebrow: string;
    journey: {
      title: string;
      intro: string;
      steps: { title: string; body: string }[];
      closing: string;
    };
    guide: {
      title: string;
      intro: string;
      closing: string;
      cta: string;
      imageAlt: string;
    };
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    packages: {
      name: string;
      price: string;
      description: string;
      includes: string[];
      note?: string;
    }[];
    disclaimer: string;
    cta: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    body: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      submitting: string;
      microcopy: string;
      successTitle: string;
      error: string;
    };
  };
  meta: {
    title: string;
    description: string;
  };
};
