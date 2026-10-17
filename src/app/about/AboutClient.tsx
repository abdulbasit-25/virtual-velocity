"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AGENCY_METRICS, FOUNDER, AGENCY_INFO } from "@/data/agencyData";
import {
  Zap,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Radio,
} from "lucide-react";
import { AboutClientLogosSlider } from "@/components/sections/AboutClientLogosSlider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ============================== DATA ============================== */

const TEAL = "#00A29F";
const EASE = [0.22, 1, 0.36, 1] as const;

const COMMUNITIES = [
  { name: "Rawalpindians", note: "City community" },
  { name: "Islamabad Insider", note: "Lifestyle & culture" },
  { name: "Sirf Chai", note: "Viral entertainment" },
];

const STATS = [
  {
    to: AGENCY_METRICS.teamExperienceYears,
    suffix: "+",
    decimals: 0,
    title: "Years of Team Experience",
    text: "Transforming ambitious brands globally.",
    accent: true,
  },
  {
    to: AGENCY_METRICS.campaignsManaged.target,
    suffix: "+",
    decimals: 0,
    title: "Campaigns Deployed",
    text: "Across United States, European & Asian markets.",
    accent: false,
  },
  {
    to: 1,
    suffix: "M+",
    decimals: 0,
    title: "Community Reach",
    text: "Proprietary digital media network.",
    accent: false,
  },
  {
    to: 4.8,
    suffix: "x",
    decimals: 1,
    title: "Average ROAS",
    text: "Performance media return benchmark.",
    accent: true,
  },
];

const CAPABILITIES = [
  "Digital Marketing",
  "Content Creation",
  "Commercial Shoots",
  "Social Media",
  "Technical SEO",
  "Influencer Collaborations",
  "Graphic Design",
  "Performance Ads",
  "AI-Driven Growth",
];

const INDUSTRIES = [
  "Hospitality",
  "Retail",
  "Food",
  "Lifestyle",
  "Beauty",
  "Technology",
];

/* ============================ SHARED UI ============================ */

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) return;
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  const displayedValue = reduce ? to : value;

  return (
    <span ref={ref} className="tabular-nums">
      {displayedValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SectionLabel({
  icon,
  index,
  title,
  aside,
}: {
  icon: ReactNode;
  index: string;
  title: string;
  aside: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4">
      <span className="flex items-center gap-2.5 font-mono text-xs font-extrabold uppercase tracking-widest text-emerald-600">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          {icon}
        </span>
        <span className="text-zinc-400">{index}</span>
        <span>{title}</span>
      </span>
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500">
        {aside}
      </span>
    </div>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-[#00A29F]/10 px-1.5 py-0.5 font-extrabold text-zinc-950">
      {children}
    </span>
  );
}

/* ============================== PAGE ============================== */

export function AboutClient() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-about-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
      );
    },
    { scope: scopeRef },
  );

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <SmoothScrollProvider>
      <main
        id="main-content"
        tabIndex={-1}
        ref={scopeRef}
        className="relative min-h-screen bg-white font-outfit text-zinc-900 selection:bg-zinc-900 selection:text-white"
      >
        <CustomCursor />
        <Navigation />

        {/* ============ 1. HERO ============ */}
        <section className="relative isolate overflow-hidden">
          {/* Background: soft glows + fading dot grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -right-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[#00A29F]/15 blur-3xl" />
            <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                maskImage:
                  "linear-gradient(to bottom, black 20%, transparent 90%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 20%, transparent 90%)",
              }}
            />
          </div>

          <div className="mx-auto max-w-[1700px] px-4 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 lg:pt-40">
            <div className="gsap-about-title max-w-5xl space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#00A29F]/30 bg-[#00A29F]/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#00A29F] sm:text-xs">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                Agency Manifesto &amp; Culture
              </span>

              <h1 className="select-none text-[clamp(2.25rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight text-zinc-950">
                <SplitTextReveal
                  text="WE ARE VIRTUAL VELOCITY"
                  highlightWords={["VELOCITY"]}
                  accentColor={TEAL}
                />
              </h1>

              <p className="max-w-3xl text-base font-normal leading-relaxed text-zinc-700 sm:text-xl lg:text-2xl">
                {AGENCY_INFO.tagline}. We combine strategic performance
                marketing, web app engineering, and creative direction to fuel
                business growth.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  data-cursor-pointer
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 hover:bg-emerald-600 active:scale-[0.98]"
                >
                  Start a project
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  data-cursor-pointer
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white/70 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-900 backdrop-blur transition-all duration-300 hover:border-[#00A29F] hover:text-[#00A29F] active:scale-[0.98]"
                >
                  Explore services
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1700px] space-y-20 px-4 pb-14 sm:space-y-28 sm:px-8 sm:pb-20 lg:px-12">
          {/* ============ 2. FOUNDER ============ */}
          <section className="space-y-8 sm:space-y-10">
            <SectionLabel
              icon={<Users className="h-4 w-4" aria-hidden="true" />}
              index="01"
              title="Leadership"
              aside="Meet The Founder"
            />

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Narrative */}
              <motion.div
                {...reveal()}
                className="order-2 space-y-6 lg:order-1 lg:col-span-8"
              >
                <div className="inline-flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-wide text-[#00A29F]">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Founder &amp; Community Pioneer
                </div>

                <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                  Driving Attention, Culture &amp;{" "}
                  <span className="text-[#00A29F]">Growth.</span>
                </h2>

                <div className="space-y-4 text-base leading-relaxed text-zinc-800 sm:text-lg">
                  <p>
                    Tauseef Alam is a digital media and marketing leader with
                    almost 12 years of experience in the industry. As the
                    founder of Virtual Velocity, his work extends far beyond
                    traditional digital marketing — building and managing some
                    of the region&apos;s most recognized digital media
                    communities, including <Highlight>Rawalpindians</Highlight>,{" "}
                    <Highlight>Islamabad Insider</Highlight>, and{" "}
                    <Highlight>Sirf Chai</Highlight>, which collectively reach
                    over{" "}
                    <span className="font-black text-emerald-700">
                      1 Million+ followers
                    </span>
                    .
                  </p>
                  <p>
                    From building viral digital platforms and scaling brands to
                    content production, commercial shoots, social media
                    strategy, and technical growth, Tauseef brings hands-on
                    experience across the entire digital ecosystem. His vision
                    for Virtual Velocity is simple: create work that gets
                    noticed, builds iconic identities, and moves businesses
                    forward.
                  </p>
                </div>

                {/* Community cards */}
                <ul className="grid gap-3 pt-2 sm:grid-cols-3">
                  {COMMUNITIES.map((c, i) => (
                    <motion.li
                      key={c.name}
                      {...reveal(0.1 + i * 0.08)}
                      className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A29F]/50 hover:bg-white hover:shadow-lg hover:shadow-[#00A29F]/10"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00A29F]/10 text-[#00A29F] transition-colors duration-300 group-hover:bg-[#00A29F] group-hover:text-white">
                        <Radio
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-extrabold text-zinc-950">
                          {c.name}
                        </span>
                        <span className="block text-xs font-medium text-zinc-500">
                          {c.note}
                        </span>
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Photo */}
              <motion.div
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, scale: 0.95 },
                      whileInView: { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.8, ease: EASE, delay: 0.1 },
                    })}
                className="relative order-1 flex justify-center lg:sticky lg:top-28 lg:order-2 lg:col-span-4 lg:justify-end"
              >
                <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                  {/* Offset accent frame */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-[#00A29F]/40 sm:translate-x-4 sm:translate-y-4"
                  />
                  <div className="group relative aspect-[4/4.8] overflow-hidden rounded-3xl border-2 border-zinc-200 bg-zinc-100 shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FOUNDER.image}
                      alt={FOUNDER.name}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 space-y-1 text-white">
                      <span className="inline-block rounded-full bg-white/15 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300 backdrop-blur-sm">
                        {FOUNDER.experience} in Digital Media
                      </span>
                      <h3 className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                        {FOUNDER.name}
                      </h3>
                      <p className="text-xs font-medium text-zinc-300">
                        {FOUNDER.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Owned media banner */}
            <motion.div
              {...reveal()}
              className="relative isolate overflow-hidden rounded-3xl bg-zinc-950 p-6 text-white sm:p-8 lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#00A29F]/40 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl space-y-2">
                  <span className="block font-mono text-xs font-extrabold uppercase tracking-widest text-emerald-400">
                    Proprietary Media Communities
                  </span>
                  <p className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                    <span className="text-[#2dd4cf]">~{AGENCY_METRICS.ownedAudience.display}</span> direct
                    audience across our in-house portals.
                  </p>
                  <p className="text-sm font-medium text-zinc-400 sm:text-base">
                    Our 7 verified in-house portals now have a dedicated network
                    audit and distribution matrix page.
                  </p>
                </div>

                <Link
                  href="/owned-media"
                  data-cursor-pointer
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-950 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00A29F] hover:text-white active:scale-[0.98]"
                >
                  Explore the network
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </section>

          {/* ============ 3. AGENCY STORY ============ */}
          <section className="space-y-8 sm:space-y-10">
            <SectionLabel
              icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
              index="02"
              title="The Agency Story"
              aside={`${AGENCY_METRICS.teamExperienceYears}+ Years of Team Experience`}
            />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              {/* Narrative */}
              <motion.div {...reveal()} className="space-y-6 lg:col-span-7">
                <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                  A Creative House Built for Brands That Want to{" "}
                  <span className="text-[#00A29F]">Move Forward.</span>
                </h2>

                <div className="space-y-4 text-base leading-relaxed text-zinc-800 sm:text-lg">
                  <p>
                    We are a creative house where strategy meets storytelling,
                    bringing together digital marketing, content creation,
                    commercial shoots, social media, technical SEO, influencer
                    collaborations, graphic design, performance ads, and
                    AI-driven growth solutions. Great brands aren&apos;t built
                    by simply posting more — they are forged through ideas that
                    connect and strategies that deliver real commercial impact.
                  </p>
                  <p>
                    From hospitality, retail, and food to lifestyle, beauty, and
                    technology, we partner with ambitious businesses to build a
                    dominant digital presence and turn brand vision into
                    tangible results. With {AGENCY_METRICS.teamExperienceYears}+ years of team experience and endless
                    ways to move your brand forward, Virtual Velocity is built
                    for scale.
                  </p>
                </div>

                {/* Capabilities + industries */}
                <div className="space-y-4 pt-2">
                  <div>
                    <p className="mb-2.5 font-mono text-[11px] font-extrabold uppercase tracking-widest text-zinc-500">
                      What we do
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {CAPABILITIES.map((c) => (
                        <li
                          key={c}
                          className="rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-800 transition-colors duration-200 hover:border-[#00A29F] hover:bg-[#00A29F]/10 hover:text-[#00807d] sm:text-[13px]"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2.5 font-mono text-[11px] font-extrabold uppercase tracking-widest text-zinc-500">
                      Who we work with
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {INDUSTRIES.map((c) => (
                        <li
                          key={c}
                          className="rounded-full bg-zinc-950 px-3.5 py-1.5 text-xs font-bold text-white sm:text-[13px]"
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:col-span-5 lg:self-start">
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.title}
                    {...reveal(i * 0.08)}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00A29F]/50 hover:bg-white hover:shadow-xl hover:shadow-[#00A29F]/10"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#00A29F] to-emerald-400 transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <span
                      className={`block font-mono text-4xl font-black sm:text-5xl ${
                        s.accent ? "text-emerald-600" : "text-zinc-950"
                      }`}
                    >
                      <CountUp
                        to={s.to}
                        decimals={s.decimals}
                        suffix={s.suffix}
                      />
                    </span>
                    <h3 className="mt-3 text-sm font-extrabold uppercase tracking-wide text-zinc-950">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-zinc-600">
                      {s.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ============ 4. CLIENT LOGOS ============ */}
        <AboutClientLogosSlider />

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
