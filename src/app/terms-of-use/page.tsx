import type { Metadata } from "next";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/terms-of-use` },
  title: "Terms of Use",
  description:
    "Review the Terms of Use for rules about website access, project inquiries, published content, and ownership of visual, interface, and digital assets.",
  openGraph: {
    url: `${SITE_URL}/terms-of-use`,
    title: "Terms of Use | Virtual Velocity",
    description:
      "Review the Terms of Use for rules about website access, project inquiries, published content, and ownership of visual, interface, and digital assets.",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Virtual Velocity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Virtual Velocity",
    description:
      "Review the Terms of Use for rules about website access, project inquiries, published content, and ownership of visual, interface, and digital assets.",
    images: [{ url: SOCIAL_IMAGE, alt: "Virtual Velocity" }],
  },
};

export default function TermsOfUsePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms-of-use" },
        ]}
      />
      <SmoothScrollProvider>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-zinc-900 relative font-outfit">
        <CustomCursor />
        <Navigation />

        <div className="pt-20 sm:pt-24 pb-24 px-6 sm:px-12 max-w-4xl mx-auto space-y-12">
          <div className="space-y-4 border-b border-zinc-200 pb-8">
            <span className="text-meta text-zinc-900 uppercase tracking-widest block font-bold">
              LEGAL FRAMEWORK
            </span>
            <h1 className="text-4xl sm:text-6xl font-outfit font-black text-zinc-900 uppercase tracking-tight">
              TERMS OF USE
            </h1>
            <p className="text-xs font-mono text-zinc-700">LAST REVISED: AUGUST 29, 2026</p>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-zinc-700 font-light leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-outfit font-bold text-zinc-900 uppercase">1. ACCEPTANCE OF TERMS</h2>
              <p>
                By accessing or navigating the VIRTUAL VELOCITY digital platform, you agree to comply with these Terms of Use and all applicable regional laws across the United States and Pakistan.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-outfit font-bold text-zinc-900 uppercase">2. INTELLECTUAL PROPERTY</h2>
              <p>
                All visual design systems, custom user interface components, and digital assets published on this platform remain the exclusive property of VIRTUAL VELOCITY unless contractually assigned under client Master Services Agreements.
              </p>
            </section>
          </div>
        </div>

        <Footer />
      </main>
      </SmoothScrollProvider>
    </>
  );
}
