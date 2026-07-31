import type { LocalizedString } from "@/lib/i18n/locale";

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
    title: LocalizedString;
    text: LocalizedString;
    image: string;
    ctaLabel: LocalizedString;
  };
  about: {
    title: LocalizedString;
    text: LocalizedString;
    image: string;
    items: [LocalizedString, LocalizedString, LocalizedString];
    buttonLabel: LocalizedString;
  };
  cta: {
    badge: LocalizedString;
    title: LocalizedString;
    text: LocalizedString;
    buttonLabel: LocalizedString;
  };
  services: {
    heading: LocalizedString;
    cards: Array<{
      title: LocalizedString;
      description: LocalizedString;
      items: LocalizedString[];
    }>;
  };
  contact: {
    badge: LocalizedString;
    title: LocalizedString;
    text: LocalizedString;
    email: string;
    whatsappNumber: string;
    whatsappLabel: LocalizedString;
    formTitle: LocalizedString;
    formText: LocalizedString;
    buttonLabel: LocalizedString;
  };
};

export type AboutContent = {
  hero: {
    title: LocalizedString;
    text: LocalizedString;
    image: string;
  };
  whatWeDo: {
    title: LocalizedString;
    text: LocalizedString;
    image: string;
    items: [LocalizedString, LocalizedString, LocalizedString];
    buttonLabel: LocalizedString;
  };
  story: {
    title: LocalizedString;
    text: LocalizedString;
  };
  vision: {
    title: LocalizedString;
    text: LocalizedString;
  };
  mission: {
    title: LocalizedString;
    text: LocalizedString;
  };
  /** Partner logo images (image-only CMS). */
  partners: Array<{ id: string; name: string; logo: string }>;
  /** Client logo images (image-only CMS). */
  clients: Array<{ id: string; name: string; logo: string }>;
};

export type InsightPost = {
  id: string;
  title: string;
  titleKm: string;
  titleZh: string;
  image: string;
  category: string;
  author: string;
  bodyHtml: string;
  bodyHtmlKm: string;
  bodyHtmlZh: string;
  quote: string;
  sectionTitle: string;
  paragraphs: [string, string, string, string];
  pairedImages: [string, string];
  createdAt: string;
};

export type InsightsContent = {
  heroTitle: LocalizedString;
  heading: LocalizedString;
  posts: InsightPost[];
};

export type EventPost = {
  id: string;
  title: string;
  titleKm: string;
  titleZh: string;
  coverImage: string;
  image: string;
  kind: string;
  startsAt: string;
  endsAt: string;
  location: string;
  summary: string;
  summaryKm: string;
  summaryZh: string;
  body: string;
  bodyKm: string;
  bodyZh: string;
  createdAt: string;
};

export type EventsContent = {
  heroTitle: LocalizedString;
  heading: LocalizedString;
  posts: EventPost[];
};

export type PageId = "home" | "about" | "insights" | "events" | "footer";

export type PageContentMap = {
  home: HomeContent;
  about: AboutContent;
  insights: InsightsContent;
  events: EventsContent;
  footer: FooterContent;
};
