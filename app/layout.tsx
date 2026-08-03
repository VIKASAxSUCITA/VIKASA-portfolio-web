import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import SiteChrome from "./components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://vikasa.example.com"),
  title: {
    default: "VIKASA",
    template: "%s | VIKASA",
  },
  description:
    "VIKASA — business strategy, investment, and corporate advisory for leaders and enterprises.",
  icons: {
    icon: [
      {
        url: "/assets/img/vikasa/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/assets/img/vikasa/favicon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/assets/img/vikasa/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "VIKASA",
    title: "VIKASA",
    description:
      "Business strategy, investment, and corporate advisory for leaders and enterprises.",
  },
};

export const viewport: Viewport = {
  themeColor: "#5E3023",
  width: "device-width",
  initialScale: 1,
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/vendor.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/vikasa-brand.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/vikasa-consulting.css" />
      </head>
      <body suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>

        <Script src="/assets/js/vendor.js" strategy="beforeInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        <style>{`
          .page-content sticky-header,
          .page-content .theme-drawer.drawer-additional {
            display: none !important;
          }
        `}</style>
      </body>
    </html>
  );
}
