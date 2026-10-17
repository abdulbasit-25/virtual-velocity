import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  title: "About",
  description: "Discover Virtual Velocity, its founder Tauseef Alam, and the agency's digital marketing and media work. Explore its story, services, and owned media channels.",
  keywords: [
    "Digital Marketing Agency Pakistan",
    "Digital Marketing Agency Islamabad",
    "Digital Marketing Company",
    "BPO Services Pakistan",
    "Outsourcing Company Pakistan",
    "Hospitality Marketing Agency",
    "Restaurant Marketing Agency",
    "Performance Marketing Agency",
    "Tauseef Alam Virtual Velocity",
    "Rawalpindians Founder Tauseef Alam",
    "Islamabad Insider Media Agency",
  ],
  openGraph: {
    url: `${SITE_URL}/about`,
    title: "About Virtual Velocity | Digital Marketing Agency Pakistan & Global Hubs",
    description: "Discover Virtual Velocity, its founder Tauseef Alam, and the agency's digital marketing and media work. Explore its story, services, and owned media channels.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "About Virtual Velocity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Virtual Velocity",
    description: "Learn about Virtual Velocity and its founder, Tauseef Alam.",
    images: [{ url: SOCIAL_IMAGE, alt: "About Virtual Velocity" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <AboutClient />
    </>
  );
}