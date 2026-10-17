"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

interface LogoAsset {
  src: string;
  alt: string;
}

const LOGO = (file: string, alt: string): LogoAsset => ({
  src: `/All logo in SVG Format/${file}`,
  alt,
});

// Inner orbit (12 client brands)
const INNER_LOGOS: LogoAsset[] = [
  LOGO("Anta logo.svg", "Anta"),
  LOGO("Glamar.svg", "Glamar"),
  LOGO("Gloria Jeans logo.svg", "Gloria Jeans"),
  LOGO("pizza hut.svg", "Pizza Hut"),
  LOGO("Blue world city.svg", "Blue World City"),
  LOGO("Red apple.svg", "Red Apple"),
  LOGO("Megazone logo.svg", "Megazone"),
  LOGO("chinaar.svg", "Chinaar"),
  LOGO("maple vista.svg", "Maple Vista"),
  LOGO("revival.svg", "Revival"),
  LOGO("oxbite.svg", "Oxbite"),
  LOGO("chaaye khana.svg", "Chaaye Khana"),
];

// Outer orbit (18 client brands)
const OUTER_LOGOS: LogoAsset[] = [
  LOGO("Unied nations.svg", "United Nations"),
  LOGO("andaz.svg", "Andaz"),
  LOGO("ariston.svg", "Ariston"),
  LOGO("capital arena.svg", "Capital Arena"),
  LOGO("cresto.svg", "Cresto"),
  LOGO("de asthethic.svg", "De Aesthetic"),
  LOGO("desi chapter.svg", "Desi Chapter"),
  LOGO("Untitled-1.svg", "Galaxy Hayatabad"),
  LOGO("iplexmarketing.svg", "IPlex Marketing"),
  LOGO("kapacious.svg", "Kapacious"),
  LOGO("levante.svg", "Levante"),
  LOGO("media sniffers.svg", "Media Sniffers"),
  LOGO("Mughlai logo.svg", "Mughlai"),
  LOGO("Pamir.svg", "Pamir"),
  LOGO("shake wake.svg", "Shake Wake"),
  LOGO("slice and cone.svg", "Slice and Cone"),
  LOGO("TSL.svg", "TSL"),
  LOGO("wild wings logo.svg", "Wild Wings"),
];

const ALL_LOGOS = [...INNER_LOGOS, ...OUTER_LOGOS];

// Semicircle arrangement: inner ring forms the LEFT half-circle (180°) around
// the middle logo, outer ring forms the RIGHT half-circle (180°). Angles are
// offset so no logo sits directly behind the center anchor.
const SEMICIRCLE_SPAN = Math.PI; // 180 degrees
const LEFT_START = Math.PI * 0.5; // starts at 90° → sweeps left side
const RIGHT_START = -Math.PI * 0.5; // starts at -90° → sweeps right side

const BASE_INNER_RADIUS = 260;
const BASE_OUTER_RADIUS = 400;
const BASE_INNER_CARD = 88;
const BASE_OUTER_CARD = 88;
const BASE_CENTER_LOGO = 280;
const BASE_CENTER_IMG = 220;

// Logo card visuals - simple rounded container, no clipping.
const innerCard = (hovering: boolean) =>
  ({
    background: "white",
    borderRadius: "9999px",
    border: "2px solid rgba(228, 228, 231, 0.9)",
    filter: hovering
      ? "drop-shadow(0 2px 4px rgba(24,24,27,0.10)) drop-shadow(0 10px 22px rgba(0, 162, 159, 0.22))"
      : "drop-shadow(0 1px 2px rgba(24,24,27,0.06)) drop-shadow(0 5px 12px rgba(24,24,27,0.08))",
  } as React.CSSProperties);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

// Responsive radii: scale semicircle sizes with the viewport width so the
// arrangement stays clean on lg (1024px) through ultrawide displays.
function useResponsiveRadii() {
  const compute = () => {
    const w = typeof window === "undefined" ? 1440 : window.innerWidth;
    // Scale factor grows 1024px → 1920px+, clamped to [0.72, 1.1]
    const factor = Math.min(1.1, Math.max(0.72, (w - 1024) / 896 + 0.72));
    return {
      innerRadius: Math.round(BASE_INNER_RADIUS * factor),
      outerRadius: Math.round(BASE_OUTER_RADIUS * factor),
      innerCard: Math.round(BASE_INNER_CARD * factor),
      outerCard: Math.round(BASE_OUTER_CARD * factor),
      centerLogo: Math.round(BASE_CENTER_LOGO * factor),
      centerImg: Math.round(BASE_CENTER_IMG * factor),
    };
  };
  const [dims, setDims] = useState(compute);
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setDims(compute()));
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return dims;
}

// ── Logo card: pops up (scale + lift + glow) when hovered ──
function LogoCard({ logo, cardSize, isMobile = false }: { logo: LogoAsset; cardSize: number; isMobile?: boolean }) {
  const [hovering, setHovering] = useState(false);
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      onHoverStart={() => !isMobile && setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      whileHover={isMobile || reduceMotion ? undefined : { scale: 1.12, y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      style={{ width: cardSize, height: cardSize, zIndex: hovering ? 40 : "auto" }}
      className="pointer-events-auto flex cursor-pointer items-center justify-center"
    >
      <div className="flex h-full w-full items-center justify-center p-2" style={innerCard(hovering)}>
        <img
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          className="max-h-[95%] max-w-[95%] object-contain"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

export const ClientPartners = () => {
  const reduced = usePrefersReducedMotion();
  const dims = useResponsiveRadii();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const innerRingRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24 selection:bg-zinc-900 selection:text-white">
      {/* Full-width spread background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="font-outfit font-black text-[14vw] sm:text-[12vw] lg:text-[10vw] tracking-[0.2em] uppercase text-zinc-900/[0.035] whitespace-nowrap w-full text-center leading-none">
          VELOCITY
        </span>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-12">
        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 26 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="flex items-center justify-center gap-2 text-[#00A29F] font-extrabold text-sm uppercase tracking-[0.25em]">
            <Sparkles className="h-4 w-4 text-[#00A29F]" />
            <span>Our Clients &amp; Partners</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight">
            Trusted by <span className="text-[#00A29F]">Ambitious Brands.</span>
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-zinc-700 sm:text-lg md:text-xl">
            From emerging businesses to established companies, Virtual Velocity
            helps brands stand out, connect with their audiences, and grow through
            creative strategy, digital marketing, and technology.
          </p>
        </motion.div>
      </div>
{/* ── Desktop: semicircles of logos flanking the central anchor (lg+) ── */}
      <div
        className="relative z-10 mt-16 hidden min-h-[900px] pb-24 lg:block lg:mx-auto lg:max-w-7xl"
        style={{ minWidth: `${dims.outerRadius * 2 + dims.outerCard}px` }}
      >
        {/* Center — Virtual Velocity logo (visual anchor, clearly dominant, no border) */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: `${dims.centerLogo}px`,
              height: `${Math.round(dims.centerLogo * 1.14)}px`,
              borderRadius: "24px",
              background: "rgba(255,255,255,0.9)",
              filter:
                "drop-shadow(0 2px 4px rgba(24,24,27,0.08)) drop-shadow(0 14px 30px rgba(0, 162, 159, 0.16))",
            }}
          >
            <img
              src="/VV png.png"
              alt="Virtual Velocity — Digital Marketing & Creative Agency"
              loading="lazy"
              style={{ width: `${dims.centerImg}px` }}
              className="h-auto object-contain"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Semicircle rings (fade in once) */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Left semicircle — inner logos sweeping the left side (static, no spin).
              Container is pointer-events-none so its invisible square canvas
              doesn't block hover on the logos. */}
          <div
            ref={innerRingRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${dims.innerRadius * 2}px`, height: `${dims.innerRadius * 2}px` }}
          >
            {INNER_LOGOS.map((logo, i) => {
              const a = LEFT_START + (i / (INNER_LOGOS.length - 1)) * SEMICIRCLE_SPAN;
              return (
                <div
                  key={logo.alt}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${dims.innerCard}px`,
                    height: `${dims.innerCard}px`,
                    marginLeft: `${-dims.innerCard / 2}px`,
                    marginTop: `${-dims.innerCard / 2}px`,
                    transform: `rotate(${a}rad) translateX(${dims.innerRadius}px) rotate(${-a}rad)`,
                  }}
                >
                  <LogoCard logo={logo} cardSize={dims.innerCard} isMobile={isMobile} />
                </div>
              );
            })}
          </div>

          {/* Right semicircle — outer logos sweeping the right side (static, no spin).
              pointer-events-none so the invisible square canvas doesn't block hover
              on the inner-ring logos behind it (left half of the arrangement). */}
          <div
            ref={outerRingRef}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: `${dims.outerRadius * 2}px`, height: `${dims.outerRadius * 2}px` }}
          >
            {OUTER_LOGOS.map((logo, i) => {
              const a = RIGHT_START + (i / (OUTER_LOGOS.length - 1)) * SEMICIRCLE_SPAN;
              return (
                <div
                  key={logo.alt}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${dims.outerCard}px`,
                    height: `${dims.outerCard}px`,
                    marginLeft: `${-dims.outerCard / 2}px`,
                    marginTop: `${-dims.outerCard / 2}px`,
                    transform: `rotate(${a}rad) translateX(${dims.outerRadius}px) rotate(${-a}rad)`,
                  }}
                >
                  <LogoCard logo={logo} cardSize={dims.outerCard} isMobile={isMobile} />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── Mobile & Tablet: Recomposed Clean Grid with Prominent Center Anchor (<1024px) ── */}
      <div className="relative z-10 mt-10 sm:mt-14 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          {/* Prominent Center Anchor Logo */}
          <div className="flex items-center justify-center mb-8 sm:mb-10">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200 shadow-md flex items-center justify-center">
              <img
                src="/VV png.png"
                alt="Virtual Velocity"
                className="h-10 sm:h-14 w-auto object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </div>

          {/* Clean Responsive Logo Grid */}
          <div className="grid grid-cols-4 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 sm:gap-3.5">
            {ALL_LOGOS.map((logo) => (
              <div
                key={logo.alt}
                className="p-1.5 xs:p-2 sm:p-2.5 rounded-full bg-white border border-zinc-200/90 sm:border-2 flex items-center justify-center aspect-square shadow-xs hover:border-emerald-300 transition-colors"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className="max-h-[78%] max-w-[78%] object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}