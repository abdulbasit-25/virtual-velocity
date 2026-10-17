"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SERVICES } from "@/data/agencyData";
import { RotateCw, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Single emerald/white theme - consistent with rest of website
const THEME = {
  glow: "rgba(0, 162, 159, 0.35)",
  border: "border-emerald-500/60",
  badge: "bg-emerald-500 text-white border-emerald-400",
  badgeInactive: "bg-white/10 text-white border-white/20",
  accent: "#00A29F",
  accentSoft: "rgba(0, 162, 159, 0.12)",
};
// Per-card accent shades — a coordinated spread within the Emerald ramp
const CARD_ACCENTS = [
  { tint: "rgba(0, 162, 159, 0.30)", accent: "#00A29F", glowSoft: "rgba(0, 162, 159, 0.45)" },
  { tint: "rgba(34, 188, 186, 0.28)", accent: "#22bcba", glowSoft: "rgba(34, 188, 186, 0.42)" },
  { tint: "rgba(0, 130, 128, 0.30)", accent: "#008280", glowSoft: "rgba(0, 130, 128, 0.45)" },
  { tint: "rgba(82, 211, 208, 0.32)", accent: "#52d3d0", glowSoft: "rgba(82, 211, 208, 0.5)" },
];

// Soft HD abstract background images (bright/light, not dark)
const BACKDROPS = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557682260-96773eb01377?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557682260-96773eb01377?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=75&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557683316-973673baf926?q=75&w=800&auto=format&fit=crop",
];

export const GSAPRevolvingServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [radius, setRadius] = useState(450);
  const [viewMode, setViewMode] = useState<"mobile" | "tablet" | "desktop">("desktop");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setViewMode("mobile");
      } else if (w < 1024) {
        setViewMode("tablet");
      } else {
        setViewMode("desktop");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollMobile = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const rotationObj = useRef({ angle: 0 });
  const totalItems = SERVICES.length;
  const stepAngle = useMemo(() => 360 / Math.max(totalItems, 1), [totalItems]);

  // Dynamic radius + responsive cards
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      let cardWidth = 300;

      if (w < 480) {
        cardWidth = 180;
      } else if (w < 640) {
        cardWidth = 210;
      } else if (w < 768) {
        cardWidth = 240;
      } else if (w < 1024) {
        cardWidth = 270;
      } else {
        cardWidth = 300;
      }

      const extraPadding = w < 480 ? 40 : w < 768 ? 60 : 80;
      const computedRadius = Math.round(
        (cardWidth / 2) / Math.tan(Math.PI / Math.max(totalItems, 3)) + extraPadding
      );

      const minRadius = w < 480 ? 280 : w < 640 ? 330 : w < 768 ? 390 : 480;
      setRadius(Math.max(computedRadius, minRadius));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [totalItems]);

  const revolveToIndex = useCallback(
    (index: number, duration = 0.8) => {
      const normalizedIndex = (index % totalItems + totalItems) % totalItems;
      setActiveIndex(normalizedIndex);

      const targetAngle = -normalizedIndex * stepAngle;

      gsap.to(rotationObj.current, {
        angle: targetAngle,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          if (carouselRef.current) {
            gsap.set(carouselRef.current, {
              rotationY: rotationObj.current.angle,
            });
          }
        },
      });
    },
    [stepAngle, totalItems]
  );

  const nextService = () => revolveToIndex(activeIndex + 1);
  const prevService = () => revolveToIndex(activeIndex - 1);

  useGSAP(
    () => {
      const container = containerRef.current;
      const carousel = carouselRef.current;
      if (!container || !carousel) return;

      gsap.fromTo(
        ".gsap-revolve-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: container, start: "top 85%" },
        }
      );

      const isMobile = window.innerWidth < 768;

      // Pinned right-to-left 3D revolution on scroll for both mobile and desktop
      ScrollTrigger.create({
        trigger: container,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: `+=${isMobile ? 1100 : 1400 + totalItems * 110}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const totalRotation = -360 * self.progress;
          rotationObj.current.angle = totalRotation;
          gsap.set(carousel, { rotationY: totalRotation });

          const positiveAngle = (-totalRotation % 360 + 360) % 360;
          const currentIdx = Math.round(positiveAngle / stepAngle) % totalItems;
          setActiveIndex(currentIdx);
        },
      });
    },
    { scope: containerRef, dependencies: [stepAngle, totalItems] }
  );

  useEffect(() => {
    if (!isAutoRotating || viewMode !== "desktop") return;
    const interval = setInterval(() => {
      revolveToIndex(activeIndex + 1, 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoRotating, activeIndex, revolveToIndex, viewMode]);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full bg-white text-zinc-900 overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-12 selection:bg-zinc-900 selection:text-white border-t border-zinc-200 min-h-[92vh] sm:min-h-screen"
    >
      {/* Header Controls */}
      <header className="gsap-revolve-header max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-4 sm:pb-6 z-20 gap-3 sm:gap-4 relative">
        <div>
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-[#00A29F] uppercase tracking-widest mb-1 sm:mb-1.5">
            <RotateCw className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isAutoRotating ? "animate-spin" : ""}`} />
            <span>Service Spectrum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 leading-tight">
            Agency <span className="text-[#00A29F]">Services</span>
          </h2>
        </div>

        {/* Controls: Auto-Rotate + Arrow Navigation */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setIsAutoRotating((prev) => !prev)}
            className={`hidden sm:flex text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full border transition-all duration-300 items-center gap-1.5 sm:gap-2 ${
              isAutoRotating
                ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                : "bg-white text-zinc-700 border-zinc-300 hover:border-emerald-500 hover:text-emerald-700"
            }`}
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{isAutoRotating ? "AUTO-ROTATING" : "AUTO OFF"}</span>
          </button>

          <div className="flex items-center gap-1 sm:gap-1.5 bg-white p-1 rounded-full border border-zinc-200 shadow-sm">
            <button
              type="button"
              onClick={prevService}
              className="p-1.5 sm:p-2 rounded-full text-zinc-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              aria-label="Previous Service"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={nextService}
              className="p-1.5 sm:p-2 rounded-full text-zinc-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              aria-label="Next Service"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3D Revolving Carousel Stage (Active on Mobile, Tablet & Desktop) */}
      <main className="max-w-7xl w-full mx-auto flex items-center justify-center my-auto pt-6 sm:pt-10 md:pt-14 pb-2 sm:pb-4 z-10">
        <div
          ref={stageRef}
          className="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[440px] relative flex items-center justify-center overflow-visible"
          style={{ perspective: "1100px" }}
        >
          <div
            ref={carouselRef}
            className="w-full h-full relative flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {SERVICES.map((service, idx) => {
              const angle = idx * stepAngle;
              const isActive = idx === activeIndex;
              const backdrop = BACKDROPS[idx % BACKDROPS.length];
              const acc = CARD_ACCENTS[idx % CARD_ACCENTS.length];
              const isVideography = service.id === "videography";

              return (
                <article
                  key={service.id}
                  onClick={() => revolveToIndex(idx)}
                  className={`absolute w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] rounded-xl sm:rounded-2xl cursor-pointer select-none flex flex-col overflow-hidden transition-all duration-500 border h-[190px] sm:h-[220px] md:h-[250px] lg:h-[280px] ${
                    isActive
                      ? `${THEME.border} shadow-[0_20px_60px_rgba(0,0,0,0.1)] scale-100 opacity-100 z-30 ring-1 ring-white/50`
                      : "border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.06)] scale-92 sm:scale-95 opacity-70 hover:opacity-90 hover:border-emerald-300 z-10"
                  }`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Card background: clear image region on top, blurred/dark zone at bottom for text */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={service.previewImage || backdrop}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center scale-125 filter blur-lg brightness-90 saturate-110 transition-transform duration-1000 ease-out"
                    />
                    {isVideography ? (
                      <>
                        <div
                          className="absolute inset-0 mix-blend-multiply"
                          style={{ background: "linear-gradient(160deg, rgba(0, 66, 62, 0.55) 0%, rgba(0, 50, 47, 0.6) 55%, rgba(0, 40, 38, 0.55) 100%)" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/45 to-zinc-900/20" />
                      </>
                    ) : (
                      <>
                        <div
                          className="absolute inset-0 mix-blend-multiply"
                          style={{ background: `linear-gradient(160deg, ${acc.tint} 0%, ${acc.glowSoft} 55%, transparent 100%)` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/35 to-zinc-900/10" />
                      </>
                    )}

                    <img
                      src={service.previewImage || backdrop}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-105 saturate-110"
                      style={{
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 42%, transparent 70%)",
                        maskImage: "linear-gradient(to bottom, black 0%, black 42%, transparent 70%)",
                      }}
                    />

                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                      style={{ boxShadow: `inset 0 0 0 2px ${isVideography ? "rgba(0, 162, 159, 0.8)" : `${acc.accent}66`}, inset 0 0 30px ${acc.glowSoft}` }}
                    />
                  </div>

                  {/* Content: number, service title, short description */}
                  <div className="relative z-10 p-3 sm:p-3.5 md:p-4 h-full flex flex-col justify-end">
                    <span
                      className="text-xs font-black font-mono tracking-tighter"
                      style={{ color: acc.accent }}
                    >
                      {service.number}
                    </span>

                    <h3 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight text-white mt-1 leading-tight drop-shadow-sm">
                      {service.title}
                    </h3>

                    <p className="text-[10px] sm:text-[11px] md:text-xs text-white/85 font-normal leading-snug line-clamp-2 mt-1">
                      {service.shortDescription}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Progress Dots */}
      <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 border-t border-zinc-200 pt-3 sm:pt-4 z-20 text-[9px] sm:text-[10px] md:text-xs text-zinc-700">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => revolveToIndex(idx)}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-6 sm:w-8 bg-emerald-500 shadow-sm shadow-emerald-500/40"
                  : "w-1.5 sm:w-2 bg-zinc-300 hover:bg-zinc-400"
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
        <p className="tracking-wider uppercase font-mono text-center text-zinc-700">
          Scroll or tap to explore
        </p>
      </footer>
    </section>
  );
};
