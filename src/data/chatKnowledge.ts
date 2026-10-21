export type ChatService = {
  title: string;
  href: string;
  description: string;
};

// Keep answers grounded in published site content; extend this list when the site is updated.
export const CHAT_KNOWLEDGE = {
  overview:
    "Virtual Velocity is a creative house for strategy, creativity, technology, and digital growth, with offices in the United States, Islamabad, Pakistan, and Birmingham, UK.",
  services: [
    {
      title: "BRANDING & VISUAL IDENTITY",
      href: "/services#branding",
      description:
        "Brand identity, logo design, visual guidelines, and brand positioning.",
    },
    {
      title: "DIGITAL MARKETING SERVICES",
      href: "/services#digital-marketing",
      description:
        "Multi-channel digital marketing and social media campaign management.",
    },
    {
      title: "BPO & OUTSOURCING SERVICES",
      href: "/services#bpo-outsourcing",
      description:
        "Customer service and support outsourcing, call center outsourcing, and dedicated remote teams.",
    },
    {
      title: "HOSPITALITY & HOTEL MARKETING",
      href: "/services#hospitality-marketing",
      description:
        "Hotel marketing, social media, advertising, SEO, and direct booking optimization.",
    },
    {
      title: "RESTAURANT MARKETING & LEAD GENERATION",
      href: "/services#restaurant-marketing",
      description:
        "Restaurant digital marketing, social media, advertising, SEO, and lead generation.",
    },
    {
      title: "PERFORMANCE MARKETING & PAID ADS",
      href: "/services#performance-marketing",
      description:
        "Google Ads, Meta Ads, paid advertising, and lead generation campaigns.",
    },
    {
      title: "SEARCH ENGINE OPTIMIZATION (SEO)",
      href: "/services#seo",
      description:
        "Technical SEO audits, keyword research, schema, and content strategy.",
    },
    {
      title: "SHOPIFY STORE & E-COMMERCE DEVELOPMENT",
      href: "/services#shopify-store",
      description:
        "Shopify store design, development, payment setup, and optimization.",
    },
    {
      title: "INFLUENCER MARKETING & PROPRIETARY MEDIA",
      href: "/services#influencer-marketing",
      description:
        "Influencer partnerships and activations across Virtual Velocity's owned media channels.",
    },
    {
      title: "SOFTWARE & WEB APP DEVELOPMENT",
      href: "/services#software-development",
      description:
        "Custom web applications, Next.js development, and cloud software.",
    },
  ] satisfies ChatService[],
  additionalCapabilities: [
    "Creative direction",
    "Photography",
    "Videography",
    "Conversion rate optimization",
    "AI-driven growth analytics",
  ],
  caseStudies: [
    {
      name: "The Salt Line",
      href: "/the-salt-line",
      description:
        "Hospitality, organic social growth, and community-building work.",
    },
    {
      name: "Cresto Pizza",
      href: "/branding",
      description: "Brand identity and packaging design work.",
    },
  ],
  media: {
    channels: [
      "Rawalpindians",
      "Islamabad Insider",
      "Sirf Chai",
      "Lahorians",
      "Life of Islamabad",
      "Islamabad Reels",
      "SnapSeedPak",
    ],
    page: "/owned-media",
    kit: "/Virtual%20Velocity%20Profile%20(1).pdf",
  },
  contacts: {
    newBusinessEmail: "adddemail@gmail.com",
    generalEmail: "adddemail@gmail.com",
    phones: [
      {
        label: "United States",
        number: "+1 (417) 897-5749",
        href: "tel:+14178975749",
      },
      {
        label: "Islamabad, Pakistan",
        number: "+92 332 529 6693",
        href: "tel:+923325296693",
      },
      {
        label: "Birmingham, UK",
        number: "+44 7756 557500",
        href: "tel:+447756557500",
      },
    ],
  },
  hubs: [
    { name: "United States", timezone: "America/New_York" },
    { name: "United Kingdom", timezone: "Europe/London" },
    { name: "United Arab Emirates", timezone: "Asia/Dubai" },
    { name: "Pakistan", timezone: "Asia/Karachi" },
  ],
  process: {
    audit: "Visitors can start a Free Growth Audit through the contact form.",
    form: "The campaign brief is a two-step form: contact details first, then project information.",
    response: "The contact page promises a reply within 12 hours.",
    nda: "The contact page says an NDA is guaranteed.",
  },
  faq: [
    {
      question: "What services does Virtual Velocity offer?",
      answer:
        "Virtual Velocity offers digital and performance marketing, technical SEO, social media, BPO and outsourcing, hospitality and restaurant marketing, and brand strategy.",
    },
    {
      question: "Do you provide BPO and call center outsourcing?",
      answer:
        "Yes. The site lists BPO, customer service and support outsourcing, call center outsourcing, and dedicated remote teams.",
    },
    {
      question: "How do you help hospitality and hotels?",
      answer:
        "The hospitality services include hotel marketing, social media, advertising, SEO, and direct booking optimization.",
    },
    {
      question: "What restaurant marketing do you offer?",
      answer:
        "Restaurant services include digital and social marketing, food brand reels, advertising, SEO for Google Maps, and lead generation.",
    },
    {
      question: "What does performance marketing include?",
      answer:
        "The site lists paid advertising, Meta Ads, Google Ads, and lead generation services. Results vary and are not guaranteed.",
    },
  ],
} as const;
