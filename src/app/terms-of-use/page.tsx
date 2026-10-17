import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
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
    images: [
      { url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Virtual Velocity" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use | Virtual Velocity",
    description:
      "Review the Terms of Use for rules about website access, project inquiries, published content, and ownership of visual, interface, and digital assets.",
    images: [{ url: SOCIAL_IMAGE, alt: "Virtual Velocity" }],
  },
};

const LAST_REVISED = "August 29, 2026";

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  /** show a link to the privacy policy under this section */
  privacyLink?: boolean;
};

const SECTIONS: Section[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or navigating the VIRTUAL VELOCITY digital platform, you agree to comply with these Terms of Use and all applicable regional laws across the United States and Pakistan.",
    ],
  },
  {
    id: "website-use",
    title: "Use of the Website",
    paragraphs: [
      "You may browse and use this website for lawful purposes only. Please do not disrupt the site, attempt to gain unauthorised access to it or its systems, or use it to send unlawful, misleading, or harmful material.",
    ],
  },
  {
    id: "project-inquiries",
    title: "Project Inquiries",
    paragraphs: [
      "Submitting an inquiry, campaign brief, or review, or contacting us by email or phone, does not create a client relationship or a commitment from either side. Any engagement begins only under a written proposal or agreement.",
      "Information you send us is handled as described in our Privacy Policy.",
    ],
    privacyLink: true,
  },
  {
    id: "published-content",
    title: "Published Content",
    paragraphs: [
      "Case studies, figures, articles, and media on this website are provided for general information about our work and capabilities. Results depend on each client's market, budget, and goals, and are not a guarantee of future performance.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "All visual design systems, custom user interface components, and digital assets published on this platform remain the exclusive property of VIRTUAL VELOCITY unless contractually assigned under client Master Services Agreements.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    paragraphs: [
      `We may update these Terms from time to time. The "last revised" date at the top of this page shows the latest version, and continuing to use the website after a change means you accept the updated Terms.`,
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

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
        <main
          id="main-content"
          tabIndex={-1}
          className="relative min-h-screen bg-white font-outfit text-zinc-900 outline-none selection:bg-zinc-900 selection:text-white"
        >
          <CustomCursor />
          <Navigation />

          {/* ============ HERO ============ */}
          <header className="relative isolate overflow-hidden border-b border-zinc-200">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00A29F]/15 blur-3xl" />
              <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.3]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                  maskImage:
                    "linear-gradient(to bottom, black 10%, transparent 85%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 10%, transparent 85%)",
                }}
              />
            </div>

            <div className="mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-12 sm:pb-16 sm:pt-36">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00A29F]/30 bg-[#00A29F]/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#007f7c] sm:text-xs">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Legal Framework
              </span>

              <h1 className="mt-5 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-zinc-950">
                Terms of <span className="text-[#00A29F]">Use</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                The ground rules for using our website, sending us an inquiry,
                and how we treat the design and digital assets published here.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-wider text-zinc-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5">
                  <CalendarDays
                    className="h-3.5 w-3.5 text-[#00A29F]"
                    aria-hidden="true"
                  />
                  Last revised: {LAST_REVISED}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5">
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-[#00A29F]"
                    aria-hidden="true"
                  />
                  {SECTIONS.length + 1} short sections · about 2 min read
                </span>
              </div>
            </div>
          </header>

          {/* ============ CONTENT ============ */}
          <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-10 sm:px-12 sm:pt-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            {/* Table of contents */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <nav
                aria-label="On this page"
                className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5"
              >
                <p className="mb-3 font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
                  On this page
                </p>
                <ol className="grid grid-cols-1 gap-0.5 min-[480px]:grid-cols-2 lg:grid-cols-1">
                  {[...SECTIONS, { id: "contact", title: "Contact" }].map(
                    (s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-white hover:text-[#00807d] focus-visible:bg-white focus-visible:text-[#00807d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F]"
                        >
                          <span className="font-mono text-[11px] font-black text-zinc-400 transition-colors group-hover:text-[#00A29F]">
                            {pad(i + 1)}
                          </span>
                          <span>{s.title}</span>
                        </a>
                      </li>
                    ),
                  )}
                </ol>
              </nav>
            </aside>

            {/* Sections */}
            <div className="space-y-5 sm:space-y-6">
              {SECTIONS.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className="group scroll-mt-28 rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-[#00A29F]/40 hover:shadow-lg hover:shadow-[#00A29F]/5 sm:p-8"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00A29F]/10 font-mono text-sm font-black text-[#007f7c] transition-colors duration-300 group-hover:bg-[#00A29F] group-hover:text-white"
                    >
                      {pad(i + 1)}
                    </span>
                    <div className="min-w-0 space-y-3">
                      <h2
                        id={`${s.id}-title`}
                        className="pt-1.5 text-lg font-extrabold uppercase tracking-tight text-zinc-950 sm:text-xl"
                      >
                        {s.title}
                      </h2>
                      {s.paragraphs.map((p) => (
                        <p
                          key={p}
                          className="text-[15px] leading-relaxed text-zinc-700 sm:text-base"
                        >
                          {p}
                        </p>
                      ))}
                      {s.privacyLink && (
                        <Link
                          href="/privacy-policy"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00807d] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F]"
                        >
                          Read the Privacy Policy
                          <ArrowUpRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </section>
              ))}

              {/* Contact */}
              <section
                id="contact"
                aria-labelledby="contact-title"
                className="relative isolate scroll-mt-28 overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-[#00A29F]/40 blur-3xl"
                />
                <div className="flex items-start gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 font-mono text-sm font-black text-emerald-300"
                  >
                    {pad(SECTIONS.length + 1)}
                  </span>
                  <div className="min-w-0 space-y-3">
                    <h2
                      id="contact-title"
                      className="pt-1.5 text-lg font-extrabold uppercase tracking-tight sm:text-xl"
                    >
                      Questions about these Terms?
                    </h2>
                    <p className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                      Reach out and our team will get back to you.
                    </p>
                    <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
                      {[
                        {
                          label: "General queries",
                          email: "admin@thevirtualvelocity.com",
                        },
                        {
                          label: "New business",
                          email: "info@thevirtualvelocity.com",
                        },
                      ].map((c) => (
                        <a
                          key={c.email}
                          href={`mailto:${c.email}`}
                          className="group/mail flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        >
                          <Mail
                            className="h-4 w-4 shrink-0 text-emerald-300"
                            aria-hidden="true"
                          />
                          <span className="min-w-0">
                            <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                              {c.label}
                            </span>
                            <span className="block text-sm font-semibold [overflow-wrap:anywhere]">
                              {c.email}
                            </span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <Footer />
        </main>
      </SmoothScrollProvider>
    </>
  );
}
