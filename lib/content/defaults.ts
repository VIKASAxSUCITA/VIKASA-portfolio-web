import type { LocalizedString } from "@/lib/i18n/locale";
import type {
  AboutContent,
  EventsContent,
  FooterContent,
  HomeContent,
  InsightPost,
  InsightsContent,
} from "./types";
import { buildInsightBodyHtmlFromLegacy } from "./insightHtml";

function L(en: string, km = "", zh = ""): LocalizedString {
  return { en, km, zh };
}

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
  const paragraphs = [...defaultInsightParagraphs] as InsightPost["paragraphs"];
  const pairedImages = [
    ...defaultInsightPairedImages,
  ] as InsightPost["pairedImages"];
  const quote =
    "Accountability and continuous improvement unlock growth that lasts.";
  const sectionTitle = "Creative approach to every project";

  return {
    id,
    title,
    titleKm: "",
    titleZh: "",
    image,
    category: "Insight",
    author: "VIKASA",
    quote,
    sectionTitle,
    paragraphs,
    pairedImages,
    bodyHtml: buildInsightBodyHtmlFromLegacy({
      paragraphs,
      pairedImages,
      sectionTitle,
      quote,
      featureImage: image,
    }),
    bodyHtmlKm: "",
    bodyHtmlZh: "",
    createdAt,
  };
}

export const defaultHomeContent: HomeContent = {
  hero: {
    title: L("VIKASA", "VIKASA", "VIKASA"),
    text: L(
      "Transform your business with expert consultancy services our team of seasoned consultants unparalleled. Transform your business.",
      "បំប្លែងអាជីវកម្មរបស់អ្នកជាមួយសេវាពិគ្រោះយោបល់ពីក្រុមអ្នកជំនាញដែលមានបទពិសោធន៍ខ្ពស់។ បំប្លែងអាជីវកម្មរបស់អ្នក។",
      "借助经验丰富的顾问团队提供的专业咨询服务，重塑您的业务。重塑您的业务。"
    ),
    image: "/assets/img/vikasa/banners/home-services-banner.jpg",
    ctaLabel: L("CONTACT US", "ទាក់ទងយើង", "联系我们"),
  },
  about: {
    title: L("What We Do", "អ្វីដែលយើងធ្វើ", "我们的服务"),
    text: L(
      "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",
      "បេសកកម្មរបស់យើងគឺជួយអាជីវកម្មគ្រប់ទំហំអោយរីកចម្រើនក្នុងទីផ្សារដែលផ្លាស់ប្តូរឥតឈប់ឈរ។",
      "我们的使命是助力各类规模的企业在不断变化的市场中茁壮成长。"
    ),
    image: "/assets/img/vikasa/aboutUs_image.png",
    items: [
      L(
        "Integrate a diverse range of ideas",
        "បញ្ចូលគំនិតចម្រុះ",
        "融合多元想法"
      ),
      L(
        "Deliver the highest quality outcomes",
        "ផ្តល់លទ្ធផលគុណភាពខ្ពស់បំផុត",
        "交付最高质量成果"
      ),
      L(
        "Believe in power of implication",
        "ជឿជាក់លើឥទ្ធិពលនៃការអនុវត្ត",
        "相信行动的力量"
      ),
    ],
    buttonLabel: L("More About Us", "ស្វែងយល់បន្ថែមអំពីយើង", "了解更多"),
  },
  cta: {
    badge: L("Recurring Earnings", "ប្រាក់ចំណូលកើតឡើងវិញ", "经常性收益"),
    title: L(
      "Ready for growth beyond limits?",
      "ត្រៀមខ្លួនសម្រាប់ការរីកចម្រើនហួសពីដែនកំណត់?",
      "准备好突破增长极限了吗？"
    ),
    text: L(
      "Partner with VIKASA to unlock smarter strategy, stronger performance, and lasting results.",
      "សហការជាមួយ VIKASA ដើម្បីបើកយុទ្ធសាស្ត្រឆ្លាតវៃ ប្រសិទ្ធភាពខ្លាំង និងលទ្ធផលយូរអង្វែង។",
      "与 VIKASA 合作，解锁更明智的战略、更强的业绩与持久成果。"
    ),
    buttonLabel: L("CONTACT US", "ទាក់ទងយើង", "联系我们"),
  },
  services: {
    heading: L("Our Services"),
    cards: [
      {
        title: L("Investment", "ការវិនិយោគ", "投资"),
        description: L(
          "Support investment decisions with clear valuation and structured deal readiness.",
          "គាំទ្រការសម្រេចចិត្តវិនិយោគតាមរយៈការវាយតម្លៃច្បាស់លាស់ និងការត្រៀមប្រតិបត្តិការដែលមានរចនាសម្ព័ន្ធ។",
          "以清晰估值与结构化交易准备，支持投资决策。"
        ),
        items: [
          L("Valuation Service", "សេវាវាយតម្លៃ", "估值服务"),
          L("Investment Landing Service", "សេវាទទួលការវិនិយោគ", "投资落地服务"),
        ],
      },
      {
        title: L("Business Enhancement", "ការពង្រឹងអាជីវកម្ម", "业务提升"),
        description: L(
          "Strengthen strategy, models, and investor materials that drive growth.",
          "ពង្រឹងយុទ្ធសាស្ត្រ គំរូអាជីវកម្ម និងឯកសារវិនិយោគដើម្បីជំរុញកំណើន។",
          "强化战略、商业模型与投资材料，驱动增长。"
        ),
        items: [
          L("Market Intelligence", "ព័ត៌មានទីផ្សារ", "市场情报"),
          L("Feasibility Studies", "ការសិក្សាលទ្ធភាព", "可行性研究"),
          L("Business Model", "គំរូអាជីវកម្ម", "商业模型"),
          L("Financial Model", "គំរូហិរញ្ញវត្ថុ", "财务模型"),
          L("Business Plan", "ផែនការអាជីវកម្ម", "商业计划"),
          L("Pitch Deck", "Pitch Deck", "路演材料"),
        ],
      },
      {
        title: L("Business Academy", "បណ្ឌិត្យសភាអាជីវកម្ម", "商业学院"),
        description: L(
          "Build leadership capability and enterprise skills through practical learning.",
          "កសាងសមត្ថភាពភាពជាអ្នកដឹកនាំ និងជំនាញសហគ្រាសតាមរយៈការរៀនសូត្រជាក់ស្តែង។",
          "通过实践学习，建设领导力与企业能力。"
        ),
        items: [
          L(
            "Strategic Growth & Performance for Owner & Top-Management",
            "យុទ្ធសាស្ត្រកំណើន និងប្រសិទ្ធភាពសម្រាប់ម្ចាស់ និងថ្នាក់ដឹកនាំ",
            "业主与高管的战略增长与绩效"
          ),
          L(
            "Corporate Training Development",
            "ការអភិវឌ្ឍបណ្តុះបណ្តាលសាជីវកម្ម",
            "企业培训发展"
          ),
          L(
            "Customized Course for Enterprise",
            "វគ្គសិក្សាតាមតម្រូវការសហគ្រាស",
            "企业定制课程"
          ),
        ],
      },
    ],
  },
  contact: {
    badge: L("Get Proposal"),
    title: L("Contact / Get Proposal"),
    text: L(
      "Tell us about your business goals. Request a proposal — reach us by form, WhatsApp, or email."
    ),
    email: "hello@vikasa.com",
    whatsappNumber: "855000000000",
    whatsappLabel: L("Chat on WhatsApp"),
    formTitle: L("Request Proposal"),
    formText: L(
      "Share a few details and we will follow up with a tailored proposal."
    ),
    buttonLabel: L("Request Proposal"),
  },
};

export const defaultAboutContent: AboutContent = {
  hero: {
    title: L("About VIKASA"),
    text: L(
      "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation."
    ),
    image: "/assets/img/vikasa/aboutUS_Banner_Page.png",
  },
  whatWeDo: {
    title: L("What We Do", "អ្វីដែលយើងធ្វើ", "我们的服务"),
    text: L(
      "Our mission is to empowers businesses off all size to thrive in an our businesses ever changing marketplace.",
      "បេសកកម្មរបស់យើងគឺជួយអាជីវកម្មគ្រប់ទំហំអោយរីកចម្រើនក្នុងទីផ្សារដែលផ្លាស់ប្តូរឥតឈប់ឈរ។",
      "我们的使命是助力各类规模的企业在不断变化的市场中茁壮成长。"
    ),
    image: "/assets/img/vikasa/aboutUs_image.png",
    items: [
      L(
        "Integrate a diverse range of ideas",
        "បញ្ចូលគំនិតចម្រុះ",
        "融合多元想法"
      ),
      L(
        "Deliver the highest quality outcomes",
        "ផ្តល់លទ្ធផលគុណភាពខ្ពស់បំផុត",
        "交付最高质量成果"
      ),
      L(
        "Believe in power of implication",
        "ជឿជាក់លើឥទ្ធិពលនៃការអនុវត្ត",
        "相信行动的力量"
      ),
    ],
    buttonLabel: L("More About Us", "ស្វែងយល់បន្ថែមអំពីយើង", "了解更多"),
  },
  story: {
    title: L("Why Vikasa Exists"),
    text: L(
      "Vikasa was founded to help businesses overcome challenges, embrace innovation, and achieve sustainable growth. We believe that accountability, continuous improvement, and strategic thinking enable organizations to transform today while preparing for tomorrow."
    ),
  },
  vision: {
    title: L("Our Vision"),
    text: L(
      "To empower businesses by reshaping the future, refining excellence, and reimagining possibilities through accountable and innovative strategies that drive sustainable growth and transformation."
    ),
  },
  mission: {
    title: L("Our Mission"),
    text: L(
      "Our mission is to provide businesses with actionable insights and transformative solutions by reinforcing accountability, driving continuous improvement, and fostering innovative strategies that unlock growth and reimagine new possibilities for success."
    ),
  },
};

export const defaultInsightsContent: InsightsContent = {
  heroTitle: L("Insights"),
  heading: L("Latest Insights From Us"),
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
  heroTitle: L("Events"),
  heading: L("Upcoming Events & Announcements"),
  posts: [
    {
      id: "event_1",
      title: "VIKASA Business Growth Workshop",
      titleKm: "",
      titleZh: "",
      coverImage: "/assets/img/blog/1.jpg",
      image: "/assets/img/blog/3.jpg",
      kind: "Event",
      startsAt: "2026-08-15T09:00:00.000Z",
      endsAt: "2026-08-15T12:00:00.000Z",
      location: "Connexion, Koh Pich, Phnom Penh",
      summary:
        "Join us for a morning workshop on strategy, performance, and practical growth tools for owners and leadership teams.",
      summaryKm: "",
      summaryZh: "",
      body: "Join VIKASA for a hands-on Business Growth Workshop designed for owners and top management.\n\nWe will cover market intelligence, financial clarity, and practical next steps you can apply immediately in your organization.\n\nSeats are limited. Register early to secure your place.",
      bodyKm: "",
      bodyZh: "",
      createdAt: "2026-07-20T10:00:00.000Z",
    },
    {
      id: "event_2",
      title: "Office Hours Relocation Notice",
      titleKm: "",
      titleZh: "",
      coverImage: "/assets/img/blog/2.jpg",
      image: "/assets/img/blog/1.jpg",
      kind: "Announcement",
      startsAt: "2026-07-25T01:00:00.000Z",
      endsAt: "",
      location: "Connexion, Koh Pich, Phnom Penh",
      summary:
        "Our consulting team will operate from Connexion, Koh Pich starting later this month. Visit us by appointment.",
      summaryKm: "",
      summaryZh: "",
      body: "We are pleased to announce that VIKASA will welcome clients at Connexion, Koh Pich, Corner of Koh Pich Street, and Park Ave, Phnom Penh.\n\nPlease continue to reach us by email or WhatsApp to schedule meetings. We look forward to hosting you.",
      bodyKm: "",
      bodyZh: "",
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
