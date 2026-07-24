import type { ReactNode } from "react";
import type { HomeContent } from "@/lib/content/types";
import { EditableField } from "../admin/EditableField";
import EditableText from "../admin/EditableText";

const SERVICE_DELAYS = [null, 200, 300] as const;

type Services = HomeContent["services"];

type HomeServicesProps = {
  content: Services;
  edit?: { onChange: (updater: (prev: Services) => Services) => void };
};

function PlusIcon() {
  return (
    <svg
      className="service-item-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

const SERVICE_ICONS = [
  {
    src: "/assets/img/vikasa/Investment.jpg",
    alt: "Investment",
  },
  {
    src: "/assets/img/vikasa/Business_Enhancement.jpg",
    alt: "Business Enhancement",
  },
  {
    src: "/assets/img/vikasa/Business_Academy.jpg",
    alt: "Business Academy",
  },
] as const;

function ServiceIcon({ index }: { index: number }) {
  const icon = SERVICE_ICONS[index];
  if (!icon) return null;
  return (
    <img
      src={icon.src}
      alt={icon.alt}
      width={40}
      height={40}
      className="service-card-icon-img"
      loading="lazy"
    />
  );
}

export default function HomeServices({ content, edit }: HomeServicesProps) {
  const headingEdit = edit
    ? {
        onChange: (heading: string) =>
          edit.onChange((prev) => ({ ...prev, heading })),
      }
    : undefined;

  const updateCard = (
    index: number,
    patch: Partial<Services["cards"][number]>
  ) =>
    edit?.onChange((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], ...patch };
      return { ...prev, cards };
    });

  return (
    <div id="services" className="multicolumn multicolumn-page section-padding">
      <div className="container">
        <div className="multicolumn-header section-headings">
          <EditableField
            as="h2"
            className="heading text-50"
            value={content.heading}
            aos="fade-up"
            label="Services heading"
            edit={headingEdit}
          />
        </div>
        <div className="multicolumn-inner section-content">
          <div className="row product-grid">
            {content.cards.map((service, index) => {
              const delay = SERVICE_DELAYS[index] ?? null;
              const cardInner: ReactNode = (
                <>
                  <div className="card-icon">
                    <ServiceIcon index={index} />
                  </div>
                  <EditableField
                    as="h2"
                    className="heading text-28"
                    value={service.title}
                    label="Service title"
                    edit={
                      edit
                        ? { onChange: (title) => updateCard(index, { title }) }
                        : undefined
                    }
                  />
                  <EditableField
                    className="text text-16"
                    value={service.description}
                    multiline
                    label="Service description"
                    edit={
                      edit
                        ? {
                            onChange: (description) =>
                              updateCard(index, { description }),
                          }
                        : undefined
                    }
                  />
                  <ul className="text-lists list-unstyled">
                    {service.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-item text text-16 fw-500"
                      >
                        <PlusIcon />
                        {edit ? (
                          <EditableText
                            value={item}
                            label={`Service point ${itemIndex + 1}`}
                            onChange={(value) => {
                              const items = [...service.items];
                              items[itemIndex] = value;
                              updateCard(index, { items });
                            }}
                          />
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              );

              return (
                <div
                  key={index}
                  className="col-xl-4 col-md-6 col-12"
                  data-aos="fade-up"
                  {...(delay ? { "data-aos-delay": String(delay) } : {})}
                >
                  {edit ? (
                    <div className="multicolumn-card">{cardInner}</div>
                  ) : (
                    <a
                      className="multicolumn-card"
                      href="/#contact"
                      aria-label={service.title}
                    >
                      {cardInner}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
