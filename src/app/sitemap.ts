import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/agencyData";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/branding",
    "/the-salt-line",
    "/owned-media",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/terms-of-use",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : route === "/services" || route === "/branding" ? 0.9 : 0.8,
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
