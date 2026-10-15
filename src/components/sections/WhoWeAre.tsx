"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/sections/home/primitives";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TICKER_ITEMS = [
  "Creative Brand House",
  "Performance Marketing",
  "Google Ads PPC & Meta Ads",
  "Technical SEO & CRO",
  "Custom Web & App Engineering",
  "Social Media & Influencer Growth",
  "Commercial Videography",
  "Brand Architecture & Identity",
  "AI-Driven Growth Solutions",
];

/* Single run of the bottom ticker — rendered twice for a seamless -50% loop
   driven by the existing `animate-marquee-left` keyframes in globals.css */
const TickerRun = () => (
  <div className="flex shrink-0 items-center gap-4 sm:gap-8 pr-4 sm:pr-8">
    <span className="font-medium text-base sm:text-lg uppercase tracking-tighter text-zinc-800 flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      VIRTUAL VELOCITY
    </span>
    <span className="font-mono text-sm sm:text-base text-emerald-500 font-normal">/</span>
    {TICKER_ITEMS.map((word) => (
      <div key={word} className="flex items-center gap-4 sm:gap-8">
        <span className="font-normal text-sm sm:text-base uppercase tracking-tight text-zinc-600 font-outfit">
          {word}
        </span>
        <span className="font-mono text-xs sm:text-sm text-emerald-400 font-normal">✦</span>
      </div>
    ))}
  </div>
);

export const WhoWeAre = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="who-we-are"
      className="relative isolate overflow-hidden bg-white text-zinc-900 font-outfit select-none border-t border-zinc-200"
    >
      {/* Ambient blurred background accents */}
      <div className="absolute top-0 -left-24 sm:-left-40 w-[240px] h-[240px] sm:w-[560px] sm:h-[560px] rounded-full bg-emerald-100/40 sm:bg-emerald-100/60 blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu" style={{ transform: "translate3d(0,0,0)" }} />
      <div className="absolute bottom-0 -right-24 sm:-right-40 w-[240px] h-[240px] sm:w-[560px] sm:h-[560px] rounded-full bg-emerald-100/35 sm:bg-emerald-100/50 blur-[100px] sm:blur-[140px] pointer-events-none transform-gpu" style={{ transform: "translate3d(0,0,0)" }} />

      <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14 lg:py-16">
        <SectionHeader
          eyebrow="Who We Are"
          index="03"
          title={<>We are <span className="text-[#00A29F]">not</span> your usual marketing agency.</>}
          aside="The Agency Manifesto"
        />

        {/* Pure narrative layout — clean, compact & professional */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-zinc-200 max-w-4xl space-y-4 sm:space-y-6">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE, delay: 0.1 }}
            className="text-xl sm:text-3xl text-zinc-900 font-lora italic font-normal leading-snug"
          >
            We are a creative house built for brands that want to be{" "}
            <span className="font-semibold text-emerald-600 not-italic">seen</span>,{" "}
            <span className="font-semibold text-emerald-600 not-italic">remembered</span>, and{" "}
            <span className="font-semibold text-emerald-600 not-italic">talked about</span>.
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE, delay: 0.15 }}
            className="text-sm sm:text-base lg:text-lg text-zinc-800 font-medium leading-relaxed"
          >
            From strategy and creative direction to content, social media, campaigns, and brand storytelling, we bring every element together to build brands with a distinct voice and presence.
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE, delay: 0.2 }}
            className="text-base sm:text-xl font-bold uppercase text-zinc-950 tracking-tight leading-snug pt-4 border-t border-zinc-100"
          >
            We don&apos;t believe in simply filling content calendars. We create{" "}
            <span className="text-emerald-600">ideas</span>, build{" "}
            <span className="text-emerald-600">identities</span>, and turn brands into{" "}
            <span className="text-emerald-600">experiences</span>.
          </motion.p>
        </div>
      </div>

      {/* Bottom ticker strip */}
      <div
        aria-hidden="true"
        className="relative z-10 border-t border-zinc-200/80 bg-zinc-50/50 hover-marquee overflow-hidden whitespace-nowrap py-3 sm:py-3.5"
      >
        <div className="animate-marquee-left flex items-center">
          <TickerRun />
          <TickerRun />
        </div>
      </div>
    </section>
  );
};
