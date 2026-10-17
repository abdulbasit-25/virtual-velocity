"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/data/agencyData";
import { Plus, Minus, ShieldCheck } from "lucide-react";

export const Services = () => {
  const [activeService, setActiveService] = useState<string | null>("01");

  return (
    <section id="services" className="py-24 sm:py-36 px-6 sm:px-12 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-12 mb-16">
        <div>
          <span className="text-meta text-emerald-600 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> CAPABILITIES & DISCIPLINE
          </span>
          <h2 className="text-4xl sm:text-6xl font-outfit font-black text-zinc-950 uppercase mt-2 tracking-tight">
            PERFORMANCE <br />
            <span className="text-emerald-600 font-extrabold">MARKETING SERVICES</span>
          </h2>
        </div>
        <p className="mt-6 md:mt-0 text-sm sm:text-base text-zinc-700 max-w-md font-light leading-relaxed">
          We operate at the precise intersection of high-converting PPC campaign management, technical search optimization, and AI-driven growth analytics.
        </p>
      </div>

      {/* Services Typographic Interactive Rows */}
      <div className="border-t border-zinc-200">
        {SERVICES.map((service) => {
          const isOpen = activeService === service.number;
          return (
            <div
              key={service.id}
              onMouseEnter={() => setActiveService(service.number)}
              className={`group border-b border-zinc-200 transition-colors duration-500 ${
                isOpen ? "bg-zinc-50/80" : "hover:bg-zinc-50/40"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setActiveService(isOpen ? null : service.number)}
                className="w-full py-10 sm:py-14 px-4 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2"
                data-cursor-pointer
              >
                {/* Number & Title */}
                <span className="flex items-baseline gap-6 sm:gap-12">
                  <span className="text-xl sm:text-3xl font-outfit font-extrabold text-emerald-600 group-hover:translate-x-2 transition-transform duration-300">
                    {service.number}
                  </span>
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-2xl sm:text-4xl md:text-5xl font-outfit font-extrabold text-zinc-950 group-hover:text-emerald-600 transition-colors duration-300 uppercase tracking-tight"
                  >
                    {service.title}
                  </span>
                </span>

                {/* Right Meta Indicator */}
                <span className="flex items-center gap-6 self-end md:self-auto">
                  <span className="hidden sm:inline-block text-xs font-outfit font-bold text-zinc-700 border border-zinc-200 px-3 py-1 rounded-full uppercase bg-white">
                    {service.category}
                  </span>
                  <span className="p-3 rounded-full border border-zinc-300 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white text-zinc-950 transition-all duration-300 shadow-xs">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </span>
              </button>

              {/* Accordion Expansion */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-12 px-4 sm:px-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-zinc-200/80">
                      {/* Description & Deliverables */}
                      <div className="md:col-span-7 space-y-6">
                        <p className="text-base sm:text-lg text-zinc-700 font-light leading-relaxed">
                          {service.description}
                        </p>

                        <div className="space-y-3 pt-2">
                          <span className="text-xs font-outfit font-extrabold text-emerald-600 tracking-wider uppercase block">KEY CAMPAIGN DELIVERABLES:</span>
                          <div className="grid grid-cols-2 gap-3">
                            {service.deliverables.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs font-outfit font-bold text-zinc-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Floating Preview Image Thumbnail */}
                      <div className="md:col-span-5">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border-2 border-zinc-300 shadow-lg">
                          <img
                            src={service.previewImage}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent flex items-end p-4">
                            <span className="text-xs font-outfit font-bold text-white">{service.category} PREVIEW</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
