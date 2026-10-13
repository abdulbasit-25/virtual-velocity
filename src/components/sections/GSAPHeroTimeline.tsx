"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoleculeBackground } from "@/components/ui/MoleculeBackground";

// The GSAP-driven pin/expand choreography lives in a headless component loaded
// after hydration (`ssr: false`) so the animation library never enters the
// initial page payload. The hero itself renders and is fully interactive first.
const HeroScrollDriver = dynamic(
  () =>
    import("@/components/sections/HeroScrollDriver").then(
      (mod) => mod.HeroScrollDriver
    ),
  { ssr: false }
);

const TICKER_ITEMS = [
  "Digital Agency",
  "Performance Marketing",
  "Tech & Web Agency",
  "PPC & Growth Engine",
  "SEO & CRO Specialists",
  "Creative Brand House",
  "Digital Agency",
];

const SLIDER_IMAGES = [
  { src: "/banner-2.webp", alt: "Virtual Velocity Performance Banner" },
  { src: "/Vv.webp", alt: "Virtual Velocity Digital Agency Banner" },
];

export const GSAPHeroTimeline = () => {
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    const prefetchImages = () => {
      if (typeof window === "undefined") return;

      SLIDER_IMAGES.forEach((img) => {
        const i = new window.Image();
        i.decoding = "async";
        i.src = img.src;
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(prefetchImages, { timeout: 1200 });
    } else {
      globalThis.setTimeout(prefetchImages, 250);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerIndex((p) => (p + 1) % TICKER_ITEMS.length), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlideCount((p) => p + 1), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const outer = videoScrollRef.current;
    if (!video || !outer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.dataset.loaded) {
            video.load();
            video.dataset.loaded = "true";
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(outer);
    return () => observer.disconnect();
  }, []);


  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full bg-white select-none font-outfit pt-16 sm:pt-20">

      {/* ─── Hero Banner Slider: Positioned below top navbar ─── */}
      <div className="relative w-full overflow-hidden h-[58vh] min-h-[420px] sm:h-[72vh] sm:min-h-[540px] sm:max-h-[720px] bg-zinc-950">
        {/* Persistently Mounted Slider Images: Permanently in DOM tree to eliminate unmounting & blank frame flicker */}
        <div className="absolute inset-0 w-full h-full">
          {SLIDER_IMAGES.map((img, idx) => {
            const activeIdx = ((slideCount % SLIDER_IMAGES.length) + SLIDER_IMAGES.length) % SLIDER_IMAGES.length;
            const isActive = activeIdx === idx;

            return (
              <motion.div
                key={img.src}
                initial={false}
                animate={{
                  x: isActive ? "0%" : "-8%",
                  scale: isActive ? 1 : 1.06,
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{
                  x: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
                }}
                className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={idx === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Soft top gradient to ensure transparent header is crisp and readable */}
        <div className="absolute inset-x-0 top-0 h-28 sm:h-32 bg-gradient-to-b from-white/60 via-white/15 to-transparent pointer-events-none z-10" />

        {/* Bottom gradient overlay for headline readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none z-10" />

        {/* Hero Content (Badge, Headlines, Ticker, Indicators) - Asymmetric Left-Aligned Editorial Architecture */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-4 sm:px-8 lg:px-14 pb-6 sm:pb-10 lg:pb-12">
          <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-left">
            <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#00A29F] font-extrabold mb-1.5 sm:mb-2.5">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#00A29F] animate-pulse" />
              <span>VIRTUAL VELOCITY • DIGITAL &amp; GROWTH HOUSE</span>
            </div>

            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.6rem] font-black tracking-tight text-white uppercase leading-[1.1] sm:leading-[1.08] lg:leading-[1.06] drop-shadow-lg">
              VIRTUAL VELOCITY — DIGITAL MARKETING AGENCY PAKISTAN &amp; BPO SERVICES
            </h1>

            <div className="mt-1 sm:mt-1.5 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.6rem] font-black tracking-tight uppercase leading-none">
              <div className="relative h-[22px] xs:h-[26px] sm:h-[34px] md:h-[42px] lg:h-[48px] xl:h-[54px] overflow-hidden">
                <div
                  className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateY(-${(tickerIndex * 100) / TICKER_ITEMS.length}%)`,
                    height: `${TICKER_ITEMS.length * 100}%`,
                  }}
                >
                  {TICKER_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="h-[22px] xs:h-[26px] sm:h-[34px] md:h-[42px] lg:h-[48px] xl:h-[54px] flex items-center whitespace-nowrap"
                    >
                      <span className="text-[#00A29F] drop-shadow-[0_2px_12px_rgba(0,162,159,0.5)]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-2.5 sm:mt-4 flex items-center gap-1.5 sm:gap-2">
              {SLIDER_IMAGES.map((_, idx) => {
                const isActive = ((slideCount % SLIDER_IMAGES.length) + SLIDER_IMAGES.length) % SLIDER_IMAGES.length === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSlideCount((prev) => {
                        const cur = ((prev % SLIDER_IMAGES.length) + SLIDER_IMAGES.length) % SLIDER_IMAGES.length;
                        if (cur === idx) return prev;
                        return prev + 1;
                      });
                    }}
                    className={`h-1 sm:h-1.5 rounded-full transition-all duration-400 ${
                      isActive ? "w-6 sm:w-8 bg-[#00A29F]" : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-3.5 sm:mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Button asChild variant="emerald" size="lg" className="font-bold tracking-wider">
                <Link href="/contact">
                  <span>FREE GROWTH AUDIT</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-black/40 text-white border-white/30 hover:bg-white hover:text-black font-bold tracking-wider backdrop-blur-md">
                <Link href="/services">OUR SERVICES</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Video scroll section: native GSAP pinned container ─── */}
      <div
        ref={videoScrollRef}
        className="relative w-full h-[70vh] sm:h-screen flex items-center justify-center overflow-hidden bg-[#fafaf7] select-none font-outfit"
      >
        {/* Dynamic Connected Molecule Network Background */}
        <MoleculeBackground />

        <div
          ref={videoWrapperRef}
          className="relative z-10 overflow-hidden bg-zinc-950 shadow-2xl transform-gpu w-[90%] md:w-[60%] h-[46vh] md:h-[55vh]"
          style={{
            willChange: "transform, clip-path",
          }}
        >
          <video
            ref={videoRef}
            src="/vv-website-video.mp4"
            poster="/banner-2.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-center pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/25 transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg cursor-pointer"
            data-cursor-pointer
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-zinc-300" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      {/* Headless GSAP scroll choreography (loads after hydration) */}
      <HeroScrollDriver outerRef={videoScrollRef} wrapperRef={videoWrapperRef} />
    </section>
  );
};
