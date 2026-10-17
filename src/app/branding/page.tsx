import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BrandingClient } from "./BrandingClient";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/branding` },
  title: "Cresto Pizza Branding Case Study",
  description:
    "See how Virtual Velocity developed brand identity, custom packaging, 3D signage, and social campaigns for Cresto Pizza in this restaurant branding case study.",
  keywords: [
    "Cresto Pizza Branding",
    "Brand Identity Design",
    "Packaging Design Case Study",
    "Food and Beverage Branding",
    "Architectural Signage",
    "Virtual Velocity Portfolio",
    "Restaurant Brand Strategy",
    "Social Media Direction",
  ],
  openGraph: {
    url: `${SITE_URL}/branding`,
    title: "Cresto Pizza Brand Identity & Packaging | Virtual Velocity Agency",
    description:
      "See how Virtual Velocity developed brand identity, custom packaging, 3D signage, and social campaigns for Cresto Pizza in this restaurant branding case study.",
    siteName: "Virtual Velocity Digital Agency",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Cresto Pizza branding case study by Virtual Velocity" }],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cresto Pizza Brand Identity Case Study | Virtual Velocity",
    description:
      "See how Virtual Velocity developed brand identity, custom packaging, 3D signage, and social campaigns for Cresto Pizza in this restaurant branding case study.",
    images: [{ url: SOCIAL_IMAGE, alt: "Cresto Pizza branding case study by Virtual Velocity" }],
  },
};

export default function BrandingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Branding", path: "/branding" },
        ]}
      />
      <BrandingClient />
    </>
  );
}
