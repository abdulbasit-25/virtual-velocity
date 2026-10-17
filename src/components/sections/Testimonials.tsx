"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/data/agencyData";
import { ArrowLeft, ArrowRight, Quote, Pause, Play, Award } from "lucide-react";

const AUTO_ROTATE_INTERVAL = 2000; // 2 seconds per review

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isPausedHover, setIsPausedHover] = useState<boolean>(false);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Timer effect for auto-changing reviews
  useEffect(() => {
    if (!isPlaying || isPausedHover) return;

    const timer = setInterval(() => {
      nextTestimonial();
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isPausedHover, nextTestimonial]);

  const current = TESTIMONIALS[currentIndex];

  return (
    <section
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      className="py-24 sm:py-36 px-6 sm:px-12 max-w-[1700px] mx-auto select-none font-outfit"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-12 mb-16 gap-6">
        <div>
          <span className="text-xs font-outfit font-extrabold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" /> CLIENT REVIEWS & PARTNER ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-6xl font-outfit font-black text-zinc-950 mt-2 uppercase tracking-tight">
            WHAT PARTNERS <br />
            <span className="text-emerald-600 font-black">SAY</span>
          </h2>
        </div>

        {/* Carousel Controls & Auto-Timer Switch */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-xs font-outfit font-extrabold px-4 py-2.5 rounded-full border border-emerald-200 bg-emerald-50 hover:border-emerald-400 hover:bg-emerald-100 text-emerald-800 transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            aria-label={isPlaying ? "Pause automatic reviews" : "Play automatic reviews"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-emerald-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{isPlaying ? (isPausedHover ? "TIMER PAUSED" : "AUTO-ROTATING") : "AUTO OFF"}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-emerald-600 hover:text-white text-zinc-950 transition-all duration-300 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              aria-label="Previous review"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-outfit font-bold text-zinc-700 px-1">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={nextTestimonial}
              className="p-3.5 rounded-full border border-zinc-300 bg-white hover:bg-emerald-600 hover:text-white text-zinc-950 transition-all duration-300 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              aria-label="Next review"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Quote Display Container */}
      <div className="relative min-h-[340px] p-8 sm:p-12 rounded-3xl bg-zinc-50 border-2 border-zinc-200 flex flex-col justify-between overflow-hidden shadow-md">
        {/* Animated Auto-Timer Bar */}
        {isPlaying && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 overflow-hidden">
            <motion.div
              key={`${currentIndex}-${isPlaying}-${isPausedHover}`}
              initial={{ width: "0%" }}
              animate={{ width: isPausedHover ? "0%" : "100%" }}
              transition={{ duration: AUTO_ROTATE_INTERVAL / 1000, ease: "linear" }}
              className="h-full bg-emerald-600"
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="relative">
              <Quote className="w-12 h-12 text-emerald-600/30 mb-4" />
              <blockquote className="text-2xl sm:text-4xl md:text-5xl font-outfit font-black text-zinc-950 tracking-tight uppercase leading-[1.15]">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-200">
              <div>
                <h3 className="text-lg font-outfit font-extrabold text-emerald-600 uppercase tracking-wider">
                  {current.author}
                </h3>
                <p className="text-xs font-outfit font-bold text-zinc-700">
                  {current.role} • <span className="text-zinc-950 font-extrabold">{current.company}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <span className="text-xs font-outfit font-bold text-zinc-500 uppercase tracking-wider">
                  METRIC: {current.metric}
                </span>
                <span className="text-xs font-outfit font-bold text-emerald-700 uppercase tracking-wider">
                  VERIFIED PARTNERSHIP
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Dot Nav Indicators */}
        <div className="flex items-center gap-2 pt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
                idx === currentIndex ? "w-8 bg-emerald-600" : "w-2 bg-zinc-300 hover:bg-zinc-500"
              }`}
              aria-label={`Jump to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
