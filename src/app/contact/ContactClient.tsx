"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Contact } from "@/components/sections/Contact";
import { Zap, Clock, ArrowRight, Check } from "lucide-react";

const NEXT_STEPS = [
  {
    step: "01",
    title: "You send the brief",
    text: "Tell us your goals and budget using the form below.",
  },
  {
    step: "02",
    title: "We reply within 12 hours",
    text: "A real person reads your brief and gets back to you.",
  },
  {
    step: "03",
    title: "We map the plan",
    text: "You get a clear scope and next steps for your project.",
  },
];

/** Reads ?services=A, B from the services page and shows them as chips. */
function SelectedServices() {
  const params = useSearchParams();
  const items = useMemo(
    () =>
      (params.get("services") ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 12),
    [params],
  );

  if (!items.length) return null;

  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 sm:p-5">
      <p className="mb-3 flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-700">
        <Check className="w-3.5 h-3.5" />
        You are enquiring about
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((s) => (
          <li
            key={s}
            className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-800"
          >
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-zinc-600">
        Mention these in your message below, or{" "}
        <Link
          href="/services"
          className="font-bold text-emerald-700 underline underline-offset-2"
        >
          change your selection
        </Link>
        .
      </p>
    </div>
  );
}

function ContactForm() {
  const params = useSearchParams();
  return <Contact servicesQuery={params.get("services")} />;
}

export function ContactClient() {
  const reduce = useReducedMotion();

  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-white text-zinc-900 relative selection:bg-zinc-900 selection:text-white font-outfit">
        <CustomCursor />
        <Navigation />

        {/* Header */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #d4d4d8 1px, transparent 0)",
              backgroundSize: "28px 28px",
              maskImage:
                "linear-gradient(to bottom, black 0%, transparent 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 80%)",
            }}
          />

          <div className="relative pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 px-4 sm:px-8 lg:px-12 max-w-[1700px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-zinc-200 pb-10 sm:pb-14">
              <div className="lg:col-span-7">
                <motion.span
                  {...rise(0)}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-extrabold text-emerald-700 uppercase tracking-[0.2em]"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Start a conversation
                </motion.span>

                <motion.h1
                  {...rise(1)}
                  className="mt-5 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[5rem] font-black text-zinc-900 tracking-tighter uppercase leading-[0.9] select-none"
                >
                  <SplitTextReveal
                    text="INITIATE PROJECT"
                    highlightWords={["PROJECT"]}
                    accentColor="#00A29F"
                  />
                </motion.h1>

                <motion.p
                  {...rise(2)}
                  className="mt-5 sm:mt-6 text-base sm:text-xl lg:text-2xl text-zinc-700 max-w-2xl font-light leading-relaxed"
                >
                  We collaborate with visionary brands globally. Select your
                  campaign goals and budget below for a guaranteed response
                  within 12 hours.
                </motion.p>

                <motion.div
                  {...rise(3)}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-white">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Reply within 12 hours
                  </span>
                  <a
                    href="#contact-form"
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-zinc-900 hover:text-emerald-600 transition-colors"
                  >
                    Jump to the form
                    <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                  </a>
                </motion.div>

                <Suspense fallback={null}>
                  <SelectedServices />
                </Suspense>
              </div>

              {/* What happens next */}
              <motion.aside
                {...rise(2)}
                aria-label="What happens next"
                className="lg:col-span-5 rounded-3xl bg-zinc-950 p-6 sm:p-8 text-white shadow-xl"
              >
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-emerald-400 mb-6">
                  What happens next
                </p>
                <ol className="relative space-y-6">
                  <span
                    aria-hidden="true"
                    className="absolute left-[19px] top-3 bottom-3 w-px bg-white/15"
                  />
                  {NEXT_STEPS.map((s) => (
                    <li key={s.step} className="relative flex gap-4">
                      <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/40 bg-zinc-950 font-mono text-xs font-black text-emerald-400">
                        {s.step}
                      </span>
                      <div>
                        <h2 className="text-base font-black uppercase tracking-tight">
                          {s.title}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
                          {s.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* Form */}
        <div id="contact-form" className="scroll-mt-24">
          <Suspense fallback={<Contact />}>
            <ContactForm />
          </Suspense>
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
