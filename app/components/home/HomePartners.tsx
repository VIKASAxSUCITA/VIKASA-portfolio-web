import LogoMarquee from "@/app/components/home/LogoMarquee";
import type { LogoItem } from "@/lib/content/logos";
import { ui } from "@/lib/i18n/ui";

type HomePartnersProps = {
  partners: LogoItem[];
  clients: LogoItem[];
};

/** Partners & clients marquees — same CMS data as About (`/admin/logos`). */
export default function HomePartners({
  partners,
  clients,
}: HomePartnersProps) {
  if (!partners.length && !clients.length) return null;

  return (
    <>
      {partners.length ? (
        <LogoMarquee
          id="home-partners"
          title={ui.partners.title}
          subtitle={ui.partners.subtitle}
          items={partners}
          direction="forward"
        />
      ) : null}
      {clients.length ? (
        <LogoMarquee
          id="home-clients"
          title={ui.clients.title}
          subtitle={ui.clients.subtitle}
          items={clients}
          direction="reverse"
        />
      ) : null}
    </>
  );
}
