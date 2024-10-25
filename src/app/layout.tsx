import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const APP_NAME = "SpellIt";
const APP_DEFAULT_TITLE = "SpellIt";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Let people easily spell words";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const EyeTracker = dynamic(
    () => import("@/components/EyeTracker").then((mod) => mod.default),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="icon-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="icon-512x512.png"
          type="image/png"
          sizes="512x512"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased`}
      >
        <EyeTracker>{children}</EyeTracker>
      </body>
    </html>
  );
}
