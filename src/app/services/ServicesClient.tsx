"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ServicesClientLogosCarousel } from "@/components/sections/ServicesClientLogosCarousel";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AGENCY_METRICS, SERVICES } from "@/data/agencyData";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Plus,
  X,
  Zap,
  MapPin,
  Sparkles,
} from "lucide-react";

type Service = (typeof SERVICES)[number];

const PROCESS_STEPS = [
  {
    step: "01",
    short: "Audit",
    title: "AUDIT & DISCOVERY",
    description:
      "Deep-dive diagnostic into your ad accounts, analytics architecture, conversion funnels, and organic visibility to find immediate revenue bottlenecks.",
    deliverable: "Diagnostic Report & Growth Roadmap",
    panel:
      "bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/60 border-emerald-200",
    numColor: "text-emerald-600",
    badgeColor: "text-emerald-800",
    dot: "bg-emerald-500",
  },
  {
    step: "02",
    short: "Strategy",
    title: "STRATEGIC ARCHITECTURE",
    description:
      "Designing bespoke campaign architecture, creative testing matrices, technical sprint plans, and tracking infrastructure configured for compounding ROI.",
    deliverable: "Full Campaign & Tech Blueprint",
    panel:
      "bg-gradient-to-br from-sky-50 via-blue-50/60 to-indigo-100/60 border-sky-200",
    numColor: "text-sky-600",
    badgeColor: "text-sky-800",
    dot: "bg-sky-500",
  },
  {
    step: "03",
    short: "Execute",
    title: "RAPID EXECUTION",
    description:
      "High-velocity creative production, landing page engineering, ad launch sprints, and technical implementations built to capture intent at scale.",
    deliverable: "Live Campaigns & Deployed Systems",
    panel:
      "bg-gradient-to-br from-amber-50 via-orange-50/60 to-rose-50/60 border-amber-200",
    numColor: "text-amber-600",
    badgeColor: "text-amber-800",
    dot: "bg-amber-500",
  },
  {
    step: "04",
    short: "Scale",
    title: "SCALE & OPTIMIZATION",
    description:
      "Rigorous daily bid management, conversion rate optimization sprints, multivariate copy testing, and budget allocation targeting maximum ROAS.",
    deliverable: "Compounding Monthly Revenue",
    panel:
      "bg-gradient-to-br from-purple-50 via-violet-50/60 to-fuchsia-100/60 border-purple-200",
    numColor: "text-purple-600",
    badgeColor: "text-purple-800",
    dot: "bg-purple-500",
  },
];

const HERO_STATS = [
  { value: AGENCY_METRICS.campaignsManaged.display, label: "Projects delivered", accent: false },
  { value: "4.8x", label: "Avg client ROAS", accent: true },
  { value: "3", label: "Global offices", accent: false, icon: true },
];

export function ServicesClient() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selected, setSelected] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(new Set(SERVICES.map((s: Service) => s.category))),
    ],
    [],
  );

  const visible = useMemo(
    () =>
      activeCategory === "All"
        ? SERVICES
        : SERVICES.filter((s: Service) => s.category === activeCategory),
    [activeCategory],
  );

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const selectedServices = SERVICES.filter((s: Service) =>
    selected.includes(String(s.id)),
  );
  const contactHref = selectedServices.length
    ? `/contact?services=${encodeURIComponent(
        selectedServices.map((s: Service) => s.title).join(", "),
      )}`
    : "/contact";

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const step = PROCESS_STEPS[activeStep];

  return (
    <SmoothScrollProvider>
      <main className="min-h-screen bg-white text-zinc-900 relative selection:bg-zinc-900 selection:text-white font-outfit">
        <CustomCursor />
        <Navigation />

        {/* 1. HERO */}
        <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-14 sm:pb-20 overflow-hidden border-b border-zinc-800 bg-zinc-950 text-white">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src="/banner-2.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-zinc-950/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
                backgroundSize: "28px 28px",
                maskImage:
                  "linear-gradient(to bottom, black 0%, transparent 85%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, transparent 85%)",
              }}
            />
            <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>

          <div className="relative z-10 px-4 sm:px-8 lg:px-12 max-w-[1700px] mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300 font-bold mb-5 sm:mb-7"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Disciplines & Capabilities
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-end">
              <div className="lg:col-span-8 xl:col-span-9">
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={1}
                  className="font-black uppercase tracking-tight leading-[0.92] text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] select-none"
                >
                  Services
                  <span className="text-emerald-400">.</span>
                </motion.h1>
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  custom={2}
                  className="mt-4 sm:mt-6 flex items-center gap-3 sm:gap-4"
                >
                  <span className="h-px w-10 sm:w-20 bg-emerald-400" />
                  <p className="text-xs sm:text-sm lg:text-base font-mono font-extrabold uppercase tracking-[0.24em] text-emerald-300">
                    What we do — and how we make it pay
                  </p>
                </motion.div>
              </div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={3}
                className="lg:col-span-4 xl:col-span-3 flex lg:justify-end"
              >
                <div className="w-full lg:max-w-[15rem] lg:text-right border-t border-white/20 pt-4 lg:pt-6">
                  <span className="block font-black text-6xl lg:text-7xl text-emerald-400 leading-none">
                    {String(SERVICES.length).padStart(2, "0")}
                  </span>
                  <span className="mt-2.5 block text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-200 leading-relaxed">
                    Specialized divisions
                    <br />
                    One accountable team
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 lg:gap-12 pt-10 sm:pt-14">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={4}
                className="lg:col-span-7 flex flex-col items-start gap-6 sm:gap-8"
              >
                <p className="text-lg sm:text-2xl lg:text-[1.75rem] font-black uppercase tracking-tight leading-[1.16] text-white">
                  We engineer high-converting{" "}
                  <span className="text-emerald-400">
                    performance marketing
                  </span>{" "}
                  systems, bespoke e-commerce platforms and visual brand
                  identities built to accelerate revenue.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.05}>
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 px-7 py-4 rounded-xl bg-emerald-500 text-zinc-950 font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 shadow-lg active:scale-[0.98]"
                      data-cursor-pointer
                    >
                      <span>Start a project</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </Magnetic>
                  <a
                    href="#services-list"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-white/25 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-white/10 transition-colors"
                  >
                    Build your package
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={5}
                className="lg:col-span-4 lg:col-start-9 space-y-5 self-end"
              >
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  Every service at Virtual Velocity is built with measurable
                  business outcomes at its core: zero vanity metrics, zero
                  cookie-cutter templates and absolute transparency in
                  performance engineering.
                </p>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {HERO_STATS.map((s) => (
                    <div
                      key={s.label}
                      className="border-l border-white/20 pl-3 sm:pl-4"
                    >
                      <span
                        className={`inline-flex items-center gap-1.5 font-black text-xl sm:text-2xl leading-none ${
                          s.accent ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {s.icon && (
                          <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        )}
                        {s.value}
                      </span>
                      <span className="mt-1.5 block text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-zinc-300">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. LOGOS */}
        <ServicesClientLogosCarousel />

        {/* 3. SERVICES — filterable, selectable */}
        <section
          id="services-list"
          className="scroll-mt-24 px-4 sm:px-8 lg:px-12 max-w-[1700px] mx-auto pt-10 sm:pt-16 pb-28 sm:pb-32"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-emerald-600 font-extrabold mb-2">
                <Zap className="w-3.5 h-3.5" />
                <span>Pick what you need</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
                Build your own package
              </h2>
              <p className="mt-2 text-sm text-zinc-600 max-w-xl">
                Filter by discipline, tick the services you are interested in,
                and we will open the conversation with your selection ready.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter services by category"
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => {
                const on = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition-all ${
                      on
                        ? "bg-zinc-950 text-white border-zinc-950"
                        : "bg-white text-zinc-700 border-zinc-300 hover:border-zinc-900"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-zinc-200">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((service: Service) => {
                const id = String(service.id);
                const isOn = selected.includes(id);
                return (
                  <motion.article
                    id={id}
                    layout={!reduce}
                    key={id}
                    initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative scroll-mt-28 border-b border-zinc-200 py-7 sm:py-9 lg:py-11 px-2 sm:px-4 transition-colors duration-300 ${
                      isOn ? "bg-emerald-50/70" : "hover:bg-zinc-50/80"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                      {/* Number */}
                      <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start gap-3">
                        <span
                          className="font-mono font-black leading-none text-5xl sm:text-6xl lg:text-7xl text-transparent transition-colors duration-300 group-hover:text-emerald-500"
                          style={{ WebkitTextStroke: "1.5px #059669" }}
                        >
                          {service.number}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                          {service.category}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="lg:col-span-5 space-y-4">
                        <div>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-zinc-950 uppercase tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
                            {service.title}
                          </h3>
                          <p className="mt-2 text-sm text-zinc-700 leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-2">
                            Key deliverables
                          </p>
                          <ul className="flex flex-wrap gap-2">
                            {service.deliverables.map(
                              (d: string, i: number) => (
                                <li
                                  key={i}
                                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                  {d}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => toggle(id)}
                            aria-pressed={isOn}
                            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all active:scale-[0.97] ${
                              isOn
                                ? "bg-emerald-600 text-white"
                                : "bg-zinc-950 text-white hover:bg-emerald-600"
                            }`}
                          >
                            {isOn ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                            {isOn ? "Added" : "Add to my project"}
                          </button>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-zinc-900 hover:text-emerald-600 transition-colors"
                            data-cursor-pointer
                          >
                            Talk to us
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="lg:col-span-5">
                        <motion.div
                          initial={{
                            clipPath: reduce
                              ? "inset(0% 0% 0% 0% round 16px)"
                              : "inset(0% 0% 0% 55% round 16px)",
                          }}
                          whileInView={{
                            clipPath: "inset(0% 0% 0% 0% round 16px)",
                          }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative w-full h-[220px] sm:h-[260px] lg:h-[290px] xl:h-[320px] overflow-hidden shadow-md border border-zinc-200/80 bg-zinc-100"
                          style={{ borderRadius: 16 }}
                        >
                          {service.previewImage ? (
                            <Image
                              src={service.previewImage}
                              alt={service.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 42vw"
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-mono text-xs">
                              VIRTUAL VELOCITY SHOWCASE
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white gap-2">
                            <span className="font-black text-xs uppercase tracking-wide truncate">
                              {service.title}
                            </span>
                            <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-600 transition-colors">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        </section>

        {/* 4. PROCESS — interactive stepper */}
        <section className="py-14 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-[1700px] mx-auto border-t border-b border-zinc-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 pb-6 border-b border-zinc-200 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00A29F] font-extrabold mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Operational methodology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 uppercase tracking-tight leading-tight">
                How we deliver <br />
                <span className="text-[#00A29F]">predictable growth</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-700 max-w-md leading-relaxed">
              Our 4-stage deployment framework ensures every marketing dollar
              and line of code translates into measurable top-line scale.
            </p>
          </div>

          {/* Timeline rail */}
          <div className="relative mb-8 sm:mb-10">
            <div
              className="absolute left-0 right-0 top-[22px] h-px bg-zinc-200"
              aria-hidden="true"
            />
            <motion.div
              aria-hidden="true"
              className="absolute left-0 top-[22px] h-px bg-zinc-950 origin-left"
              animate={{
                width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%`,
              }}
              transition={{
                duration: reduce ? 0 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <div
              role="tablist"
              aria-label="Process stages"
              className="relative grid grid-cols-4"
            >
              {PROCESS_STEPS.map((s, i) => {
                const reached = i <= activeStep;
                return (
                  <button
                    key={s.step}
                    role="tab"
                    aria-selected={i === activeStep}
                    onClick={() => setActiveStep(i)}
                    onMouseEnter={() => setActiveStep(i)}
                    className={`flex flex-col items-center gap-2 group ${
                      i === 0
                        ? "items-start"
                        : i === PROCESS_STEPS.length - 1
                          ? "items-end"
                          : ""
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-xs font-black transition-all duration-300 ${
                        reached
                          ? `${s.dot} border-transparent text-white scale-100`
                          : "bg-white border-zinc-300 text-zinc-500 group-hover:border-zinc-900"
                      } ${i === activeStep ? "ring-4 ring-zinc-900/10 scale-110" : ""}`}
                    >
                      {s.step}
                    </span>
                    <span
                      className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
                        i === activeStep ? "text-zinc-950" : "text-zinc-500"
                      }`}
                    >
                      {s.short}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: 0.3 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-3xl border p-6 sm:p-10 lg:p-12 ${step.panel}`}
            >
              <div className="lg:col-span-3">
                <span
                  className={`block font-mono font-black leading-none text-7xl sm:text-8xl lg:text-9xl ${step.numColor}`}
                >
                  {step.step}
                </span>
              </div>
              <div className="lg:col-span-6">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 uppercase tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="lg:col-span-3 lg:border-l lg:border-black/10 lg:pl-8 flex flex-col justify-end">
                <span className="block text-[10px] font-mono text-zinc-600 uppercase tracking-wider mb-1">
                  You receive
                </span>
                <span className={`text-base font-bold ${step.badgeColor}`}>
                  {step.deliverable}
                </span>
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                    disabled={activeStep === 0}
                    aria-label="Previous stage"
                    className="h-10 w-10 rounded-full border border-zinc-900/20 bg-white/70 flex items-center justify-center disabled:opacity-30 hover:bg-white transition"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveStep((p) =>
                        Math.min(PROCESS_STEPS.length - 1, p + 1),
                      )
                    }
                    disabled={activeStep === PROCESS_STEPS.length - 1}
                    aria-label="Next stage"
                    className="h-10 w-10 rounded-full border border-zinc-900/20 bg-white/70 flex items-center justify-center disabled:opacity-30 hover:bg-white transition"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 5. CLOSING CTA */}
        <section className="px-4 sm:px-8 lg:px-12 max-w-[1700px] mx-auto py-14 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-12 sm:px-12 sm:py-16 text-white">
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.05] max-w-2xl">
                Ready to turn spend into{" "}
                <span className="text-emerald-400">revenue</span>?
              </h2>
              <Link
                href={contactHref}
                className="group inline-flex items-center gap-3 self-start px-8 py-4 rounded-xl bg-emerald-500 text-zinc-950 font-black text-xs tracking-[0.2em] uppercase hover:bg-white transition-colors"
                data-cursor-pointer
              >
                {selectedServices.length
                  ? `Discuss ${selectedServices.length} service${selectedServices.length > 1 ? "s" : ""}`
                  : "Start a project"}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />

        {/* Floating selection bar */}
        <AnimatePresence>
          {selectedServices.length > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-950/95 p-3 pl-5 text-white shadow-2xl backdrop-blur"
              role="status"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    {selectedServices.length} selected
                  </p>
                  <p className="truncate text-xs text-zinc-300">
                    {selectedServices.map((s: Service) => s.title).join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSelected([])}
                    aria-label="Clear selection"
                    className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Link
                    href={contactHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-zinc-950 hover:bg-white transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScrollProvider>
  );
}
