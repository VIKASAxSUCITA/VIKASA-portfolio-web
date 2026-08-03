import type { LocalizedString } from "@/lib/i18n/locale";
import { fromTriple, mergeLocalized } from "@/lib/i18n/localized";
import type {
  AboutContent,
  HomeContent,
  InsightsContent,
} from "./types";
import { defaultAboutContent, defaultHomeContent } from "./defaults";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "./logos";

function normalizeLogoList(
  value: unknown,
  fallback: AboutContent["partners"]
): AboutContent["partners"] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback.map((item) => ({ ...item }));
  }
  return value
    .map((item, index) => {
      const row = (item ?? {}) as Record<string, unknown>;
      const logo = String(row.logo ?? "").trim();
      if (!logo) return null;
      return {
        id: String(row.id ?? `logo_${index + 1}`),
        name: String(row.name ?? `Logo ${index + 1}`),
        logo,
      };
    })
    .filter(Boolean) as AboutContent["partners"];
}

function migrateServiceCard(
  card: Record<string, unknown> | undefined,
  fallback: HomeContent["services"]["cards"][number]
): HomeContent["services"]["cards"][number] {
  if (!card) return fallback;

  // New shape: LocalizedString fields
  if (card.title && typeof card.title === "object") {
    return {
      title: mergeLocalized(card.title, fallback.title),
      description: mergeLocalized(card.description, fallback.description),
      items: Array.isArray(card.items) && card.items.length
        ? card.items.map((item, i) =>
            mergeLocalized(item, fallback.items[i] ?? { en: "", km: "", zh: "" })
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
      heading: mergeLocalized(services.heading, d.services.heading),
      cards: d.services.cards.map((fallback, index) =>
        migrateServiceCard(services.cards?.[index], fallback)
      ),
    },
    contact: {
      badge: mergeLocalized(contact.badge, d.contact.badge),
      title: mergeLocalized(contact.title, d.contact.title),
      text: mergeLocalized(contact.text, d.contact.text),
      email: String(contact.email ?? d.contact.email),
      whatsappNumber: String(contact.whatsappNumber ?? d.contact.whatsappNumber),
      whatsappLabel: mergeLocalized(
        contact.whatsappLabel,
        d.contact.whatsappLabel
      ),
      formTitle: mergeLocalized(contact.formTitle, d.contact.formTitle),
      formText: mergeLocalized(contact.formText, d.contact.formText),
      buttonLabel: mergeLocalized(contact.buttonLabel, d.contact.buttonLabel),
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
      title: mergeLocalized(hero.title, d.hero.title),
      text: mergeLocalized(hero.text, d.hero.text),
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
      title: mergeLocalized(story.title, d.story.title),
      text: mergeLocalized(story.text, d.story.text),
    },
    vision: {
      title: mergeLocalized(vision.title, d.vision.title),
      text: mergeLocalized(vision.text, d.vision.text),
    },
    mission: {
      title: mergeLocalized(mission.title, d.mission.title),
      text: mergeLocalized(mission.text, d.mission.text),
    },
    partners: normalizeLogoList(
      (raw as { partners?: unknown }).partners,
      d.partners.length ? d.partners : PARTNER_LOGOS.map((item) => ({
        id: item.id,
        name: item.name,
        logo: item.logo || "",
      }))
    ),
    clients: normalizeLogoList(
      (raw as { clients?: unknown }).clients,
      d.clients.length ? d.clients : CLIENT_LOGOS.map((item) => ({
        id: item.id,
        name: item.name,
        logo: item.logo || "",
      }))
    ),
  };
}

export function normalizePageHeadings(
  saved: { heroTitle?: unknown; heading?: unknown },
  defaults: { heroTitle: LocalizedString; heading: LocalizedString }
): Pick<InsightsContent, "heroTitle" | "heading"> {
  return {
    heroTitle: mergeLocalized(saved.heroTitle, defaults.heroTitle),
    heading: mergeLocalized(saved.heading, defaults.heading),
  };
}
