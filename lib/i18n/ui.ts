import type { Locale, LocalizedString } from "@/lib/i18n/locale";

/** BCP-47 tag for `Intl` date/time formatting. */
export function localeToBcp47(locale: Locale): string {
  if (locale === "km") return "km-KH";
  if (locale === "zh") return "zh-CN";
  return "en-US";
}

function L(en: string, km: string, zh: string): LocalizedString {
  return { en, km, zh };
}

/** Shared public UI chrome — EN / KM / ZH. */
export const ui = {
  nav: {
    home: L("Home", "ទំព័រដើម", "首页"),
    about: L("About Us", "អំពីយើង", "关于我们"),
    services: L("Services", "សេវាកម្ម", "服务"),
    insights: L("Insights", "វិចារណកថា", "洞察"),
    events: L("Events", "ព្រឹត្តិការណ៍", "活动"),
    contact: L("Contact", "ទំនាក់ទំនង", "联系"),
  },
  footer: {
    quickLink: L("Quick Link", "តំណភ្ជាប់រហ័ស", "快速链接"),
    services: L("Services", "សេវាកម្ម", "服务"),
    contactInfo: L("Contact Info", "ព័ត៌មានទំនាក់ទំនង", "联系信息"),
    address: L("Address", "អាសយដ្ឋាន", "地址"),
    telegram: L("Telegram", "តេលេក្រាម", "Telegram"),
    phone: L("Phone", "ទូរស័ព្ទ", "电话"),
    email: L("Email", "អ៊ីមែល", "邮箱"),
    copyright: L("Copyright ©", "រក្សាសិទ្ធិ ©", "版权所有 ©"),
  },
  services: {
    investment: L("Investment", "ការវិនិយោគ", "投资"),
    enhancement: L("Business Enhancement", "ការពង្រឹងអាជីវកម្ម", "业务提升"),
    academy: L("Business Academy", "បណ្ឌិត្យសភាអាជីវកម្ម", "商业学院"),
  },
  partners: {
    title: L("Our Partners", "ដៃគូរបស់យើង", "我们的合作伙伴"),
    subtitle: L(
      "Trusted collaborators across investment and growth.",
      "ដៃគូដែលទុកចិត្តនៅក្នុងវិស័យវិនិយោគ និងកំណើន។",
      "值得信赖的投资与增长合作伙伴。"
    ),
  },
  clients: {
    title: L("Our Clients", "អតិថិជនរបស់យើង", "我们的客户"),
    subtitle: L(
      "Organizations we support with clarity and execution.",
      "អង្គភាពដែលយើងគាំទ្រដោយភាពច្បាស់លាស់ និងការអនុវត្ត។",
      "我们以清晰与执行力支持的组织。"
    ),
  },
  contact: {
    email: L("Email", "អ៊ីមែល", "邮箱"),
    telegram: L("Telegram", "តេលេក្រាម", "Telegram"),
    whatsapp: L("WhatsApp", "WhatsApp", "WhatsApp"),
    namePlaceholder: L("Your Name *", "ឈ្មោះរបស់អ្នក *", "您的姓名 *"),
    emailPlaceholder: L("Email *", "អ៊ីមែល *", "邮箱 *"),
    messagePlaceholder: L(
      "Tell us about your project *",
      "ប្រាប់យើងអំពីគម្រោងរបស់អ្នក *",
      "告诉我们您的项目 *"
    ),
    nameLabel: L("Your Name", "ឈ្មោះរបស់អ្នក", "您的姓名"),
    messageLabel: L("Project details", "ព័ត៌មានគម្រោង", "项目详情"),
    whatsappPreset: L(
      "Hello VIKASA, I would like to request a proposal.",
      "សួស្តី VIKASA ខ្ញុំចង់ស្នើសុំសំណើសេវា។",
      "您好 VIKASA，我想申请一份方案提案。"
    ),
    mailSubject: L(
      "VIKASA — Request Proposal",
      "VIKASA — ស្នើសុំសំណើសេវា",
      "VIKASA — 申请方案"
    ),
    mailName: L("Name:", "ឈ្មោះ៖", "姓名："),
    mailEmail: L("Email:", "អ៊ីមែល៖", "邮箱："),
    sentNote: L(
      "Opening your email app to send the proposal request…",
      "កំពុងបើកកម្មវិធីអ៊ីមែលដើម្បីផ្ញើសំណើ…",
      "正在打开邮件应用以发送方案申请…"
    ),
    chatAria: L("Chat on WhatsApp", "ជជែកតាម WhatsApp", "通过 WhatsApp 聊天"),
    telegramAria: L(
      "Message on Telegram",
      "ផ្ញើសារតាមតេលេក្រាម",
      "通过 Telegram 发消息"
    ),
  },
  search: {
    toggleAria: L(
      "Search insights and events",
      "ស្វែងរកវិចារណកថា និងព្រឹត្តិការណ៍",
      "搜索洞察与活动"
    ),
    panelAria: L("Search", "ស្វែងរក", "搜索"),
    placeholder: L(
      "Search insights & events…",
      "ស្វែងរកវិចារណកថា និងព្រឹត្តិការណ៍…",
      "搜索洞察与活动…"
    ),
    inputAria: L(
      "Search by insight or event title",
      "ស្វែងរកតាមចំណងជើង",
      "按标题搜索"
    ),
    empty: L("No matches found.", "រកមិនឃើញលទ្ធផល។", "未找到匹配结果。"),
    hint: L(
      "Type at least 2 characters.",
      "វាយយ៉ាងតិច ២ តួអក្សរ។",
      "请至少输入 2 个字符。"
    ),
    insight: L("Insight", "វិចារណកថា", "洞察"),
    event: L("Event", "ព្រឹត្តិការណ៍", "活动"),
  },
  events: {
    empty: L(
      "No events or announcements yet. Check back soon.",
      "មិនទាន់មានព្រឹត្តិការណ៍ ឬសេចក្តីប្រកាសទេ។ សូមពិនិត្យម្តងទៀត។",
      "暂无活动或公告，请稍后再来。"
    ),
    emptyAdmin: L(
      "No events yet. Open Manage Events to create one.",
      "មិនទាន់មានព្រឹត្តិការណ៍ទេ។ បើក Manage Events ដើម្បីបង្កើត។",
      "暂无活动。打开 Manage Events 创建。"
    ),
    viewDetails: L("View Details", "មើលព័ត៌មានលម្អិត", "查看详情"),
    viewAll: L("View all events", "មើលព្រឹត្តិការណ៍ទាំងអស់", "查看全部活动"),
    manage: L(
      "Manage Events in admin",
      "គ្រប់គ្រងព្រឹត្តិការណ៍ក្នុង Admin",
      "在管理后台管理活动"
    ),
    information: L("Information", "ព័ត៌មាន", "信息"),
    category: L("Category", "ប្រភេទ", "类别"),
    date: L("Date", "កាលបរិច្ឆេទ", "日期"),
    time: L("Time", "ម៉ោង", "时间"),
    start: L("Start", "ចាប់ផ្តើម", "开始"),
    end: L("End", "បញ្ចប់", "结束"),
    phone: L("Phone", "ទូរស័ព្ទ", "电话"),
    location: L("Location", "ទីតាំង", "地点"),
    email: L("E-mail", "អ៊ីមែល", "邮箱"),
    getInvolved: L("Get Involved", "ចូលរួម", "参与"),
    interestedEvent: L(
      "Interested in this event? Reach out and we will share the next steps.",
      "ចាប់អារម្មណ៍ព្រឹត្តិការណ៍នេះឬ? ទាក់ទងមក យើងនឹងចែករំលែកជំហានបន្ទាប់។",
      "对本次活动感兴趣？请联系我们，我们将告知下一步。"
    ),
    interestedAnnouncement: L(
      "Interested in this announcement? Reach out and we will share the next steps.",
      "ចាប់អារម្មណ៍សេចក្តីប្រកាសនេះឬ? ទាក់ទងមក យើងនឹងចែករំលែកជំហានបន្ទាប់។",
      "对这份公告感兴趣？请联系我们，我们将告知下一步。"
    ),
    contactUs: L("Contact Us", "ទាក់ទងយើង", "联系我们"),
    kindEvent: L("Event", "ព្រឹត្តិការណ៍", "活动"),
    kindAnnouncement: L("Announcement", "សេចក្តីប្រកាស", "公告"),
  },
  language: {
    select: L("Select language", "ជ្រើសរើសភាសា", "选择语言"),
    list: L("Languages", "ភាសា", "语言"),
  },
  pageHero: {
    contactTitle: L("Contact", "ទំនាក់ទំនង", "联系"),
    contactText: L(
      "Tell us about your goals. We will follow up with a clear next step.",
      "ប្រាប់យើងអំពីគោលដៅរបស់អ្នក។ យើងនឹងតាមដានជាមួយជំហានបន្ទាប់ច្បាស់លាស់។",
      "告诉我们您的目标。我们将跟进明确的下一步。"
    ),
    servicesTitle: L("Services", "សេវាកម្ម", "服务"),
    servicesText: L(
      "Practical consulting for investment, growth, and leadership capability.",
      "ការពិគ្រោះយោបល់ជាក់ស្តែងសម្រាប់ការវិនិយោគ កំណើន និងសមត្ថភាពភាពជាអ្នកដឹកនាំ។",
      "面向投资、增长与领导力的实用咨询。"
    ),
    insightsText: L(
      "Ideas, perspectives, and practical guidance for leaders and growing businesses.",
      "គំនិត ទស្សនៈ និងការណែនាំជាក់ស្តែងសម្រាប់អ្នកដឹកនាំ និងអាជីវកម្មកំពុងរីកចម្រើន។",
      "为领导者与成长型企业提供的观点、洞察与实用指导。"
    ),
    eventsText: L(
      "Workshops, announcements, and moments to connect with the VIKASA community.",
      "សិក្ខាសាលា សេចក្តីប្រកាស និងឱកាសភ្ជាប់ទំនាក់ទំនងជាមួយសហគមន៍ VIKASA។",
      "工作坊、公告，以及与 VIKASA 社区交流的机会。"
    ),
  },
} as const;

export function uiT(value: LocalizedString, locale: Locale): string {
  return (value[locale] || value.en || "").trim();
}
