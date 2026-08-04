"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { FooterContent } from "@/lib/content/types";
import { ui, uiT } from "@/lib/i18n/ui";

const QUICK_LINKS = [
  { href: "/", label: ui.nav.home },
  { href: "/about", label: ui.nav.about },
  { href: "/services", label: ui.nav.services },
  { href: "/insights", label: ui.nav.insights },
  { href: "/events", label: ui.nav.events },
  { href: "/contact", label: ui.nav.contact },
] as const;

const SERVICE_LINKS = [
  { href: "/services/investment", label: ui.services.investment },
  { href: "/services/business-enhancement", label: ui.services.enhancement },
  { href: "/services/business-academy", label: ui.services.academy },
] as const;

type HomeFooterProps = {
  content: FooterContent;
  showUtilities?: boolean;
};

function telegramHref(handle: string): string {
  const cleaned = handle.replace(/^@/, "").trim();
  return cleaned ? `https://t.me/${cleaned}` : "https://t.me/";
}

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export default function HomeFooter({
  content,
  showUtilities = true,
}: HomeFooterProps) {
  const { locale } = useLocale();
  const telegram = content.contact.telegram || "@vikasacontact";
  const phone = content.contact.phone || "015 96 94 96";
  const email = content.contact.email || "vikasacontact@gmail.com";

  return (
    <>
      <footer>
        <div
          className="footer-main bg-contain"
          style={{
            backgroundImage: "url(/assets/img/footer/footer-bg-large.jpg)",
          }}
        >
          <div className="footer-top">
            <div className="container">
              <div className="row footer-custom-row">
                <div className="col-12 col-md-6">
                  <div className="footer-widget footer-widget-brand">
                    <a className="footer-logo" href="/" aria-label="VIKASA">
                      <img
                        src="/assets/img/vikasa/vikasa_logo.png"
                        alt="VIKASA"
                        width={220}
                        height={86}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="footer-widget footer-widget-menu">
                    <div className="widget-heading heading text-22">
                      {uiT(ui.footer.quickLink, locale)}
                    </div>
                    <ul className="footer-menu list-unstyled">
                      {QUICK_LINKS.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} className="text text-16 link">
                            {uiT(link.label, locale)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="footer-widget footer-widget-menu">
                    <div className="widget-heading heading text-22">
                      {uiT(ui.footer.services, locale)}
                    </div>
                    <ul className="footer-menu list-unstyled">
                      {SERVICE_LINKS.map((link) => (
                        <li key={link.href}>
                          <a href={link.href} className="text text-16 link">
                            {uiT(link.label, locale)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="footer-widget footer-widget-contact">
                    <div className="widget-heading heading text-22">
                      {uiT(ui.footer.contactInfo, locale)}
                    </div>
                    <ul className="footer-menu footer-contact-list list-unstyled">
                      <li>
                        <span className="footer-contact-label text text-14">
                          {uiT(ui.footer.telegram, locale)}
                        </span>
                        <a
                          href={telegramHref(telegram)}
                          className="text text-16 link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {telegram.startsWith("@") ? telegram : `@${telegram}`}
                        </a>
                      </li>
                      <li>
                        <span className="footer-contact-label text text-14">
                          {uiT(ui.footer.phone, locale)}
                        </span>
                        <a
                          href={phoneHref(phone)}
                          className="text text-16 link"
                        >
                          {phone}
                        </a>
                      </li>
                      <li>
                        <span className="footer-contact-label text text-14">
                          {uiT(ui.footer.email, locale)}
                        </span>
                        <a
                          href={`mailto:${email}`}
                          className="text text-16 link"
                        >
                          {email}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row footer-bottom-row">
                <div className="col-12 col-md-6 col-lg-6">
                  <div className="footer-copyright text text-16">
                    {uiT(ui.footer.copyright, locale)}
                    <span className="current-year"></span> {content.copyright}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showUtilities ? (
        <>
          <scroll-top>
            <div className="scroll-to-top">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 15.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            </div>
          </scroll-top>
        </>
      ) : null}
    </>
  );
}
