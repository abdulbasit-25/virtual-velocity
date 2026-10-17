const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.thevirtualvelocity.com";

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "");
export const SOCIAL_IMAGE = "/og-image.png";
