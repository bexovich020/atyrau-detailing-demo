import type { Metadata, Viewport } from "next";
import { Oswald, Manrope } from "next/font/google";
import { SITE_URL, studio, studioDescription, studioKeywords } from "@/lib/studio";
import "./globals.css";

const display = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: `${studio.name} — автодетейлинг в ${studio.city}`,
    template: `%s | ${studio.name}`,
  },
  description: studioDescription,
  keywords: studioKeywords,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${studio.name} — автодетейлинг в ${studio.city}`,
    description: studioDescription,
    locale: "ru_KZ",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${studio.name} — детейлинг в ${studio.city}` }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"], title: `${studio.name} — автодетейлинг в ${studio.city}`, description: studioDescription },
};

export const viewport: Viewport = {
  themeColor: "#07080A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body className="overflow-x-hidden font-sans antialiased">
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}