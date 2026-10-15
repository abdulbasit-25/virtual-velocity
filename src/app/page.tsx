import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navigation } from "@/components/layout/Navigation";
import { GSAPHeroTimeline } from "@/components/sections/GSAPHeroTimeline";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { MotionPreferences } from "@/components/sections/home/MotionPreferences";

// ─────────────────────────────────────────────────────────────────────────────
// Below-the-fold sections are code-split with `next/dynamic`. Their JS (and the
// GSAP / framer-motion / matter-js code they pull in) is fetched on demand
// instead of being part of the initial route bundle. SSR is preserved, so all
// copy stays in the server-rendered HTML for SEO and there is no layout shift.
// ─────────────────────────────────────────────────────────────────────────────
const WhoWeAre = dynamic(() =>
  import("@/components/sections/WhoWeAre").then((mod) => mod.WhoWeAre)
);

const GSAPScrollGallery = dynamic(
  () => import("@/components/sections/GSAPScrollGallery").then((mod) => mod.GSAPScrollGallery)
);

const InstaReelsGallery = dynamic(
  () => import("@/components/sections/InstaReelsGallery").then((mod) => mod.InstaReelsGallery)
);

const BrandPhysicsBalls = dynamic(
  () =>
    import("@/components/sections/BrandPhysicsBalls").then(
      (mod) => mod.BrandPhysicsBalls
    )
);

const LightStatsSection = dynamic(
  () => import("@/components/sections/LightStatsSection").then((mod) => mod.LightStatsSection)
);

const SEOTextSection = dynamic(
  () => import("@/components/sections/SEOTextSection").then((mod) => mod.SEOTextSection)
);

const EditorialTestimonials = dynamic(
  () => import("@/components/sections/EditorialTestimonials").then((mod) => mod.EditorialTestimonials)
);

const Contact = dynamic(
  () => import("@/components/sections/Contact").then((mod) => mod.Contact)
);

// Decorative, non-critical: the custom cursor is a pure client enhancement and
// must never block hydration or first paint. It renders nothing on the server
// (it early-returns until the pointer is detected), so SSR output is untouched.
const CustomCursor = dynamic(() =>
  import("@/components/ui/CustomCursor").then((mod) => mod.CustomCursor)
);

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thevirtualvelocity.com"),
  alternates: {
    canonical: "https://www.thevirtualvelocity.com",
  },
  title: "Virtual Velocity | Digital Marketing & BPO Agency",
  description:
    "Virtual Velocity is Pakistan's premier Digital Marketing Agency & BPO service provider in Islamabad. Expert Meta Ads, Google Ads, SEO & BPO solutions.",
  keywords: [
    "Digital Marketing Agency",
    "Digital Marketing Company",
    "Digital Marketing Services",
    "Digital Marketing Agency Pakistan",
    "Digital Marketing Agency Islamabad",
    "BPO Services",
    "BPO Services Pakistan",
    "Outsourcing Company Pakistan",
    "Outsourcing Services Pakistan",
    "Customer Support Outsourcing",
    "Call Center Outsourcing Pakistan",
    "Hospitality Marketing Agency",
    "Hotel Marketing Agency",
    "Hotel Social Media Marketing",
    "Hotel SEO Services",
    "Restaurant Marketing Agency",
    "Restaurant Digital Marketing",
    "Restaurant SEO Services",
    "Restaurant Lead Generation",
    "Performance Marketing Agency",
    "Performance Marketing Services",
    "Paid Advertising Agency",
    "Meta Ads Agency",
    "Google Ads Agency",
    "Lead Generation Agency",
  ],
  openGraph: {
    title: "Virtual Velocity | Digital Marketing & BPO Agency",
    description:
      "Pakistan's premier Digital Marketing Agency & BPO service provider. Performance marketing, SEO, Meta Ads & Google Ads.",
    url: "https://www.thevirtualvelocity.com",
  },
};

export default function Home() {
  return (
    <SmoothScrollProvider>
      <MotionPreferences>
        <main className="relative min-h-screen bg-white font-outfit text-zinc-900 selection:bg-zinc-900 selection:text-white">
          {/* Custom Award-Style Dynamic Cursor */}
          <CustomCursor />

          {/* Global Floating Navigation Header */}
          <Navigation />

          {/* 1. GSAP Timeline Powered Hero Entrance */}
          <GSAPHeroTimeline />

          {/* 2. About Virtual Velocity Agency Section */}
          <About />

          {/* 3. Who We Are — Creative House Manifesto */}
          <WhoWeAre />

          {/* 4. Case Studies Walkthrough */}
          <GSAPScrollGallery />

          {/* 5. Instagram Reels & Social Media Gallery */}
          <InstaReelsGallery />

          {/* 6. Interactive client logos */}
          <BrandPhysicsBalls />

          {/* 7. Proven Impact & Metrics */}
          <LightStatsSection />

          {/* 8. Agency Discovery & FAQ Text Section (Optimized for Text to Code Ratio) */}
          <SEOTextSection />

          {/* 9. Client Testimonials */}
          <EditorialTestimonials />

          {/* 10. Project Estimator & Contact Form */}
          <Contact />

          {/* Global Studio Footer */}
          <Footer />
        </main>
      </MotionPreferences>
    </SmoothScrollProvider>
  );
}
