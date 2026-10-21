"use client";

import { motion } from "framer-motion";
import { ArrowDown, Globe, ShieldCheck, Zap } from "lucide-react";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroCanvas3D } from "@/components/ui/HeroCanvas3D";
import { AGENCY_INFO, AGENCY_METRICS } from "@/data/agencyData";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[90vh] lg:min-h-screen max-h-[900px] sm:max-h-[1050px] flex flex-col justify-between pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-12 max-w-[1700px] mx-auto overflow-hidden bg-white text-zinc-900">
      {/* 3D WebGL Wireframe Torus Knot & Particle Field */}
      <div className="hidden lg:block">
          <HeroCanvas3D />
        </div>
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-zinc-50 z-0" />

      {/* Dynamic Background Light Spheres */}
      <div className="absolute top-1/4 -right-20 sm:-right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-zinc-200/40 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-20 sm:-left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-zinc-100/60 blur-[160px] pointer-events-none" />

      {/* Top Metadata Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-zinc-200 pb-4 sm:pb-6 text-[10px] sm:text-xs font-mono text-zinc-700"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 animate-pulse" />
          <span className="font-semibold text-zinc-900 hidden sm:inline">GLOBAL OPERATIONS</span>
          <span className="inline sm:hidden">•</span>
          <span className="font-semibold text-zinc-900">UNITED STATES & PAKISTAN</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono text-zinc-900 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
          <span className="uppercase tracking-widest">{AGENCY_INFO.tagline}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-zinc-700">
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-[10px] sm:text-[11px] border border-emerald-200">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-600 animate-ping" />
            ACCEPTING NEW CLIENTS
          </span>
        </div>
      </motion.div>

      {/* Main Hero Headline - 3 Lines with Decreasing Sizing & Emerald Accents */}
      <div className="relative z-10 my-auto py-6 sm:py-10 lg:py-16 flex flex-col justify-center select-none space-y-2 sm:space-y-3">
        {/* Line 1 - Largest */}
        <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-[4rem] font-outfit font-black tracking-tighter text-zinc-900 uppercase leading-[0.92] flex flex-wrap items-center gap-2 sm:gap-4">
          <SplitTextReveal text="FULL-SERVICE" accentColor="#00A29F" highlightWords={["SERVICE", "FULL-SERVICE"]} delay={0.2} />
          <SplitTextReveal text="DIGITAL" accentColor="#00A29F" highlightWords={["DIGITAL"]} delay={0.35} />
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden sm:inline-block text-[10px] sm:text-xs font-outfit font-extrabold tracking-widest text-emerald-600 border border-emerald-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-emerald-50 uppercase shadow-xs align-middle"
          >
            [PPC • SEO • CRO • TECH]
          </motion.span>
        </div>

        {/* Line 2 - Medium Decreased Size */}
        <div className="text-2xl sm:text-3xl lg:text-[2.75rem] xl:text-[3rem] font-outfit font-black tracking-tight text-zinc-900 uppercase leading-[0.95]">
          <SplitTextReveal text="MARKETING & TECH SOLUTIONS" accentColor="#00A29F" highlightWords={["SOLUTIONS"]} delay={0.5} />
        </div>

        {/* Line 3 - Smallest Decreased Size */}
        <div className="text-xl sm:text-2xl lg:text-[2rem] xl:text-[2.25rem] font-outfit font-black tracking-tight text-zinc-900 uppercase leading-[0.98]">
          <SplitTextReveal text="THAT SCALES YOUR BRAND REVENUE." accentColor="#00A29F" highlightWords={["REVENUE", "BRAND"]} delay={0.65} />
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end border-t border-zinc-200 pt-6 sm:pt-8"
      >
        <div className="md:col-span-7 space-y-2">
          <p className="text-[10px] sm:text-xs font-outfit font-extrabold text-emerald-600 tracking-wider flex items-center gap-1.5 uppercase">
            <Zap className="w-3.5 h-3.5 text-emerald-600" /> PRACTICAL DELIVERABLE OUTCOMES
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-700 max-w-2xl font-normal leading-relaxed">
            {AGENCY_INFO.subTagline}
          </p>
        </div>

        <div className="md:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-4 sm:gap-6">
          <div className="flex items-center gap-4 sm:gap-8 text-[10px] sm:text-xs font-mono tracking-widest text-zinc-700">
            <div>
              <span className="block text-zinc-900 font-black text-lg sm:text-xl">{AGENCY_METRICS.campaignsManaged.display}</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-700">PROJECTS DELIVERED</span>
            </div>
            <div className="w-px h-6 sm:h-8 bg-zinc-200" />
            <div>
              <span className="block text-emerald-600 font-black text-lg sm:text-xl">4.8x</span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-700">AVG CLIENT ROAS</span>
            </div>
          </div>

          <Magnetic strength={0.05}>
            <a
              href="#contact"
              className="group flex items-center gap-2 sm:gap-3 px-5 sm:px-8 py-3 sm:py-4 rounded-xl bg-emerald-600 text-white font-outfit font-extrabold text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:bg-emerald-700 transition-all duration-200 shadow-md shadow-emerald-600/20 active:scale-[0.98]"
              data-cursor-pointer
            >
              <span>GET A QUOTE</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-y-1 transition-transform duration-200" />
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
};
