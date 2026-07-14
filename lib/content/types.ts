export type FooterContent = {
  social: {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  copyright: string;
};

export type HomeContent = {
  hero: {
    title: string;
    text: string;
    image: string;
    ctaLabel: string;
  };
  about: {
    title: string;
    text: string;
    image: string;
    items: [string, string, string];
    buttonLabel: string;
  };
  cta: {
    badge: string;
    title: string;
    text: string;
    buttonLabel: string;
  };
  services: {
    heading: string;
    cards: Array<{
      title: string;
      description: string;
      items: string[];
    }>;
  };
  insights: {
    heading: string;
    posts: Array<{ title: string; image: string }>;
  };
};

export type AboutContent = {
  hero: {
    title: string;
    text: string;
    image: string;
  };
  whatWeDo: {
    title: string;
    text: string;
    image: string;
    items: [string, string, string];
    buttonLabel: string;
  };
  story: {
    title: string;
    text: string;
  };
  vision: {
    title: string;
    text: string;
  };
  mission: {
    title: string;
    text: string;
  };
};

export type InsightsContent = {
  heroTitle: string;
  heading: string;
  posts: Array<{ id: string; title: string; image: string }>;
};

export type BlogDetailsContent = {
  bannerTitle: string;
  heroImage: string;
  title: string;
  paragraphs: [string, string, string, string];
  pairedImages: [string, string];
};

export type PageId = "home" | "about" | "insights" | "blog-details" | "footer";

export type PageContentMap = {
  home: HomeContent;
  about: AboutContent;
  insights: InsightsContent;
  "blog-details": BlogDetailsContent;
  footer: FooterContent;
};
