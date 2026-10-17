import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Mail,
  CalendarDays,
  FileText,
  ArrowUpRight,
  Inbox,
  Target,
  Lock,
} from "lucide-react";
import { SITE_URL, SOCIAL_IMAGE } from "@/lib/site";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  title: "Privacy Policy",
  description:
    "Read the Virtual Velocity Privacy Policy to learn how it describes contact data, purposes of use, privacy practices, and the process for directing questions.",
  openGraph: {
    url: `${SITE_URL}/privacy-policy`,
    title: "Privacy Policy | Virtual Velocity",
    description:
      "Read the Virtual Velocity Privacy Policy to learn how it describes contact data, purposes of use, privacy practices, and the process for directing questions.",
    images: [
      { url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Virtual Velocity" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Virtual Velocity",
    description:
      "Read the Virtual Velocity Privacy Policy to learn how it describes contact data, purposes of use, privacy practices, and the process for directing questions.",
    images: [{ url: SOCIAL_IMAGE, alt: "Virtual Velocity" }],
  },
};

const LAST_REVISED = "August 29, 2026";

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  termsLink?: boolean;
};

const SECTIONS: Section[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "VIRTUAL VELOCITY collects contact details provided directly by users when transmitting project inquiries through our interactive forms, including full names, work email addresses, phone numbers, and project briefs.",
    ],
  },
  {
    id: "how-we-use-your-data",
    title: "How We Use Your Data",
    paragraphs: [
      "We use collected information strictly to evaluate project scope requirements, prepare technical proposals, communicate regarding scheduled strategy consultations, and manage long-term client engagements.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security & Regional Compliance",
    paragraphs: [
      "We maintain enterprise security controls across our Wilmington, USA and Lahore, Pakistan operational hubs to safeguard client data against unauthorized access, adhering to GDPR, CCPA, and international data protection standards.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    paragraphs: [
      `We may update this Privacy Policy from time to time. The "last revised" date at the top of this page shows the latest version. Use of our website is also governed by our Terms of Use.`,
    ],
    termsLink: true,
  },
];

const AT_A_GLANCE = [
  {
    icon: Inbox,
    label: "What we collect",
    text: "Names, work emails, phone numbers, and project briefs you send through our forms.",
  },
  {
    icon: Target,
    label: "Why we use it",
    text: "To scope projects, prepare proposals, schedule consultations, and manage engagements.",
  },
  {
    icon: Lock,
    label: "How it's protected",
    text: "Security controls across our operational hubs to guard against unauthorized access.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
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
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                Legal Compliance
              </span>

              <h1 className="mt-5 text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-zinc-950">
                Privacy <span className="text-[#00A29F]">Policy</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700 sm:text-lg">
                What information we collect when you contact us, how we use it,
                and how to reach us with questions.
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
                  <FileText
                    className="h-3.5 w-3.5 text-[#00A29F]"
                    aria-hidden="true"
                  />
                  {SECTIONS.length + 1} short sections · about 2 min read
                </span>
              </div>
            </div>
          </header>

          {/* ============ AT A GLANCE ============ */}
          <div className="mx-auto max-w-6xl px-6 pt-10 sm:px-12 sm:pt-14">
            <p className="mb-4 font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
              At a glance
            </p>
            <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {AT_A_GLANCE.map((g) => (
                <li
                  key={g.label}
                  className="group rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A29F]/40 hover:bg-white hover:shadow-lg hover:shadow-[#00A29F]/5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A29F]/10 text-[#00A29F] transition-colors duration-300 group-hover:bg-[#00A29F] group-hover:text-white">
                    <g.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-sm font-extrabold uppercase tracking-wide text-zinc-950">
                    {g.label}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">
                    {g.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

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
                      {s.termsLink && (
                        <Link
                          href="/terms-of-use"
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#00807d] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F]"
                        >
                          Read the Terms of Use
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
                      Questions about your data?
                    </h2>
                    <p className="text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                      Reach out about this policy or about information you have
                      sent us, and our team will get back to you.
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
                          className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
