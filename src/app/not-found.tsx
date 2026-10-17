import type { Metadata } from "next";
import Link from "next/link";
import {
  Home,
  ArrowUpRight,
  Compass,
  Briefcase,
  Layers,
  Radio,
  BookOpen,
  Users,
  Mail,
} from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Virtual Velocity page could not be found.",
  robots: { index: false, follow: false },
};

const SUGGESTIONS = [
  {
    href: "/services",
    icon: Briefcase,
    label: "Services",
    text: "Marketing, performance, creative & BPO",
  },
  {
    href: "/#work",
    icon: Layers,
    label: "Our Work",
    text: "Featured case studies",
  },
  {
    href: "/branding",
    icon: Compass,
    label: "Branding",
    text: "Brand identity & packaging",
  },
  {
    href: "/owned-media",
    icon: Radio,
    label: "Owned Media",
    text: "Our in-house media network",
  },
  {
    href: "/blog",
    icon: BookOpen,
    label: "Blog & Journal",
    text: "Articles and insights",
  },
  {
    href: "/about",
    icon: Users,
    label: "About Studio",
    text: "Who we are and how we work",
  },
];

export default function NotFound() {
  return (
    <SmoothScrollProvider>
      <main
        id="main-content"
        tabIndex={-1}
        className="relative flex min-h-screen flex-col justify-between bg-white font-outfit text-zinc-900 outline-none selection:bg-zinc-900 selection:text-white"
      >
        <CustomCursor />
        <Navigation />

        <div className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
          {/* Background: glows, dot grid and speed lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#00A29F]/15 blur-3xl" />
            <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.3]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                maskImage:
                  "radial-gradient(circle at center, black 15%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 15%, transparent 70%)",
              }}
            />
            {/* Speed lines (the "velocity" motif) */}
            <div className="absolute left-0 top-[28%] h-px w-1/3 bg-gradient-to-r from-transparent to-[#00A29F]/40" />
            <div className="absolute left-0 top-[34%] h-px w-1/4 bg-gradient-to-r from-transparent to-[#00A29F]/25" />
            <div className="absolute right-0 top-[58%] h-px w-1/3 bg-gradient-to-l from-transparent to-[#00A29F]/40" />
            <div className="absolute right-0 top-[64%] h-px w-1/4 bg-gradient-to-l from-transparent to-[#00A29F]/25" />
          </div>

          <div className="mx-auto w-full max-w-3xl space-y-6 text-center">
            <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-emerald-700 sm:text-sm">
              Error 404 — Page not found
            </span>

            <h1 className="relative select-none text-[clamp(6rem,24vw,12rem)] font-black leading-none tracking-tighter text-zinc-950">
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 mx-auto h-full w-2/3 rounded-full bg-[#00A29F]/20 blur-3xl motion-safe:animate-pulse"
              />
              4<span className="text-[#00A29F]">0</span>4
            </h1>

            <p className="mx-auto max-w-lg text-lg font-normal leading-relaxed text-zinc-700 sm:text-2xl">
              The requested velocity vector does not exist or has moved to an
              alternate domain.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
              <Link
                href="/"
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:w-auto"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                <span>Return to homepage</span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white/80 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A29F] hover:text-[#006766] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:w-auto"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Contact desk</span>
              </Link>
            </div>

            {/* Helpful destinations */}
            <div className="pt-10 text-left sm:pt-14">
              <h2 className="mb-4 text-center font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
                Maybe you were looking for
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {SUGGESTIONS.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="group flex h-full items-center gap-3.5 rounded-2xl border border-zinc-200 bg-white/80 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A29F]/50 hover:bg-white hover:shadow-lg hover:shadow-[#00A29F]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00A29F]/10 text-[#00A29F] transition-colors duration-300 group-hover:bg-[#00A29F] group-hover:text-white">
                        <s.icon
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold text-zinc-950">
                          {s.label}
                        </span>
                        <span className="block truncate text-xs font-medium text-zinc-600">
                          {s.text}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-zinc-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00A29F]"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
