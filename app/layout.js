import Script from "next/script";
import GlobalHeader from "./components/GlobalHeader";

export const metadata = {
  metadataBase: new URL("https://vikasa.example.com"),
  title: {
    default: "VIKASA",
    template: "%s | VIKASA",
  },
  description:
    "VIKASA — creative business consulting for corporate entities and professional businesses.",
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
      "Creative business consulting for corporate entities and professional businesses.",
  },
};

export const viewport = {
  themeColor: "#5e3123",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
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
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/vendor.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/assets/css/vikasa-brand.css" />
      </head>
      <body suppressHydrationWarning>
        <GlobalHeader />
        <div className="page-content">{children}</div>

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
