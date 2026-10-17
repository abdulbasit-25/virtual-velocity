import type { Metadata, Viewport } from "next";
import { Roboto_Flex, Lora } from "next/font/google";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import "./globals.css";

// Roboto Flex (variable font) for modern punchy headlines, UI, navigation, and body copy
const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// Lora (variable font) for contemporary, elegant editorial quotes, testimonials, and narrative accents
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#00A29F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  title: {
    default: "Virtual Velocity | Digital Marketing & BPO Agency",
    template: "%s | Virtual Velocity",
  },
  description:
    "Virtual Velocity is Pakistan's premier Digital Marketing Agency & BPO service provider in Islamabad. Expert Meta Ads, Google Ads, SEO & BPO solutions.",
  keywords: [
    // Digital Marketing Vertical
    "Digital Marketing Agency",
    "Digital Marketing Company",
    "Digital Marketing Services",
    "Digital Marketing Agency Pakistan",
    "Digital Marketing Agency Islamabad",
    // BPO & Outsourcing Vertical
    "BPO Services",
    "BPO Services Pakistan",
    "Outsourcing Company Pakistan",
    "Outsourcing Services Pakistan",
    "Business Outsourcing Services",
    "Customer Service Outsourcing",
    "Customer Support Outsourcing",
    "Call Center Outsourcing Pakistan",
    // Hospitality Marketing Vertical
    "Hospitality Marketing Agency",
    "Hotel Marketing Agency",
    "Hotel Social Media Marketing",
    "Hospitality Digital Marketing",
    "Hotel Advertising Agency",
    "Hotel SEO Services",
    // Restaurant Marketing Vertical
    "Restaurant Marketing Agency",
    "Restaurant Digital Marketing",
    "Restaurant Social Media Marketing",
    "Restaurant Advertising Agency",
    "Restaurant Marketing Services",
    "Restaurant SEO Services",
    "Restaurant Lead Generation",
    // Performance Marketing Vertical
    "Performance Marketing Agency",
    "Performance Marketing Services",
    "Paid Advertising Agency",
    "Meta Ads Agency",
    "Google Ads Agency",
    "Lead Generation Agency",
    // Brand & Regional Modifiers
    "Performance Marketing Agency Rawalpindi",
    "Social Media Marketing Agency Pakistan",
    "SEO Agency Islamabad Pakistan",
    "Rawalpindians Community Marketing",
    "Islamabad Insider Media",
    "Sirf Chai Digital Network",
    "Virtual Velocity Agency",
    "Tauseef Alam Founder Virtual Velocity"
  ],
  authors: [{ name: "Tauseef Alam & Virtual Velocity Team", url: SITE_URL }],
  creator: "Virtual Velocity",
  publisher: "Virtual Velocity",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Virtual Velocity | Top Digital Marketing & BPO Agency Islamabad Pakistan",
    description:
      "Scale your business revenue with top-rated Digital Marketing Services, BPO Services Pakistan, Hotel Marketing Agency campaigns, Restaurant SEO, Meta Ads Agency, and Google Ads Agency solutions.",
    url: SITE_URL,
    siteName: "Virtual Velocity Digital Agency Pakistan",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Virtual Velocity Digital Marketing Agency Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virtual Velocity | Digital Marketing & Performance Agency Pakistan",
    description:
      "Pakistan's premier Digital Marketing Agency, BPO Services Provider, Hospitality & Restaurant Marketing Specialist, and Performance Marketing Agency.",
    images: [{ url: SOCIAL_IMAGE, alt: "Virtual Velocity Digital Marketing Agency Pakistan" }],
    creator: "@virtualvelocity",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/icon-512.png",
    apple: "/icon-512.png",
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Virtual Velocity",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "inLanguage": "en",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Virtual Velocity",
      "founder": {
        "@type": "Person",
        "name": "Tauseef Alam",
        "jobTitle": "Founder & Creative Director",
        "sameAs": [
          "https://www.linkedin.com/in/tauseefalam/"
        ]
      },
      "url": SITE_URL,
      "logo": `${SITE_URL}/VV%20png.png`,
      "sameAs": [
        "https://www.linkedin.com/company/virtualvelocitypk/",
        "https://www.facebook.com/virtualvelocitypk/",
        "https://www.instagram.com/virtualvelocity_/",
        "https://www.tiktok.com/@virtualvelocitypk",
        "https://www.pinterest.com/thevirtualvelocity/",
        "https://www.behance.net/thevirtualvelocity"
      ],
      "knowsAbout": [
        "Digital Marketing Agency Pakistan",
        "Digital Marketing Agency Islamabad",
        "BPO Services Pakistan",
        "Customer Service Outsourcing",
        "Customer Support Outsourcing",
        "Call Center Outsourcing Pakistan",
        "Hospitality Marketing Agency",
        "Hotel Marketing Agency",
        "Hotel Social Media Marketing",
        "Hotel SEO Services",
        "Restaurant Marketing Agency",
        "Restaurant Digital Marketing",
        "Restaurant Social Media Marketing",
        "Restaurant Lead Generation",
        "Performance Marketing Agency",
        "Meta Ads Agency",
        "Google Ads Agency",
        "Lead Generation Agency"
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+923325296693",
          "contactType": "customer service",
          "email": "info@thevirtualvelocity.com",
          "areaServed": ["Pakistan", "United States", "United Kingdom", "Worldwide"],
          "availableLanguage": ["English", "Urdu"]
        }
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      "name": "Virtual Velocity Digital Marketing & BPO Agency Pakistan",
      "url": SITE_URL,
      "image": `${SITE_URL}${SOCIAL_IMAGE}`,
      "priceRange": "$$$",
      "founder": {
        "@type": "Person",
        "name": "Tauseef Alam"
      },
      "areaServed": [
        { "@type": "Country", "name": "Pakistan" },
        { "@type": "City", "name": "Islamabad" },
        { "@type": "City", "name": "Rawalpindi" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Islamabad",
          "addressRegion": "Islamabad Capital Territory",
          "addressCountry": "PK"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Rawalpindi",
          "addressRegion": "Punjab",
          "addressCountry": "PK"
        }
      ],
      "description":
        "Pakistan's top full-service Digital Marketing Agency, BPO Services Provider, Hospitality Marketing Agency, Restaurant Marketing Specialist, and Performance Marketing Agency in Islamabad & Rawalpindi.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital & BPO Services Catalog",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Digital Marketing Services",
              "description": "Full service Digital Marketing Company in Pakistan & Islamabad."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "BPO & Outsourcing Services",
              "description": "BPO Services Pakistan including Customer Service Outsourcing, Customer Support Outsourcing, and Call Center Outsourcing Pakistan."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hospitality & Hotel Marketing",
              "description": "Hospitality Marketing Agency providing Hotel Social Media Marketing, Hotel Advertising, and Hotel SEO Services."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Restaurant Marketing & Lead Generation",
              "description": "Restaurant Marketing Agency providing Restaurant Digital Marketing, Restaurant SEO Services, and Restaurant Lead Generation."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Performance Marketing & Paid Advertising",
              "description": "Performance Marketing Agency, Meta Ads Agency, Google Ads Agency, and Lead Generation Agency."
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does Virtual Velocity offer as a Digital Marketing Agency in Pakistan and Islamabad?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Virtual Velocity is a leading Digital Marketing Agency in Pakistan and Islamabad providing comprehensive Digital Marketing Services, Performance Marketing, Technical SEO, Social Media Campaigns, BPO & Outsourcing Services, and Brand Strategy."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide BPO Services and Call Center Outsourcing in Pakistan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Virtual Velocity is a trusted Outsourcing Company in Pakistan offering BPO Services Pakistan, Customer Service Outsourcing, Customer Support Outsourcing, Call Center Outsourcing Pakistan, and Business Outsourcing Services for international and local clients."
          }
        },
        {
          "@type": "Question",
          "name": "How does your Hospitality & Hotel Marketing Agency increase room bookings?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our Hospitality Marketing Agency specializes in Hotel Marketing Agency strategies, Hotel Social Media Marketing, Hospitality Digital Marketing, Hotel Advertising Agency campaigns, and Hotel SEO Services designed to drive direct online bookings and reduce OTA dependency."
          }
        },
        {
          "@type": "Question",
          "name": "What is included in your Restaurant Marketing & Lead Generation services?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "As a top Restaurant Marketing Agency, we deliver Restaurant Digital Marketing, Restaurant Social Media Marketing, Restaurant Advertising Agency creative, Restaurant SEO Services, and targeted Restaurant Lead Generation to fill dining rooms and scale delivery orders."
          }
        },
        {
          "@type": "Question",
          "name": "Why choose Virtual Velocity as your Performance Marketing, Meta Ads & Google Ads Agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Virtual Velocity is a high-ROAS Performance Marketing Agency, Meta Ads Agency, and Google Ads Agency. We function as an elite Lead Generation Agency & Paid Advertising Agency driving measurable commercial revenue."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-roboto relative" suppressHydrationWarning>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-[150%] rounded-lg bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#00A29F] focus:ring-offset-2 motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
