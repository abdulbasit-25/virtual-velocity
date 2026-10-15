"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, Target, Megaphone, Palette } from "lucide-react";
import { AGENCY_METRICS } from "@/data/agencyData";
import { CountUp, SectionHeader } from "@/components/sections/home/primitives";

export const About = () => {
  const reduceMotion = useReducedMotion();
  const pillars = [
    {
      icon: Target,
      label: "Performance Marketing",
      desc: "Data-driven Google Ads, PPC & paid media that consistently hit target ROAS.",
      accent: "text-emerald-600",
      href: "/services#performance-marketing",
    },
    {
      icon: TrendingUp,
      label: "Organic SEO Growth",
      desc: "Technical SEO, authority building, and content pipelines that compound traffic.",
      accent: "text-emerald-500",
      href: "/services#digital-marketing",
    },
    {
      icon: Megaphone,
      label: "Social & Creative",
      desc: "Scroll-stopping content, brand narratives, and paid social at scale.",
      accent: "text-emerald-700",
      href: "/services#digital-marketing",
    },
    {
      icon: Palette,
      label: "Brand & Creative Direction",
      desc: "Identity systems, visual language, and art direction that build recognition.",
      accent: "text-emerald-400",
      href: "/branding",
    },
  ];

  return (
    <section id="about" className="pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-10 md:px-16 max-w-[1700px] mx-auto relative overflow-hidden bg-white border-t border-zinc-200">
      {/* Multi-layer blurred background accents */}
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-emerald-100/60 blur-[140px] pointer-events-none transform-gpu" style={{ transform: "translate3d(0,0,0)" }} />
      <div className="absolute bottom-1/4 -left-40 w-[520px] h-[520px] rounded-full bg-emerald-100/60 blur-[140px] pointer-events-none transform-gpu" style={{ transform: "translate3d(0,0,0)" }} />
      <div className="absolute top-10 left-1/3 w-96 h-96 rounded-full bg-zinc-100 blur-[100px] pointer-events-none transform-gpu" style={{ transform: "translate3d(0,0,0)" }} />

      <div className="relative z-10">
        <SectionHeader
          eyebrow="About Virtual Velocity"
          index="02"
          title={<>A digital marketing agency built for <span className="text-[#00A29F]">scale.</span></>}
          aside={
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
              <span>Est. {AGENCY_METRICS.establishedYear}</span>
              <span aria-hidden="true" className="h-4 w-px bg-zinc-300" />
              <span className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse motion-reduce:animate-none" />
                24/7 Operations
              </span>
            </div>
          }
        />

        {/* Narrative + office clocks grid */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4 border-t border-zinc-200"
        >
          {/* Narrative text */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <p className="text-lg sm:text-2xl text-zinc-800 font-lora italic font-normal leading-relaxed">
              Virtual Velocity is a creative house where strategy, creativity, technology, and digital growth come together to build brands that stand out and grow.
            </p>

            <p className="text-sm sm:text-base text-zinc-600 font-normal leading-[1.75]">
              From social media and performance marketing to branding, influencer campaigns, AI-powered solutions, websites, and digital experiences — we bring creativity and technology together under one roof to turn your brand vision into real results.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-baseline gap-2">
                <CountUp
                  value={AGENCY_METRICS.campaignsManaged.target}
                  suffix="+"
                  className="font-mono text-2xl font-black text-emerald-600 sm:text-4xl"
                />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold pb-0.5">Campaigns Launched</span>
              </div>
              <div className="w-px h-8 sm:h-10 bg-zinc-200" />
              <div className="flex items-baseline gap-2">
                <CountUp
                  value={AGENCY_METRICS.averageRoas.target}
                  suffix="x"
                  decimals={1}
                  className="font-mono text-2xl font-black text-black sm:text-4xl"
                />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-black font-bold pb-0.5">Avg. Client ROAS</span>
              </div>
            </div>
          </div>

          {/* Capability pillars + studio clocks */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
            {/* Four service pillars grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 }}
                  className="group relative p-4 sm:p-5 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-emerald-200 pointer-events-none" />
                  <p.icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-2.5 ${p.accent}`} />
                  <p className="text-sm sm:text-[15px] font-bold text-black mb-1 tracking-tight leading-snug">
                    {p.label}
                  </p>
                  <p className="text-[12px] sm:text-[13px] text-black font-normal leading-relaxed">
                    {p.desc}
                  </p>
                  <Link
                    href={p.href}
                    className="mt-4 inline-flex min-h-11 items-center gap-1 text-xs font-bold text-[#006766] underline decoration-[#00A29F]/35 underline-offset-4 transition-colors hover:text-[#004a49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
