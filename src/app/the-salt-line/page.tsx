import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SaltLineClient } from "./SaltLineClient";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/the-salt-line` },
  title: "The Salt Line Case Study",
  description:
    "See how Virtual Velocity approached organic content and event marketing for The Salt Line, a restaurant case study in Islamabad. Review the campaign story.",
  keywords: [
    "Hospitality Marketing Agency",
    "Hotel Marketing Agency",
    "Hospitality Digital Marketing",
    "Restaurant Marketing Agency",
    "Restaurant Digital Marketing",
    "Restaurant Social Media Marketing",
    "Restaurant Advertising Agency",
    "Restaurant Marketing Services",
    "Restaurant SEO Services",
    "Restaurant Lead Generation",
    "The Salt Line Case Study",
    "Organic Content Strategy",
    "F9 Park Islamabad Restaurant",
    "Virtual Velocity Case Studies",
  ],
  openGraph: {
    url: `${SITE_URL}/the-salt-line`,
    title: "The Salt Line — Organic Growth & Community Case Study | Virtual Velocity",
    description:
      "See how Virtual Velocity approached organic content and event marketing for The Salt Line, a restaurant case study in Islamabad. Review the campaign story.",
    siteName: "Virtual Velocity Digital Agency",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "The Salt Line case study by Virtual Velocity" }],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Salt Line Case Study | Virtual Velocity",
    description:
      "See how Virtual Velocity approached organic content and event marketing for The Salt Line, a restaurant case study in Islamabad. Review the campaign story.",
    images: [{ url: SOCIAL_IMAGE, alt: "The Salt Line case study by Virtual Velocity" }],
  },
};

export default function SaltLinePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "The Salt Line", path: "/the-salt-line" },
        ]}
      />
      <SaltLineClient />
    </>
  );
}
