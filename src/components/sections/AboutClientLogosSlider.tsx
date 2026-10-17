"use client";

import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/sections/home/primitives";

interface BrandItem {
  src: string;
  name: string;
}

const BRANDS: BrandItem[] = [
  { src: "/All logo in SVG Format/pizza hut.svg", name: "Pizza Hut" },
  { src: "/All logo in SVG Format/Gloria Jeans logo.svg", name: "Gloria Jeans" },
  { src: "/All logo in SVG Format/Anta logo.svg", name: "Anta" },
  { src: "/All logo in SVG Format/Unied nations.svg", name: "United Nations" },
  { src: "/All logo in SVG Format/chaaye khana.svg", name: "Chaaye Khana" },
  { src: "/All logo in SVG Format/Blue world city.svg", name: "Blue World City" },
  { src: "/All logo in SVG Format/Red apple.svg", name: "Red Apple" },
  { src: "/All logo in SVG Format/Megazone logo.svg", name: "Megazone" },
  { src: "/All logo in SVG Format/wild wings logo.svg", name: "Wild Wings" },
  { src: "/All logo in SVG Format/chinaar.svg", name: "Chinaar" },
  { src: "/All logo in SVG Format/maple vista.svg", name: "Maple Vista" },
  { src: "/All logo in SVG Format/Glamar.svg", name: "Glamar" },
  { src: "/All logo in SVG Format/andaz.svg", name: "Andaz" },
  { src: "/All logo in SVG Format/ariston.svg", name: "Ariston" },
  { src: "/All logo in SVG Format/capital arena.svg", name: "Capital Arena" },
  { src: "/All logo in SVG Format/cresto.svg", name: "Cresto" },
  { src: "/All logo in SVG Format/de asthethic.svg", name: "De Aesthetic" },
  { src: "/All logo in SVG Format/desi chapter.svg", name: "Desi Chapter" },
  { src: "/All logo in SVG Format/Untitled-1.svg", name: "Galaxy Hayatabad" },
  { src: "/All logo in SVG Format/iplexmarketing.svg", name: "IPlex Marketing" },
  { src: "/All logo in SVG Format/kapacious.svg", name: "Kapacious" },
  { src: "/All logo in SVG Format/levante.svg", name: "Levante" },
  { src: "/All logo in SVG Format/media sniffers.svg", name: "Media Sniffers" },
  { src: "/All logo in SVG Format/Mughlai logo.svg", name: "Mughlai" },
  { src: "/All logo in SVG Format/Pamir.svg", name: "Pamir" },
  { src: "/All logo in SVG Format/shake wake.svg", name: "Shake Wake" },
  { src: "/All logo in SVG Format/slice and cone.svg", name: "Slice and Cone" },
  { src: "/All logo in SVG Format/TSL.svg", name: "TSL" },
  { src: "/All logo in SVG Format/revival.svg", name: "Revival" },
  { src: "/All logo in SVG Format/oxbite.svg", name: "Oxbite" },
];

const ROW_1 = BRANDS.slice(0, 15);
const ROW_2 = BRANDS.slice(15);

function LogoTrack({
  brands,
  direction,
}: {
  brands: BrandItem[];
  direction: "left" | "right";
}) {
  return (
    <ul
      aria-hidden="true"
      className={`animate-marquee-${direction} hover:[animation-play-state:paused] flex w-max items-center gap-3 px-2 sm:gap-5`}
    >
      {[...brands, ...brands].map((brand, index) => (
        <li
          key={`${brand.name}-${index}`}
          title={brand.name}
          className="group relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white p-2 transition-all duration-300 hover:border-[#00A29F]/50 hover:shadow-md sm:h-32 sm:w-32"
        >
          <Image
            src={brand.src}
            alt=""
            width={120}
            height={64}
            sizes="(max-width: 640px) 80px, 104px"
            className="h-[84%] w-[84%] object-contain grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-active:grayscale-0 group-active:opacity-100"
          />
          <span className="absolute inset-x-1 bottom-2 z-10 rounded-full bg-zinc-950/80 px-1.5 py-1 text-center text-[9px] font-bold leading-tight text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-active:opacity-100 sm:text-[10px]">
            {brand.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

export const AboutClientLogosSlider = () => (
  <section
    aria-label="Client and partner brands"
    className="home-section relative overflow-hidden border-t border-zinc-200 bg-white text-zinc-900"
  >
    <div className="home-container">
      <SectionHeader
        eyebrow={<><Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Global client ecosystem</>}
        index="06"
        title={<>Trusted by <span className="text-[#00A29F]">Ambitious Brands.</span></>}
        aside={
          <span className="inline-flex items-center gap-2">
            <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#006766]" />
            Proven brand retention
          </span>
        }
      />
    </div>

    <ul className="sr-only" aria-label="Partner brands">
      {BRANDS.map((brand) => (
        <li key={brand.name}>{brand.name}</li>
      ))}
    </ul>
    <div className="hover-marquee group relative space-y-3 overflow-hidden sm:space-y-5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-20"
      />
      <div className="group-hover:[animation-play-state:paused]">
        <LogoTrack brands={ROW_1} direction="left" />
      </div>
      <div className="group-hover:[animation-play-state:paused]">
        <LogoTrack brands={ROW_2} direction="right" />
      </div>
    </div>
    <p className="home-container mt-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">
      30+ Global Partner Brands
    </p>
  </section>
);
