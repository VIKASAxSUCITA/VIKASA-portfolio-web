"use client";

import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "@/app/components/i18n/LocaleSwitcher";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import SiteSearch from "@/app/components/home/SiteSearch";
import type { Locale } from "@/lib/i18n/locale";
import { ui } from "@/lib/i18n/ui";

const navLinks = [
  { href: "/", labels: ui.nav.home },
  { href: "/about", labels: ui.nav.about },
  { href: "/services", labels: ui.nav.services },
  { href: "/insights", labels: ui.nav.insights },
  { href: "/events", labels: ui.nav.events },
  { href: "/contact", labels: ui.nav.contact },
] as const;

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "");
  if (!id) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function hashFromHref(href: string) {
  if (href === "/" || href === "#") return "";
  if (href.includes("#")) return `#${href.split("#")[1]}`;
  return "";
}

function MenuIcon() {
  return (
    <svg
      width={52}
      height={52}
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="26" cy="26" r="25.5" fill="white" stroke="currentColor" />
      <path
        d="M32.5 18.2857C32.5 17.5757 31.9179 17 31.2 17H14.3C13.5821 17 13 17.5757 13 18.2857C13 18.9958 13.5821 19.5714 14.3 19.5714H31.2C31.9179 19.5714 32.5 18.9957 32.5 18.2857ZM14.3 24.7143H37.7C38.4179 24.7143 39 25.29 39 26C39 26.7101 38.4179 27.2857 37.7 27.2857H14.3C13.5821 27.2857 13 26.7101 13 26C13 25.29 13.5821 24.7143 14.3 24.7143ZM14.3 32.4286H26C26.7179 32.4286 27.3 33.0042 27.3 33.7143C27.3 34.4243 26.7179 35 26 35H14.3C13.5821 35 13 34.4243 13 33.7143C13 33.0042 13.5821 32.4286 14.3 32.4286Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  links,
  locale,
  pathname,
  onNavigate,
}: {
  links: readonly { href: string; labels: Record<Locale, string> }[];
  locale: Locale;
  pathname: string;
  onNavigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <ul className="header-menu list-unstyled">
      {links.map(({ href, labels }) => {
        const active = isNavActive(pathname, href);
        return (
          <li key={href} className={`nav-item${active ? " is-active" : ""}`}>
            <a
              className={`menu-link menu-link-main${active ? " is-active" : ""}`}
              href={href}
              aria-current={active ? "page" : undefined}
              onClick={(event) => onNavigate(event, href)}
            >
              {labels[locale]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

type HomeHeaderProps = {
  previewMode?: boolean;
};

export default function HomeHeader({ previewMode = false }: HomeHeaderProps) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = navLinks;
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isServices =
    pathname === "/services" || pathname.startsWith("/services/");
  const isInsights =
    pathname === "/insights" || pathname.startsWith("/insights/");
  const isEvents =
    pathname === "/events" || pathname.startsWith("/events/");
  const overHero =
    (isHome || isAbout || isServices || isInsights || isEvents) &&
    !scrolled &&
    !previewMode;
  const logoSrc = overHero
    ? "/assets/img/vikasa/white_log_vikasa.jpg"
    : "/assets/img/vikasa/vikasa_logo.png";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 48);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("scroll-lock", menuOpen);
    return () => {
      document.body.classList.remove("scroll-lock");
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogoClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!previewMode) return;
    event.preventDefault();
    closeMenu();
    scrollToHash("");
  }

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    closeMenu();

    if (previewMode) {
      event.preventDefault();
      const previewHash: Record<string, string> = {
        "/": "",
        "/about": "#about",
        "/services": "#services",
        "/insights": "#insights",
        "/events": "#events",
        "/contact": "#contact",
      };
      scrollToHash(previewHash[href] ?? hashFromHref(href));
      return;
    }

    if (!href.startsWith("/#") && href !== "/") return;

    const isHomeHash =
      href === "/" || href.startsWith("/#") || href.startsWith("#");
    if (!isHomeHash) return;

    const hash = hashFromHref(href);
    const onHome = window.location.pathname === "/";

    if (onHome) {
      event.preventDefault();
      if (hash) {
        history.pushState(null, "", hash);
        scrollToHash(hash);
      } else {
        history.pushState(null, "", "/");
        scrollToHash("");
      }
    }
  }

  const mobileDrawer =
    mounted &&
    createPortal(
      <div
        className={`vikasa-mobile-drawer${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="vikasa-mobile-drawer-overlay"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <nav
          className="vikasa-mobile-drawer-panel"
          aria-label="Mobile"
          id="mobile-drawer-nav"
        >
          <div className="vikasa-mobile-drawer-head">
            <a
              className="header-logo"
              href="/"
              aria-label="VIKASA"
              onClick={handleLogoClick}
            >
              <img
                src="/assets/img/vikasa/vikasa_logo.png"
                alt="VIKASA"
                width={146}
                height={54}
              />
            </a>
            <button
              type="button"
              className="header-menu-toggle vikasa-mobile-drawer-close"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <CloseIcon />
            </button>
          </div>
          <NavLinks
            links={links}
            locale={locale}
            pathname={pathname}
            onNavigate={handleNavClick}
          />
        </nav>
      </div>,
      document.body
    );

  return (
    <>
      <sticky-header data-sticky-type="always">
        <header
          className={`header-1 header-floating${
            overHero ? " is-over-hero" : ""
          }${scrolled ? " is-scrolled" : ""}`}
        >
          <div className="container-fluid">
            <div className="header-grid">
              <a
                className="header-logo"
                href="/"
                aria-label="VIKASA"
                onClick={handleLogoClick}
              >
                <img src={logoSrc} alt="VIKASA" width={146} height={54} />
              </a>

              <nav
                className="header-nav drawer-menu d-none d-lg-block"
                aria-label="Main"
              >
                <NavLinks
                  links={links}
                  locale={locale}
                  pathname={pathname}
                  onNavigate={handleNavClick}
                />
              </nav>

              <div className="header-actions d-flex align-items-center gap-2">
                {!previewMode ? (
                  <>
                    <SiteSearch />
                    <LocaleSwitcher />
                  </>
                ) : null}
                <button
                  type="button"
                  className="svg-wrapper menu-open d-lg-none header-menu-toggle"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-drawer-nav"
                  onClick={() => setMenuOpen(true)}
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </header>
      </sticky-header>
      {mobileDrawer}
    </>
  );
}
