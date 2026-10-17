import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { OwnedMediaClient } from "./OwnedMediaClient";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/owned-media` },
  title: "Owned Media Network",
  description:
    "Explore Virtual Velocity's media network and read about Rawalpindians, Islamabad Insider, and Sirf Chai, the channels described on its owned-media page.",
  keywords: [
    "Rawalpindians Community Pakistan",
    "Islamabad Insider Media Network",
    "Sirf Chai Digital Platform",
    "Digital Media Network Pakistan",
    "Social Media Communities Islamabad Rawalpindi",
    "Viral Media Channels Pakistan"
  ],
  openGraph: {
    url: `${SITE_URL}/owned-media`,
    title: "Proprietary Media Network Pakistan | Virtual Velocity",
    description:
      "Explore Virtual Velocity's media network and read about Rawalpindians, Islamabad Insider, and Sirf Chai, the channels described on its owned-media page.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Virtual Velocity owned media network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owned Media Network | Virtual Velocity",
    description:
      "Explore Virtual Velocity's media network and read about Rawalpindians, Islamabad Insider, and Sirf Chai, the channels described on its owned-media page.",
    images: [{ url: SOCIAL_IMAGE, alt: "Virtual Velocity owned media network" }],
  },
};

export default function OwnedMediaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Owned Media", path: "/owned-media" },
        ]}
      />
      <OwnedMediaClient />
    </>
  );
}
