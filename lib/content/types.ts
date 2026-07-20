export type FooterContent = {
  social: {
    facebook: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
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
  contact: {
    badge: string;
    title: string;
    text: string;
    email: string;
    whatsappNumber: string;
    whatsappLabel: string;
    formTitle: string;
    formText: string;
    buttonLabel: string;
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

export type InsightPost = {
  id: string;
  title: string;
  image: string;
  category: string;
  author: string;
  quote: string;
  sectionTitle: string;
  paragraphs: [string, string, string, string];
  pairedImages: [string, string];
  createdAt: string;
};

export type InsightsContent = {
  heroTitle: string;
  heading: string;
  posts: InsightPost[];
};

export type PageId = "home" | "about" | "insights" | "footer";

export type PageContentMap = {
  home: HomeContent;
  about: AboutContent;
  insights: InsightsContent;
  footer: FooterContent;
};
