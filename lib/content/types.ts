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

export type EventPost = {
  id: string;
  title: string;
  /** Hero / listing cover image. */
  coverImage: string;
  /** Detail page content image. */
  image: string;
  /** Freeform category, e.g. Event, Announcement, Workshop. */
  kind: string;
  /** ISO datetime for when the event/announcement is scheduled. */
  startsAt: string;
  /** Optional ISO end datetime. Empty string when not set. */
  endsAt: string;
  location: string;
  summary: string;
  body: string;
  createdAt: string;
};

export type EventsContent = {
  heroTitle: string;
  heading: string;
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
