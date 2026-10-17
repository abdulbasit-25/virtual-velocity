import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  title: "Contact",
  description: "Contact Virtual Velocity about digital marketing, BPO, hospitality, branding, SEO, Meta Ads, and Google Ads. Find published contact details and inquiry options.",
  keywords: [
    "Digital Marketing Agency Pakistan",
    "Digital Marketing Agency Islamabad",
    "Digital Marketing Company",
    "BPO Services Pakistan",
    "Customer Support Outsourcing",
    "Hospitality Marketing Agency",
    "Restaurant Marketing Agency",
    "Performance Marketing Agency",
    "Meta Ads Agency",
    "Google Ads Agency",
    "Lead Generation Agency",
    "Virtual Velocity Contact",
  ],
  openGraph: {
    url: `${SITE_URL}/contact`,
    title: "Contact & Strategy Session | Virtual Velocity Agency Pakistan",
    description: "Contact Virtual Velocity about digital marketing, BPO, hospitality, branding, SEO, Meta Ads, and Google Ads. Find published contact details and inquiry options.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Contact Virtual Velocity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Virtual Velocity",
    description: "Contact Virtual Velocity about digital marketing, BPO, hospitality, branding, SEO, Meta Ads, and Google Ads services.",
    images: [{ url: SOCIAL_IMAGE, alt: "Contact Virtual Velocity" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <ContactClient />
    </>
  );
}