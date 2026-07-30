import type { LocalizedString } from "@/lib/i18n/locale";
import { localizedFromEn } from "@/lib/i18n/locale";

export type ServiceSlug =
  | "investment"
  | "business-enhancement"
  | "business-academy";

export type ServiceDetail = {
  slug: ServiceSlug;
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
  items: LocalizedString[];
  heroImage: string;
  body: LocalizedString;
};

export function slugifyServiceTitle(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "service"
  );
}

/** Canonical service catalog with EN / KM / ZH copy. */
export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "investment",
    icon: "/assets/img/vikasa/services/investment.jpg",
    heroImage: "/assets/img/vikasa/services/investment.jpg",
    title: {
      en: "Investment",
      km: "ការវិនិយោគ",
      zh: "投资",
    },
    description: {
      en: "Support investment decisions with clear valuation and structured deal readiness.",
      km: "គាំទ្រការសម្រេចចិត្តវិនិយោគតាមរយៈការវាយតម្លៃច្បាស់លាស់ និងការត្រៀមប្រតិបត្តិការដែលមានរចនាសម្ព័ន្ធ។",
      zh: "以清晰估值与结构化交易准备，支持投资决策。",
    },
    items: [
      {
        en: "Valuation Service",
        km: "សេវាវាយតម្លៃ",
        zh: "估值服务",
      },
      {
        en: "Investment Landing Service",
        km: "សេវាទទួលការវិនិយោគ",
        zh: "投资落地服务",
      },
    ],
    body: {
      en: "VIKASA helps owners and investors evaluate opportunities with clarity. We structure valuation, diligence readiness, and landing support so capital decisions are grounded in facts—and executable.",
      km: "VIKASA ជួយម្ចាស់អាជីវកម្ម និងវិនិយោគិនវាយតម្លៃឱកាសដោយភាពច្បាស់លាស់។ យើងរៀបចំការវាយតម្លៃ ការត្រៀមពិនិត្យ និងការគាំទ្រចុះទៅវិនិយោគ ដើម្បីឱ្យការសម្រេចចិត្តមានមូលដ្ឋាន និងអាចអនុវត្តបាន។",
      zh: "VIKASA 帮助企业主与投资者清晰评估机会。我们提供估值、尽职准备与投资落地支持，使资本决策有据可依、可执行。",
    },
  },
  {
    slug: "business-enhancement",
    icon: "/assets/img/vikasa/services/business-enhancement.webp",
    heroImage: "/assets/img/vikasa/services/business-enhancement.webp",
    title: {
      en: "Business Enhancement",
      km: "ការពង្រឹងអាជីវកម្ម",
      zh: "业务提升",
    },
    description: {
      en: "Strengthen strategy, models, and investor materials that drive growth.",
      km: "ពង្រឹងយុទ្ធសាស្ត្រ គំរូអាជីវកម្ម និងឯកសារវិនិយោគដើម្បីជំរុញកំណើន។",
      zh: "强化战略、商业模型与投资材料，驱动增长。",
    },
    items: [
      localizedFromEn("Market Intelligence"),
      localizedFromEn("Feasibility Studies"),
      localizedFromEn("Business Model"),
      localizedFromEn("Financial Model"),
      localizedFromEn("Business Plan"),
      localizedFromEn("Pitch Deck"),
    ].map((item, index) => {
      const km = [
        "ព័ត៌មានទីផ្សារ",
        "ការសិក្សាលទ្ធភាព",
        "គំរូអាជីវកម្ម",
        "គំរូហិរញ្ញវត្ថុ",
        "ផែនការអាជីវកម្ម",
        "Pitch Deck",
      ][index];
      const zh = [
        "市场情报",
        "可行性研究",
        "商业模型",
        "财务模型",
        "商业计划",
        "路演材料",
      ][index];
      return { en: item.en, km, zh };
    }),
    body: {
      en: "From market intelligence to pitch decks, we help leadership teams sharpen the story, numbers, and operating model behind sustainable growth.",
      km: "ពីព័ត៌មានទីផ្សារដល់ pitch deck យើងជួយក្រុមថ្នាក់ដឹកនាំធ្វើឱ្យរឿងរ៉ាវ លេខ និងគំរូប្រតិបត្តិការកាន់តែច្បាស់សម្រាប់កំណើនប្រកបដោយនិរន្តរភាព។",
      zh: "从市场情报到路演材料，我们帮助管理层打磨增长故事、数字与运营模型。",
    },
  },
  {
    slug: "business-academy",
    icon: "/assets/img/vikasa/services/business-academy.jpg",
    heroImage: "/assets/img/vikasa/services/business-academy.jpg",
    title: {
      en: "Business Academy",
      km: "បណ្ឌិត្យសភាអាជីវកម្ម",
      zh: "商业学院",
    },
    description: {
      en: "Build leadership capability and enterprise skills through practical learning.",
      km: "កសាងសមត្ថភាពភាពជាអ្នកដឹកនាំ និងជំនាញសហគ្រាសតាមរយៈការរៀនសូត្រជាក់ស្តែង។",
      zh: "通过实践学习，建设领导力与企业能力。",
    },
    items: [
      {
        en: "Strategic Growth & Performance for Owner & Top-Management",
        km: "យុទ្ធសាស្ត្រកំណើន និងប្រសិទ្ធភាពសម្រាប់ម្ចាស់ និងថ្នាក់ដឹកនាំ",
        zh: "业主与高管的战略增长与绩效",
      },
      {
        en: "Corporate Training Development",
        km: "ការអភិវឌ្ឍបណ្តុះបណ្តាលសាជីវកម្ម",
        zh: "企业培训发展",
      },
      {
        en: "Customized Course for Enterprise",
        km: "វគ្គសិក្សាតាមតម្រូវការសហគ្រាស",
        zh: "企业定制课程",
      },
    ],
    body: {
      en: "Our academy programs are built for owners and senior teams who need practical tools—not theory—to improve performance and lead transformation.",
      km: "កម្មវិធីបណ្ឌិត្យសភារបស់យើងត្រូវបានបង្កើតសម្រាប់ម្ចាស់ និងក្រុមថ្នាក់ខ្ពស់ដែលត្រូវការឧបករណ៍ជាក់ស្តែង—មិនមែនទ្រឹស្តី—ដើម្បីបង្កើនប្រសិទ្ធភាព និងដឹកនាំការផ្លាស់ប្តូរ។",
      zh: "学院课程面向企业主与高管，提供可落地的工具而非空谈，以提升绩效并引领变革。",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((service) => service.slug === slug);
}

export function resolveServiceSlug(
  title: string | LocalizedString,
  index: number
): ServiceSlug {
  const label = typeof title === "string" ? title : title?.en ?? "";
  const fromTitle = slugifyServiceTitle(label);
  const match = SERVICE_DETAILS.find((service) => service.slug === fromTitle);
  if (match) return match.slug;
  return SERVICE_DETAILS[index]?.slug ?? "investment";
}
