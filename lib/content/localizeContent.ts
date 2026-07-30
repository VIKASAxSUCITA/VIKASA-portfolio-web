import type { LocalizedString } from "@/lib/i18n/locale";
import { asLocalized, fromTriple } from "@/lib/i18n/localized";
import type {
  AboutContent,
  HomeContent,
  InsightsContent,
} from "./types";
import { defaultAboutContent, defaultHomeContent } from "./defaults";

/** Prefer saved locale strings; fill empty km/zh from defaults when English matches. */
function mergeLocalized(
  value: unknown,
  fallback: LocalizedString
): LocalizedString {
  const saved = asLocalized(value, fallback.en);
  const enMatches =
    saved.en.trim().toLowerCase() === fallback.en.trim().toLowerCase();
  return {
    en: saved.en || fallback.en,
    km: saved.km || (enMatches ? fallback.km : ""),
    zh: saved.zh || (enMatches ? fallback.zh : ""),
  };
}

function migrateServiceCard(
  card: Record<string, unknown> | undefined,
  fallback: HomeContent["services"]["cards"][number]
): HomeContent["services"]["cards"][number] {
  if (!card) return fallback;

  // New shape: LocalizedString fields
  if (card.title && typeof card.title === "object") {
    return {
      title: asLocalized(card.title, fallback.title.en),
      description: asLocalized(card.description, fallback.description.en),
      items: Array.isArray(card.items) && card.items.length
        ? card.items.map((item, i) =>
            asLocalized(item, fallback.items[i]?.en ?? "")
          )
        : fallback.items,
    };
  }

  // Legacy shape: title + titleKm + titleZh
  const title = String(card.title ?? fallback.title.en);
  const description = String(card.description ?? fallback.description.en);
  const itemsEn = Array.isArray(card.items)
    ? (card.items as string[])
    : fallback.items.map((item) => item.en);
  const itemsKm = Array.isArray(card.itemsKm)
    ? (card.itemsKm as string[])
    : fallback.items.map((item) => item.km);
  const itemsZh = Array.isArray(card.itemsZh)
    ? (card.itemsZh as string[])
    : fallback.items.map((item) => item.zh);

  let items = itemsEn.map((en, i) =>
    fromTriple(en, itemsKm[i] ?? "", itemsZh[i] ?? "")
  );

  // Business Enhancement item cleanup
  if (title === "Business Enhancement") {
    items = items.map((item) =>
      item.en === "Market Intelligence & Advisory"
        ? { ...item, en: "Market Intelligence" }
        : item
    );
    if (!items.some((item) => item.en === "Feasibility Studies")) {
      const marketIndex = items.findIndex(
        (item) => item.en === "Market Intelligence"
      );
      const fs = fromTriple(
        "Feasibility Studies",
        "ការសិក្សាលទ្ធភាព",
        "可行性研究"
      );
      if (marketIndex >= 0) items.splice(marketIndex + 1, 0, fs);
      else items.unshift(fs);
    }
  }

  return {
    title: fromTriple(
      title,
      String(card.titleKm ?? fallback.title.km),
      String(card.titleZh ?? fallback.title.zh)
    ),
    description: fromTriple(
      description,
      String(card.descriptionKm ?? fallback.description.km),
      String(card.descriptionZh ?? fallback.description.zh)
    ),
    items,
  };
}

export function normalizeHomeContent(saved: Partial<HomeContent> | Record<string, unknown>): HomeContent {
  const d = defaultHomeContent;
  const raw = saved as Partial<HomeContent> & {
    hero?: Record<string, unknown>;
    about?: Record<string, unknown>;
    cta?: Record<string, unknown>;
    services?: { heading?: unknown; cards?: Array<Record<string, unknown>> };
    contact?: Record<string, unknown>;
  };

  const hero = (raw.hero ?? {}) as Record<string, unknown>;
  const about = (raw.about ?? {}) as Record<string, unknown>;
  const cta = (raw.cta ?? {}) as Record<string, unknown>;
  const contact = (raw.contact ?? {}) as Record<string, unknown>;
  const services = (raw.services ?? {}) as {
    heading?: unknown;
    cards?: Array<Record<string, unknown>>;
  };

  const aboutItemsRaw = Array.isArray(about.items)
    ? about.items
    : d.about.items;

  return {
    hero: {
      title: mergeLocalized(hero.title, d.hero.title),
      text: mergeLocalized(hero.text, d.hero.text),
      image: String(hero.image ?? d.hero.image),
      ctaLabel: mergeLocalized(hero.ctaLabel, d.hero.ctaLabel),
    },
    about: {
      title: mergeLocalized(about.title, d.about.title),
      text: mergeLocalized(about.text, d.about.text),
      image: String(about.image ?? d.about.image),
      items: [0, 1, 2].map((i) =>
        mergeLocalized(aboutItemsRaw[i], d.about.items[i])
      ) as HomeContent["about"]["items"],
      buttonLabel: mergeLocalized(about.buttonLabel, d.about.buttonLabel),
    },
    cta: {
      badge: mergeLocalized(cta.badge, d.cta.badge),
      title: mergeLocalized(cta.title, d.cta.title),
      text: mergeLocalized(cta.text, d.cta.text),
      buttonLabel: mergeLocalized(cta.buttonLabel, d.cta.buttonLabel),
    },
    services: {
      heading: asLocalized(services.heading, d.services.heading.en),
      cards: d.services.cards.map((fallback, index) =>
        migrateServiceCard(services.cards?.[index], fallback)
      ),
    },
    contact: {
      badge: asLocalized(contact.badge, d.contact.badge.en),
      title: asLocalized(contact.title, d.contact.title.en),
      text: asLocalized(contact.text, d.contact.text.en),
      email: String(contact.email ?? d.contact.email),
      whatsappNumber: String(contact.whatsappNumber ?? d.contact.whatsappNumber),
      whatsappLabel: asLocalized(
        contact.whatsappLabel,
        d.contact.whatsappLabel.en
      ),
      formTitle: asLocalized(contact.formTitle, d.contact.formTitle.en),
      formText: asLocalized(contact.formText, d.contact.formText.en),
      buttonLabel: asLocalized(contact.buttonLabel, d.contact.buttonLabel.en),
    },
  };
}

export function normalizeAboutContent(
  saved: Partial<AboutContent> | Record<string, unknown>
): AboutContent {
  const d = defaultAboutContent;
  const raw = saved as Partial<AboutContent> & {
    hero?: Record<string, unknown>;
    whatWeDo?: Record<string, unknown>;
    story?: Record<string, unknown>;
    vision?: Record<string, unknown>;
    mission?: Record<string, unknown>;
  };

  const hero = (raw.hero ?? {}) as Record<string, unknown>;
  const whatWeDo = (raw.whatWeDo ?? {}) as Record<string, unknown>;
  const story = (raw.story ?? {}) as Record<string, unknown>;
  const vision = (raw.vision ?? {}) as Record<string, unknown>;
  const mission = (raw.mission ?? {}) as Record<string, unknown>;
  const itemsRaw = Array.isArray(whatWeDo.items)
    ? whatWeDo.items
    : d.whatWeDo.items;

  return {
    hero: {
      title: asLocalized(hero.title, d.hero.title.en),
      text: asLocalized(hero.text, d.hero.text.en),
      image: String(hero.image ?? d.hero.image),
    },
    whatWeDo: {
      title: mergeLocalized(whatWeDo.title, d.whatWeDo.title),
      text: mergeLocalized(whatWeDo.text, d.whatWeDo.text),
      image: String(whatWeDo.image ?? d.whatWeDo.image),
      items: [0, 1, 2].map((i) =>
        mergeLocalized(itemsRaw[i], d.whatWeDo.items[i])
      ) as AboutContent["whatWeDo"]["items"],
      buttonLabel: mergeLocalized(
        whatWeDo.buttonLabel,
        d.whatWeDo.buttonLabel
      ),
    },
    story: {
      title: asLocalized(story.title, d.story.title.en),
      text: asLocalized(story.text, d.story.text.en),
    },
    vision: {
      title: asLocalized(vision.title, d.vision.title.en),
      text: asLocalized(vision.text, d.vision.text.en),
    },
    mission: {
      title: asLocalized(mission.title, d.mission.title.en),
      text: asLocalized(mission.text, d.mission.text.en),
    },
  };
}

export function normalizePageHeadings(
  saved: { heroTitle?: unknown; heading?: unknown },
  defaults: { heroTitle: LocalizedString; heading: LocalizedString }
): Pick<InsightsContent, "heroTitle" | "heading"> {
  return {
    heroTitle: asLocalized(saved.heroTitle, defaults.heroTitle.en),
    heading: asLocalized(saved.heading, defaults.heading.en),
  };
}
