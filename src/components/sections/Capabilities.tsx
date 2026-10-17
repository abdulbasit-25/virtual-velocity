"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CAPABILITIES } from "@/data/agencyData";
import { Cpu, Palette, Sparkles, Terminal, Layers, Compass } from "lucide-react";

const ICONS = [Palette, Terminal, Cpu, Sparkles, Layers, Compass];

export const Capabilities = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-24 sm:py-36 px-6 sm:px-12 max-w-[1700px] mx-auto relative overflow-hidden bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-12 mb-16">
        <div>
          <span className="text-meta text-emerald-600 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-600" /> EXPERIMENTAL LABS
          </span>
          <h2 className="text-section-title font-outfit text-zinc-900 mt-2">
            CORE <br />
            <span className="text-emerald-600 font-extrabold">CAPABILITIES</span>
          </h2>
        </div>
        <p className="mt-6 md:mt-0 text-sm sm:text-base text-zinc-700 max-w-md font-light">
          An exploratory matrix of visual engineering, shader development, and intelligent software primitives.
        </p>
      </div>

      {/* Floating Capability Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CAPABILITIES.map((cap, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className="group p-8 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-900 transition-all duration-500 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-sm"
              data-cursor-pointer
            >
              {/* Top Accent Icon */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white border border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white text-zinc-900 transition-colors duration-300 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full bg-white">
                  {cap.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl font-outfit font-extrabold text-zinc-900 group-hover:text-zinc-700 transition-colors uppercase tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm text-zinc-700 font-light leading-relaxed">
                  {cap.desc}
                </p>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-600 group-hover:text-zinc-800 transition-colors">
                <span>MODULE 0{idx + 1}</span>
                <span className="text-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity font-bold">● ACTIVE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
