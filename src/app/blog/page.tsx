import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/blog` },
  title: "Growth Journal",
  description: "Read Virtual Velocity articles on digital marketing, technical SEO, e-commerce conversion, and brand storytelling, with ideas for online business growth.",
  openGraph: {
    url: `${SITE_URL}/blog`,
    title: "Digital Journal & Growth Articles | Virtual Velocity",
    description: "Read Virtual Velocity articles on digital marketing, technical SEO, e-commerce conversion, and brand storytelling, with ideas for online business growth.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Virtual Velocity Digital Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Journal | Virtual Velocity",
    description: "Insights on digital marketing, SEO, paid advertising, and brand growth.",
    images: [{ url: SOCIAL_IMAGE, alt: "Virtual Velocity Digital Journal" }],
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <BlogClient />
    </>
  );
}
