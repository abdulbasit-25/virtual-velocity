"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

/* ============================== DATA ============================== */

const CLOUD =
  "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400";

const GOLD = "text-[#fab730]";
const TEAL = "text-[#00A29F]";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Reusable edge / overlap styles (full class strings so Tailwind keeps them) */
const R_BOTTOM =
  "rounded-b-2xl sm:rounded-b-3xl md:rounded-b-[2.5rem] lg:rounded-b-[3.5rem]";
const R_TOP =
  "rounded-t-2xl sm:rounded-t-3xl md:rounded-t-[2.5rem] lg:rounded-t-[3.5rem]";
const R_ALL =
  "rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3.5rem]";
const OVERLAP_BOTTOM = "-mb-6 sm:-mb-10 md:-mb-14 lg:-mb-20";
const OVERLAP_TOP = "-mt-6 sm:-mt-10 md:-mt-14 lg:-mt-20";

type Accent = typeof GOLD | typeof TEAL;

type Overlay = {
  /** where the text block sits on the artboard */
  place: "bottom-left" | "top-right";
  /** extra position classes (override default offsets) */
  posClass: string;
  eyebrow: string;
  eyebrowColor: Accent;
  ping?: boolean;
  lines: { text: string; accent?: Accent }[];
  sub?: string;
  enter: "up" | "left" | "scale";
};

type Slide = {
  id: string;
  src: string;
  label: string;
  /** wrapper classes controlling z-index, overlap, rounding, shadow */
  wrap: string;
  priority?: boolean;
  overlay?: Overlay;
  fadeBottom?: boolean;
};

const SLIDES: Slide[] = [
  {
    id: "01",
    src: `${CLOUD}/v1790005642/Artboard_1.png`,
    label: "Cresto Pizza brand introduction",
    wrap: `z-10 ${OVERLAP_BOTTOM} ${R_BOTTOM} overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]`,
    priority: true,
  },
  {
    id: "02",
    src: `${CLOUD}/v1790005642/Artboard_2.png`,
    label: "Cresto Pizza woodfire crust",
    wrap: "z-0",
    priority: true,
    overlay: {
      place: "bottom-left",
      posClass:
        "bottom-8 sm:bottom-14 md:bottom-20 left-6 sm:left-12 lg:left-16",
      eyebrow: "WOODFIRE CRUST • STONE-HEARTH FIRED",
      eyebrowColor: GOLD,
      ping: true,
      lines: [
        { text: "FRESH OUT OF THE OVEN." },
        { text: "DELIVERED AT PEAK CRISP.", accent: GOLD },
      ],
      enter: "up",
    },
  },
  {
    id: "03",
    src: `${CLOUD}/v1790005643/Artboard_3.png`,
    label: "Cresto Pizza brand artwork",
    wrap: "z-0",
  },
  {
    id: "04",
    src: `${CLOUD}/v1790005643/Artboard_4.png`,
    label: "Cresto Pizza artisanal recipe",
    wrap: `z-10 ${OVERLAP_TOP} ${R_TOP} overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`,
    overlay: {
      place: "top-right",
      posClass:
        "top-8 sm:top-14 md:top-20 right-6 sm:right-12 lg:right-16 text-right",
      eyebrow: "AUTHENTIC ARTISANAL RECIPE",
      eyebrowColor: TEAL,
      lines: [
        { text: "48-HOUR FERMENTED DOUGH." },
        { text: "SAN MARZANO DOP SAUCE.", accent: TEAL },
      ],
      sub: "100% WHOLE MILK MOZZARELLA • FIRED AT 450°C",
      enter: "scale",
    },
  },
  {
    id: "05",
    src: `${CLOUD}/v1790005644/Artboard_5.png`,
    label: "Cresto Pizza brand system",
    wrap: `z-20 ${OVERLAP_BOTTOM} ${R_BOTTOM} overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]`,
  },
  {
    id: "07",
    src: `${CLOUD}/v1790005644/Artboard_7.png`,
    label: "Cresto Pizza packaging",
    wrap: `z-10 -mb-8 sm:-mb-14 md:-mb-20 lg:-mb-28 ${R_BOTTOM} overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]`,
    overlay: {
      place: "bottom-left",
      posClass:
        "bottom-12 sm:bottom-16 md:bottom-24 lg:bottom-28 left-6 sm:left-12 lg:left-16",
      eyebrow: "HEAT-LOCKING CARTON ARCHITECTURE",
      eyebrowColor: GOLD,
      lines: [
        { text: "STEAM-VENTED CORNERS." },
        { text: "ZERO SOGGY PIZZA.", accent: TEAL },
      ],
      enter: "left",
    },
  },
  {
    id: "08",
    src: `${CLOUD}/v1790005644/Artboard_8.png`,
    label: "Cresto Pizza brand applications",
    wrap: "z-0",
  },
  {
    id: "09",
    src: `${CLOUD}/v1790005644/Artboard_9.png`,
    label: "Cresto Pizza delivery",
    wrap: `z-10 -mt-[5.6vw] -mb-[5.6vw] ${R_ALL} overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.7)]`,
    overlay: {
      place: "bottom-left",
      posClass:
        "bottom-8 sm:bottom-14 md:bottom-20 left-6 sm:left-12 lg:left-16",
      eyebrow: "HOT DELIVERY TO YOUR HANDS",
      eyebrowColor: GOLD,
      lines: [{ text: "MAGIC IN EVERY SLICE." }],
      enter: "up",
    },
  },
  {
    id: "10",
    src: `${CLOUD}/v1790005644/Artboard_10.png`,
    label: "Cresto Pizza brand mockups",
    wrap: "z-0",
  },
  {
    id: "11",
    src: `${CLOUD}/v1790005642/Artboard_11.png`,
    label: "Cresto Pizza closing artwork",
    wrap: "z-0",
    fadeBottom: true,
  },
];

/* ============================ COMPONENTS ============================ */

function SlideOverlay({ overlay }: { overlay: Overlay }) {
  const reduce = useReducedMotion();
  const hidden = reduce
    ? { opacity: 0 }
    : overlay.enter === "left"
      ? { opacity: 0, x: -30 }
      : overlay.enter === "scale"
        ? { opacity: 0, scale: 0.94 }
        : { opacity: 0, y: 32 };

  const isTop = overlay.place === "top-right";

  return (
    <>
      {/* Legibility scrim behind the text */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 h-1/2 ${
          isTop
            ? "top-0 bg-gradient-to-b from-black/55 to-transparent"
            : "bottom-0 bg-gradient-to-t from-black/55 to-transparent"
        }`}
      />

      <motion.div
        initial={hidden}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`pointer-events-none absolute z-20 ${overlay.posClass}`}
      >
        <div
          className={`mb-2 flex items-center gap-2 ${
            isTop ? "justify-end" : ""
          }`}
        >
          {overlay.ping && (
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#fab730] opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fab730]" />
            </span>
          )}
          <span
            className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-xs ${overlay.eyebrowColor}`}
          >
            {overlay.eyebrow}
          </span>
        </div>

        <h2 className="font-outfit text-2xl font-black uppercase leading-[0.95] tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] sm:text-4xl md:text-5xl lg:text-6xl">
          {overlay.lines.map((line) => (
            <span key={line.text} className={`block ${line.accent ?? ""}`}>
              {line.text}
            </span>
          ))}
        </h2>

        {overlay.sub && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] sm:text-xs">
            {overlay.sub}
          </p>
        )}
      </motion.div>
    </>
  );
}

/* ============================== PAGE ============================== */

export function BrandingClient() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="m-0 w-full overflow-x-hidden bg-[#0a0a0a] p-0">
        <h1 className="sr-only">Cresto Pizza Branding Case Study</h1>
        {/* Portfolio slides, joined end-to-end with overlapping rounded edges */}
        <section
          aria-label="Cresto Pizza branding case study"
          className="m-0 flex w-full flex-col p-0"
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className={`relative m-0 w-full bg-[#141414] p-0 leading-none ${slide.wrap}`}
            >
              <Image
                src={slide.src}
                alt={`${slide.label} (slide ${slide.id})`}
                width={1596}
                height={897}
                priority={slide.priority}
                sizes="100vw"
                draggable={false}
                className="m-0 block h-auto w-full select-none p-0"
              />

              {slide.overlay && <SlideOverlay overlay={slide.overlay} />}

              {slide.fadeBottom && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] sm:h-40 md:h-56"
                />
              )}
            </div>
          ))}
        </section>

        {/* Closing call to action */}
        <section className="relative isolate px-4 pb-16 pt-6 text-center sm:px-8 sm:pb-24 md:pt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A29F]/20 blur-3xl"
          />
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#00A29F] sm:text-xs">
            Cresto Pizza • Brand Case Study
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl font-outfit text-3xl font-black uppercase leading-[1] tracking-tight text-white sm:text-5xl">
            Want a brand story like{" "}
            <span className="text-[#00A29F]">this one?</span>
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              data-cursor-pointer
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-outfit text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-950 shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#00A29F] hover:text-white active:scale-[0.98] sm:w-auto"
            >
              Start your project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/services"
              data-cursor-pointer
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 font-outfit text-[11px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur transition-all duration-300 hover:border-[#00A29F] hover:text-[#2dd4cf] active:scale-[0.98] sm:w-auto"
            >
              Explore services
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* Gradient bridging the dark portfolio into the teal footer */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative h-24 w-full overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#00A29F] sm:h-32 md:h-44"
        >
          <div className="absolute inset-0 bg-radial-[at_50%_100%] from-[#00A29F]/30 via-transparent to-transparent" />
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
