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
    titleKm: "ផ្តល់អំណាចដល់សហគ្រិន ជំរុញកំណើនតាមចំណេះដឹង",
    titleZh: "赋能创业者，以知识驱动增长",
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
    heading: L("Our Services", "សេវាកម្មរបស់យើង", "我们的服务"),
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
    badge: L("Get Proposal", "ស្នើសុំសំណើសេវា", "获取方案"),
    title: L(
      "Contact / Get Proposal",
      "ទំនាក់ទំនង / ស្នើសុំសំណើសេវា",
      "联系 / 获取方案"
    ),
    text: L(
      "Tell us about your business goals. Request a proposal — reach us by form, WhatsApp, or email.",
      "ប្រាប់យើងអំពីគោលដៅអាជីវកម្មរបស់អ្នក។ ស្នើសុំសំណើសេវា — ទាក់ទងតាមសំណុំបែបបទ WhatsApp ឬអ៊ីមែល។",
      "告诉我们您的业务目标。通过表单、WhatsApp 或邮件申请方案。"
    ),
    email: "hello@vikasa.com",
    whatsappNumber: "855000000000",
    whatsappLabel: L(
      "Chat on WhatsApp",
      "ជជែកតាម WhatsApp",
      "通过 WhatsApp 聊天"
    ),
    formTitle: L("Request Proposal", "ស្នើសុំសំណើសេវា", "申请方案"),
    formText: L(
      "Share a few details and we will follow up with a tailored proposal.",
      "ចែករំលែកព័ត៌មានខ្លះ យើងនឹងតាមដានជាមួយសំណើសេវាដែលសមស្រប។",
      "分享一些详情，我们将跟进定制方案。"
    ),
    buttonLabel: L("Request Proposal", "ស្នើសុំសំណើសេវា", "申请方案"),
  },
};

export const defaultAboutContent: AboutContent = {
  hero: {
    title: L("About VIKASA", "អំពី VIKASA", "关于 VIKASA"),
    text: L(
      "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation.",
      "VIKASA ជួយអាជីវកម្មរីកចម្រើនតាមរយៈការពិគ្រោះយោបល់យុទ្ធសាស្ត្រ នវានុវត្តន៍ និងដំណោះស្រាយដែលមានទំនួលខុសត្រូវ ដើម្បីបំប្លែងប្រកបដោយចីរភាព។",
      "VIKASA 通过战略咨询、创新与负责任的解决方案，助力企业实现可持续转型与成长。"
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
    title: L("Why Vikasa Exists", "ហេតុអ្វីមានវត្តមាន VIKASA", "为何存在 VIKASA"),
    text: L(
      "Vikasa was founded to help businesses overcome challenges, embrace innovation, and achieve sustainable growth. We believe that accountability, continuous improvement, and strategic thinking enable organizations to transform today while preparing for tomorrow.",
      "VIKASA ត្រូវបានបង្កើតឡើងដើម្បីជួយអាជីវកម្មយកឈ្នះបញ្ហា ប្រកាន់យកនវានុវត្តន៍ និងសម្រេចកំណើនប្រកបដោយចីរភាព។ យើងជឿថាទំនួលខុសត្រូវ ការកែលម្អជាបន្ត និងការគិតយុទ្ធសាស្ត្រ អាចជួយអង្គភាពបំប្លែងថ្ងៃនេះ ខណៈត្រៀមខ្លួនសម្រាប់ថ្ងៃស្អែក។",
      "VIKASA 的创立旨在帮助企业迎接挑战、拥抱创新并实现可持续增长。我们相信，问责、持续改进与战略思维能让组织在变革当下的同时，为未来做好准备。"
    ),
  },
  vision: {
    title: L("Our Vision", "ចក្ខុវិស័យរបស់យើង", "我们的愿景"),
    text: L(
      "To empower businesses by reshaping the future, refining excellence, and reimagining possibilities through accountable and innovative strategies that drive sustainable growth and transformation.",
      "ផ្តល់អំណាចដល់អាជីវកម្មដោយរៀបចំអនាគតឡើងវិញ កែលម្អឧត្តមភាព និងស្រមៃឡើងវិញនូវលទ្ធភាពតាមរយៈយុទ្ធសាស្ត្រដែលមានទំនួលខុសត្រូវ និងនវានុវត្តន៍ ដើម្បីជំរុញកំណើន និងការបំប្លែងប្រកបដោយចីរភាព។",
      "以负责任与创新的战略重塑未来、精进卓越、重新构想可能，赋能企业实现可持续增长与转型。"
    ),
  },
  mission: {
    title: L("Our Mission", "បេសកកម្មរបស់យើង", "我们的使命"),
    text: L(
      "Our mission is to provide businesses with actionable insights and transformative solutions by reinforcing accountability, driving continuous improvement, and fostering innovative strategies that unlock growth and reimagine new possibilities for success.",
      "បេសកកម្មរបស់យើងគឺផ្តល់ឱ្យអាជីវកម្មនូវការយល់ដឹងដែលអាចអនុវត្តបាន និងដំណោះស្រាយផ្លាស់ប្តូរដោយពង្រឹងទំនួលខុសត្រូវ ជំរុញការកែលម្អជាបន្ត និងជំរុញយុទ្ធសាស្ត្រនវានុវត្តន៍ ដើម្បីបើកកំណើន និងស្រមៃឡើងវិញនូវលទ្ធភាពជោគជ័យថ្មី។",
      "我们的使命是通过强化问责、推动持续改进并培育创新战略，为企业提供可执行洞察与变革方案，从而解锁增长并重新构想成功的可能。"
    ),
  },
  partners: [
    {
      id: "p1",
      name: "Company Buildings",
      logo: "/assets/img/partner_logo/partner-1.jpg",
    },
    {
      id: "p2",
      name: "Company Emblem",
      logo: "/assets/img/partner_logo/partner-2.jpg",
    },
    {
      id: "p3",
      name: "Rolex",
      logo: "/assets/img/partner_logo/partner-3.png",
    },
    {
      id: "p4",
      name: "Glycon",
      logo: "/assets/img/partner_logo/partner-4.png",
    },
  ],
  clients: [
    {
      id: "c1",
      name: "Corporate",
      logo: "/assets/img/client_logo/client-1.jpg",
    },
    {
      id: "c2",
      name: "ArrowPrime Financial",
      logo: "/assets/img/client_logo/client-2.jpg",
    },
    {
      id: "c3",
      name: "Tech Company",
      logo: "/assets/img/client_logo/client-3.jpg",
    },
  ],
};

export const defaultInsightsContent: InsightsContent = {
  heroTitle: L("Insights", "វិចារណកថា", "洞察"),
  heading: L(
    "Latest Insights From Us",
    "វិចារណកថាថ្មីៗពីយើង",
    "我们的最新洞察"
  ),
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
  heroTitle: L("Events", "ព្រឹត្តិការណ៍", "活动"),
  heading: L(
    "Upcoming Events & Announcements",
    "ព្រឹត្តិការណ៍ និងសេចក្តីប្រកាសខាងមុខ",
    "即将到来的活动与公告"
  ),
  posts: [
    {
      id: "event_1",
      title: "VIKASA Business Growth Workshop",
      titleKm: "សិក្ខាសាលាកំណើនអាជីវកម្ម VIKASA",
      titleZh: "VIKASA 业务增长工作坊",
      coverImage: "/assets/img/blog/1.jpg",
      image: "/assets/img/blog/3.jpg",
      kind: "Event",
      startsAt: "2026-08-15T09:00:00.000Z",
      endsAt: "2026-08-15T12:00:00.000Z",
      location: "Connexion, Koh Pich, Phnom Penh",
      summary:
        "Join us for a morning workshop on strategy, performance, and practical growth tools for owners and leadership teams.",
      summaryKm:
        "ចូលរួមសិក្ខាសាលាពេលព្រឹកអំពីយុទ្ធសាស្ត្រ ប្រសិទ្ធភាព និងឧបករណ៍កំណើនជាក់ស្តែងសម្រាប់ម្ចាស់អាជីវកម្ម និងក្រុមថ្នាក់ដឹកនាំ។",
      summaryZh:
        "欢迎参加上午工作坊，聚焦战略、绩效与实用增长工具，面向企业主与领导团队。",
      body: "Join VIKASA for a hands-on Business Growth Workshop designed for owners and top management.\n\nWe will cover market intelligence, financial clarity, and practical next steps you can apply immediately in your organization.\n\nSeats are limited. Register early to secure your place.",
      bodyKm:
        "ចូលរួមសិក្ខាសាលាកំណើនអាជីវកម្មរបស់ VIKASA ដែលរចនាឡើងសម្រាប់ម្ចាស់ និងថ្នាក់ដឹកនាំ។\n\nយើងនឹងគ្របដណ្តប់ព័ត៌មានទីផ្សារ ភាពច្បាស់លាស់ហិរញ្ញវត្ថុ និងជំហានបន្ទាប់ដែលអាចអនុវត្តភ្លាមៗ។\n\nកន្លែងមានកំណត់។ សូមចុះឈ្មោះមុនដើម្បីធានាកន្លែង។",
      bodyZh:
        "欢迎参加 VIKASA 业务增长实操工作坊，专为企业主与高管设计。\n\n我们将涵盖市场情报、财务清晰度，以及可立即落地的下一步行动。\n\n名额有限，请尽早报名。",
      createdAt: "2026-07-20T10:00:00.000Z",
    },
    {
      id: "event_2",
      title: "Office Hours Relocation Notice",
      titleKm: "សេចក្តីជូនដំណឹងផ្លាស់ប្តូរទីតាំងការិយាល័យ",
      titleZh: "办公时间地点变更通知",
      coverImage: "/assets/img/blog/2.jpg",
      image: "/assets/img/blog/1.jpg",
      kind: "Announcement",
      startsAt: "2026-07-25T01:00:00.000Z",
      endsAt: "",
      location: "Connexion, Koh Pich, Phnom Penh",
      summary:
        "Our consulting team will operate from Connexion, Koh Pich starting later this month. Visit us by appointment.",
      summaryKm:
        "ក្រុមពិគ្រោះយោបល់របស់យើងនឹងដំណើរការពី Connexion, Koh Pich ចាប់ពីចុងខែនេះ។ សូមទស្សនាតាមការណាត់ជួប។",
      summaryZh:
        "我们的咨询团队将于本月晚些时候在金边钻石岛 Connexion 办公。请预约拜访。",
      body: "We are pleased to announce that VIKASA will welcome clients at Connexion, Koh Pich, Corner of Koh Pich Street, and Park Ave, Phnom Penh.\n\nPlease continue to reach us by email or WhatsApp to schedule meetings. We look forward to hosting you.",
      bodyKm:
        "យើងរីករាយជូនដំណឹងថា VIKASA នឹងទទួលភ្ញៀវនៅ Connexion, Koh Pich, ជ្រុងផ្លូវ Koh Pich និង Park Ave, ភ្នំពេញ។\n\nសូមបន្តទាក់ទងតាមអ៊ីមែល ឬ WhatsApp ដើម្បីកំណត់ការណាត់ជួប។ យើងរង់ចាំស្វាគមន៍អ្នក។",
      bodyZh:
        "我们很高兴宣布，VIKASA 将在金边钻石岛 Connexion（Koh Pich Street 与 Park Ave 路口）接待客户。\n\n请继续通过邮件或 WhatsApp 预约会面。期待与您见面。",
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
