import type {
  AboutContent,
  EventsContent,
  FooterContent,
  HomeContent,
  InsightPost,
  InsightsContent,
} from "./types";

export const defaultInsightParagraphs: InsightPost["paragraphs"] = [
  "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore of magna aliqua. Ut enim ad minim veniam, made of owl the quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea dolor commodo consequat. Duis aute irure and dolor in reprehenderit.",
  "Use both direct conversations and indirect observations to get visibility into employees challenges and concerns. Use every opportunity to make clear to employees that you support and care them. To facilitate regular conversations between managers and employees, provide.",
  "The third Monday of January is supposed to be the most depressing day of the year. Whether you believe that or not, the long nights, cold weather, and trying to keep to new year resolutions are all probably getting to you a little by now. To make matters worse many will still be recovering from their Christmas spending. So how can you make today",
  "Vast numbers of employees now work remotely, and it's too late to develop a set of remote-work policies if you didn't already have one. But there are ways to make the remote-work experience productive and engaging for employees",
];

export const defaultInsightPairedImages: InsightPost["pairedImages"] = [
  "/assets/img/blog/d1.jpg",
  "/assets/img/blog/d2.jpg",
];

function insightDefaults(
  id: string,
  title: string,
  image: string,
  createdAt: string
): InsightPost {
  return {
    id,
    title,
    image,
    category: "Insight",
    author: "VIKASA",
    quote:
      "Accountability and continuous improvement unlock growth that lasts.",
    sectionTitle: "Creative approach to every project",
    paragraphs: [...defaultInsightParagraphs] as InsightPost["paragraphs"],
    pairedImages: [...defaultInsightPairedImages] as InsightPost["pairedImages"],
    createdAt,
  };
}

export const defaultHomeContent: HomeContent = {
  hero: {
    title: "VIKASA",
    text: "Transform your business with expert consultancy services our team of seasoned consultants unparalleled. Transform your business.",
    image: "/assets/img/vikasa/home_page_banner.png",
    ctaLabel: "CONTACT US",
  },
  about: {
    title: "What We Do",
    text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",
    image: "/assets/img/vikasa/aboutUs_image.png",
    items: [
      "Integrate a diverse range of ideas",
      "Deliver the highest quality outcomes",
      "Believe in power of implication",
    ],
    buttonLabel: "More About Us",
  },
  cta: {
    badge: "Recurring Earnings",
    title: "Ready for growth beyond limits?",
    text: "Partner with VIKASA to unlock smarter strategy, stronger performance, and lasting results.",
    buttonLabel: "CONTACT US",
  },
  services: {
    heading: "Our Services",
    cards: [
      {
        title: "Investment",
        description:
          "Support investment decisions with clear valuation and structured deal readiness.",
        items: ["Valuation Service", "Investment Landing Service"],
      },
      {
        title: "Business Enhancement",
        description:
          "Strengthen strategy, models, and investor materials that drive growth.",
        items: [
          "Market Intelligence",
          "Business Model",
          "Financial Model",
          "Business Plan",
          "Pitch Deck",
        ],
      },
      {
        title: "Business Academy",
        description:
          "Build leadership capability and enterprise skills through practical learning.",
        items: [
          "Strategic Growth & Performance for Owner & Top-Management",
          "Corporate Training Development",
          "Customized Course for Enterprise",
        ],
      },
    ],
  },
  contact: {
    badge: "Get Proposal",
    title: "Contact / Get Proposal",
    text: "Tell us about your business goals. Request a proposal — reach us by form, WhatsApp, or email.",
    email: "hello@vikasa.com",
    whatsappNumber: "855000000000",
    whatsappLabel: "Chat on WhatsApp",
    formTitle: "Request Proposal",
    formText:
      "Share a few details and we will follow up with a tailored proposal.",
    buttonLabel: "Request Proposal",
  },
};

export const defaultAboutContent: AboutContent = {
  hero: {
    title: "About VIKASA",
    text: "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation.",
    image: "/assets/img/vikasa/aboutUS_Banner_Page.png",
  },
  whatWeDo: {
    title: "What We Do",
    text: "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",
    image: "/assets/img/vikasa/aboutUs_image.png",
    items: [
      "Integrate a diverse range of ideas",
      "Deliver the highest quality outcomes",
      "Believe in power of implication",
    ],
    buttonLabel: "More About Us",
  },
  story: {
    title: "Why Vikasa Exists",
    text: "Vikasa was founded to help businesses overcome challenges, embrace innovation, and achieve sustainable growth. We believe that accountability, continuous improvement, and strategic thinking enable organizations to transform today while preparing for tomorrow.",
  },
  vision: {
    title: "Our Vision",
    text: "To empower businesses by reshaping the future, refining excellence, and reimagining possibilities through accountable and innovative strategies that drive sustainable growth and transformation.",
  },
  mission: {
    title: "Our Mission",
    text: "Our mission is to provide businesses with actionable insights and transformative solutions by reinforcing accountability, driving continuous improvement, and fostering innovative strategies that unlock growth and reimagine new possibilities for success.",
  },
};

export const defaultInsightsContent: InsightsContent = {
  heroTitle: "Insights",
  heading: "Latest Insights From Us",
  posts: [
    insightDefaults(
      "insight_1",
      "Empowering entrepreneu fueling growth knowledge",
      "/assets/img/blog/1.jpg",
      "2026-07-14T12:00:06.000Z"
    ),
    insightDefaults(
      "insight_2",
      "Empowering entrepreneu fueling growth knowledge",
      "/assets/img/blog/2.jpg",
      "2026-07-14T12:00:05.000Z"
    ),
    insightDefaults(
      "insight_3",
      "Empowering entrepreneu fueling growth knowledge",
      "/assets/img/blog/3.jpg",
      "2026-07-14T12:00:04.000Z"
    ),
    insightDefaults(
      "insight_4",
      "Empowering entrepreneu fueling growth knowledge",
      "/assets/img/blog/1.jpg",
      "2026-07-14T12:00:03.000Z"
    ),
    insightDefaults(
      "insight_5",
      "Empowering entrepreneu fueling growth knowledge",
      "/assets/img/blog/2.jpg",
      "2026-07-14T12:00:02.000Z"
    ),
    insightDefaults(
      "insight_6",
      "Empowering entrepreneu fueling growth knowledge",
      "/assets/img/blog/3.jpg",
      "2026-07-14T12:00:01.000Z"
    ),
  ],
};

export const defaultEventsContent: EventsContent = {
  heroTitle: "Events",
  heading: "Upcoming Events & Announcements",
  posts: [
    {
      id: "event_1",
      title: "VIKASA Business Growth Workshop",
      coverImage: "/assets/img/blog/1.jpg",
      image: "/assets/img/blog/3.jpg",
      kind: "Event",
      startsAt: "2026-08-15T09:00:00.000Z",
      endsAt: "2026-08-15T12:00:00.000Z",
      location: "Connexion, Koh Pich, Phnom Penh",
      summary:
        "Join us for a morning workshop on strategy, performance, and practical growth tools for owners and leadership teams.",
      body: "Join VIKASA for a hands-on Business Growth Workshop designed for owners and top management.\n\nWe will cover market intelligence, financial clarity, and practical next steps you can apply immediately in your organization.\n\nSeats are limited. Register early to secure your place.",
      createdAt: "2026-07-20T10:00:00.000Z",
    },
    {
      id: "event_2",
      title: "Office Hours Relocation Notice",
      coverImage: "/assets/img/blog/2.jpg",
      image: "/assets/img/blog/1.jpg",
      kind: "Announcement",
      startsAt: "2026-07-25T01:00:00.000Z",
      endsAt: "",
      location: "Connexion, Koh Pich, Phnom Penh",
      summary:
        "Our consulting team will operate from Connexion, Koh Pich starting later this month. Visit us by appointment.",
      body: "We are pleased to announce that VIKASA will welcome clients at Connexion, Koh Pich, Corner of Koh Pich Street, and Park Ave, Phnom Penh.\n\nPlease continue to reach us by email or WhatsApp to schedule meetings. We look forward to hosting you.",
      createdAt: "2026-07-18T08:00:00.000Z",
    },
  ],
};

export const defaultFooterContent: FooterContent = {
  social: {
    facebook: "https://web.facebook.com",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    instagram: "https://www.instagram.com/",
  },
  contact: {
    address:
      "Connexion, Koh Pich, Corner of Koh Pich Street, and Park Ave, Phnom Penh",
    phone: "+855 00 000 0000",
    email: "hello@vikasa.com",
  },
  copyright: "VIKASA. All rights reserved.",
};
