import type {
  AboutContent,
  BlogDetailsContent,
  FooterContent,
  HomeContent,
  InsightsContent,
} from "./types";

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
          "Market Intelligence & Advisory",
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
  insights: {
    heading: "Latest Insights From Us",
    posts: [
      {
        title: "Empowering entrepreneu fueling growth knowledge",
        image: "/assets/img/blog/1.jpg",
      },
      {
        title: "Empowering entrepreneu fueling growth knowledge",
        image: "/assets/img/blog/2.jpg",
      },
      {
        title: "Empowering entrepreneu fueling growth knowledge",
        image: "/assets/img/blog/3.jpg",
      },
    ],
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
    {
      id: "1",
      title: "Empowering entrepreneu fueling growth knowledge",
      image: "/assets/img/blog/1.jpg",
    },
    {
      id: "2",
      title: "Empowering entrepreneu fueling growth knowledge",
      image: "/assets/img/blog/2.jpg",
    },
    {
      id: "3",
      title: "Empowering entrepreneu fueling growth knowledge",
      image: "/assets/img/blog/3.jpg",
    },
    {
      id: "4",
      title: "Empowering entrepreneu fueling growth knowledge",
      image: "/assets/img/blog/1.jpg",
    },
    {
      id: "5",
      title: "Empowering entrepreneu fueling growth knowledge",
      image: "/assets/img/blog/2.jpg",
    },
    {
      id: "6",
      title: "Empowering entrepreneu fueling growth knowledge",
      image: "/assets/img/blog/3.jpg",
    },
  ],
};

export const defaultBlogDetailsContent: BlogDetailsContent = {
  bannerTitle: "Blog Details",
  heroImage: "/assets/img/blog/1.jpg",
  title: "Empowering entrepreneu fueling growth knowledge",
  paragraphs: [
    "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore of magna aliqua. Ut enim ad minim veniam, made of owl the quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea dolor commodo consequat. Duis aute irure and dolor in reprehenderit.",
    "Use both direct conversations and indirect observations to get visibility into employees challenges and concerns. Use every opportunity to make clear to employees that you support and care them. To facilitate regular conversations between managers and employees, provide.",
    "The third Monday of January is supposed to be the most depressing day of the year. Whether you believe that or not, the long nights, cold weather, and trying to keep to new year resolutions are all probably getting to you a little by now. To make matters worse many will still be recovering from their Christmas spending. So how can you make today",
    "Vast numbers of employees now work remotely, and it's too late to develop a set of remote-work policies if you didn't already have one. But there are ways to make the remote-work experience productive and engaging for employees",
  ],
  pairedImages: ["/assets/img/blog/d1.jpg", "/assets/img/blog/d2.jpg"],
};

export const defaultFooterContent: FooterContent = {
  social: {
    facebook: "https://web.facebook.com",
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    instagram: "https://www.instagram.com/",
  },
  copyright: "VIKASA. All rights reserved.",
};
