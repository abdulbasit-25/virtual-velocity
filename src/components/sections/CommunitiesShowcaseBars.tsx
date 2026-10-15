"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AGENCY_METRICS } from "@/data/agencyData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface CommunityBarData {
  id: string;
  name: string;
  handle: string;
  iconSrc: string;
  tagLines: string[];
  tagColorClass: string;
  followerCount: string;
  subtitleLines: string[];
  bottomLines: string[];
  featured?: boolean;
  avatarRingColor: string;
  cardBg: string;
  cardBorder: string;
  heightClass: string;
  nicheSubLines?: string[];
  monthlyViews?: string;
}

export const PROPRIETARY_COMMUNITIES: CommunityBarData[] = [
  {
    id: "snapseedpak",
    name: "SnapSeedPak",
    handle: "SnapSeedPak",
    iconSrc: "/images/communities/snapseedpak.png",
    tagLines: ["VISUAL GUILD"],
    tagColorClass: "bg-teal-900/10 text-teal-900",
    followerCount: "40K",
    subtitleLines: ["FOLLOWERS"],
    bottomLines: ["VIRTUAL VELOCITY"],
    avatarRingColor: "ring-2 ring-emerald-400",
    cardBg: "bg-gradient-to-b from-white via-zinc-50 to-zinc-100",
    cardBorder: "border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
    heightClass: "h-[300px] lg:h-[320px] xl:h-[345px]",
  },
  {
    id: "islamabad_reels",
    name: "Islamabad Reels",
    handle: "islamabad_reels",
    iconSrc: "/images/communities/islamabad_reels.png",
    tagLines: ["CINEMATICS"],
    tagColorClass: "bg-teal-900/10 text-teal-900",
    followerCount: "200K",
    subtitleLines: ["FOLLOWERS"],
    bottomLines: ["VIRTUAL VELOCITY"],
    avatarRingColor: "ring-2 ring-teal-400",
    cardBg: "bg-gradient-to-b from-white via-slate-50 to-slate-100",
    cardBorder: "border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
    heightClass: "h-[360px] lg:h-[385px] xl:h-[415px]",
  },
  {
    id: "islamabad_insider",
    name: "Islamabad Insider",
    handle: "IslamabadInsider",
    iconSrc: "/images/communities/islamabad_insider.png",
    tagLines: ["CIVIC NEWS"],
    tagColorClass: "bg-teal-900/10 text-teal-900",
    followerCount: "440K",
    subtitleLines: ["FOLLOWERS"],
    bottomLines: ["VIRTUAL VELOCITY"],
    avatarRingColor: "ring-2 ring-amber-500",
    cardBg: "bg-gradient-to-b from-white via-stone-50 to-stone-100",
    cardBorder: "border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
    heightClass: "h-[430px] lg:h-[455px] xl:h-[485px]",
  },
  {
    id: "rawalpindians",
    name: "Rawalpindians",
    handle: "Rawalpindians",
    iconSrc: "/images/communities/rawalpindians.png",
    featured: true,
    tagLines: ["★ FLAGSHIP", "PEAK #1"],
    tagColorClass: "bg-gradient-to-r from-[#ffe082] via-[#ffd54f] to-[#ffca28] text-amber-950 font-black",
    nicheSubLines: ["URBAN CULTURE &", "VIRALITY"],
    followerCount: "750K",
    subtitleLines: ["DIRECT", "FOLLOWERS"],
    monthlyViews: "45M+ Monthly Views",
    bottomLines: ["VIRTUAL VELOCITY", "FLAGSHIP"],
    avatarRingColor: "ring-3 ring-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.7)]",
    cardBg: "bg-white",
    cardBorder: "border-2 border-amber-300 ring-2 ring-amber-400/40 shadow-[0_0_50px_rgba(245,158,11,0.45),0_20px_45px_rgba(0,0,0,0.4)]",
    heightClass: "h-[530px] lg:h-[560px] xl:h-[595px]",
  },
  {
    id: "sirfchai",
    name: "Sirf Chai",
    handle: "sirfchai_",
    iconSrc: "/images/communities/sirfchai.png",
    tagLines: ["LIFESTYLE"],
    tagColorClass: "bg-[#fae8d4] text-[#7a421d]",
    followerCount: "670K",
    subtitleLines: ["FOLLOWERS"],
    bottomLines: ["VIRTUAL VELOCITY"],
    avatarRingColor: "ring-2 ring-teal-400",
    cardBg: "bg-gradient-to-b from-[#fbf8f2] via-[#f7f2ea] to-[#efe6dc]",
    cardBorder: "border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
    heightClass: "h-[475px] lg:h-[500px] xl:h-[530px]",
  },
  {
    id: "lifeofislamabad",
    name: "Life of Islamabad",
    handle: "lifeofislamabad",
    iconSrc: "/images/communities/lifeofislamabad.png",
    tagLines: ["METRO GUIDE"],
    tagColorClass: "bg-teal-900/10 text-teal-900",
    followerCount: "620K",
    subtitleLines: ["FOLLOWERS"],
    bottomLines: ["VIRTUAL VELOCITY"],
    avatarRingColor: "ring-2 ring-teal-400",
    cardBg: "bg-gradient-to-b from-white via-zinc-50 to-zinc-100",
    cardBorder: "border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
    heightClass: "h-[430px] lg:h-[455px] xl:h-[485px]",
  },
  {
    id: "lahorians",
    name: "Lahorians",
    handle: "Lahorians",
    iconSrc: "/images/communities/lahorians.png",
    tagLines: ["HERITAGE"],
    tagColorClass: "bg-teal-900/10 text-teal-900",
    followerCount: "230K",
    subtitleLines: ["FOLLOWERS"],
    bottomLines: ["VIRTUAL VELOCITY"],
    avatarRingColor: "ring-2 ring-teal-400",
    cardBg: "bg-gradient-to-b from-white via-slate-50 to-slate-100",
    cardBorder: "border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
    heightClass: "h-[355px] lg:h-[380px] xl:h-[405px]",
  },
];

// Blue Verified Checkmark attached at bottom-right of avatar orb
function BlueOrbCheckBadge() {
  return (
    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0095f6] border-2 border-white flex items-center justify-center shadow-md shrink-0 z-20">
      <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

// Blue Dot next to account handle
function BlueHandleDot() {
  return (
    <span className="w-2.5 h-2.5 rounded-full bg-[#0095f6] inline-block shrink-0 shadow-xs" />
  );
}

// Avatar Orb renderer loading icons from public/images/communities
function AvatarOrb({
  iconSrc,
  name,
  ringClass,
  isFeatured,
}: {
  iconSrc: string;
  name: string;
  ringClass: string;
  isFeatured?: boolean;
}) {
  const sizeClass = isFeatured ? "w-16 h-16 xl:w-18 xl:h-18" : "w-13 h-13 xl:w-15 xl:h-15";

  return (
    <div className={`relative ${sizeClass} rounded-full ${ringClass} shrink-0 bg-zinc-950 p-[2px]`}>
      <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950 flex items-center justify-center">
        <Image
          src={iconSrc}
          alt={name}
          fill
          className="object-cover"
          sizes={isFeatured ? "72px" : "60px"}
          priority
        />
      </div>

      {/* Blue Verified Check Badge */}
      <BlueOrbCheckBadge />
    </div>
  );
}

export function CommunitiesShowcaseBars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-comm-bar",
        {
          scaleY: 0.1,
          opacity: 0,
        },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".gsap-comm-orb",
        {
          scale: 0.5,
          opacity: 0,
          y: 20,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          stagger: 0.08,
          delay: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-extrabold block">
            Proprietary Media Communities — {AGENCY_METRICS.ownedAudience.display} Direct Audience
          </span>
          <p className="text-xs sm:text-sm text-zinc-800 font-medium">
            Virtual Velocity&apos;s verified digital network driving viral organic reach, culture, and high-impact regional engagement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-mono font-bold text-emerald-800 shadow-xs">
            {AGENCY_METRICS.ownedAudience.display} VERIFIED NETWORK
          </span>
        </div>
      </div>

      {/* Main Dark Mesh Background Canvas */}
      <div className="relative w-full rounded-3xl bg-zinc-950 shadow-2xl border border-zinc-800/80 overflow-hidden">
        {/* Subtle Ambient Dot Matrix Background */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(rgba(255,255,255,0.25)_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

        {/* Ambient Center Glow behind Flagship Peak #4 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-amber-400/15 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />

        {/* ── RESPONSIVE BARS CONTAINER ── */}
        <div className="relative z-10 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-5 sm:pb-8">
          <div className="min-w-[860px] lg:min-w-0 grid grid-cols-7 gap-2.5 sm:gap-3 xl:gap-4 items-end">
            {PROPRIETARY_COMMUNITIES.map((comm) => {
              const isFeatured = comm.featured;

              return (
                <div
                  key={comm.id}
                  style={{ transformOrigin: "bottom center" }}
                  className={`gsap-comm-bar relative flex flex-col justify-between rounded-[2rem] lg:rounded-[2.25rem] xl:rounded-[2.5rem] transition-all duration-300 p-2 sm:p-3 xl:p-4 pb-4 ${comm.heightClass} ${comm.cardBg} ${comm.cardBorder} ${
                    isFeatured ? "z-20 scale-[1.02] shadow-[0_20px_50px_rgba(245,158,11,0.25)]" : "z-10 hover:scale-[1.05] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(23,138,102,0.2)]"
                  } group overflow-visible`}
                >
                  {/* Floating Orb at Top Center */}
                  <div className="absolute -top-8 sm:-top-9 xl:-top-10 inset-x-0 flex justify-center pointer-events-none z-30">
                    <div className="gsap-comm-orb pointer-events-auto transition-transform duration-300 group-hover:scale-120 group-hover:-translate-y-1">
                      <AvatarOrb
                        iconSrc={comm.iconSrc}
                        name={comm.name}
                        ringClass={comm.avatarRingColor}
                        isFeatured={isFeatured}
                      />
                    </div>
                  </div>

                  {/* Top Content: Category Pill & Handle */}
                  <div className="pt-6 sm:pt-7 text-center space-y-1.5 w-full overflow-hidden">
                    {/* Category Pill Tag */}
                    <div className="flex justify-center">
                      <div
                        className={`text-[8.5px] sm:text-[9.5px] xl:text-[10px] font-mono font-bold tracking-wider px-2.5 sm:px-3 py-1 rounded-full uppercase leading-tight shadow-xs ${comm.tagColorClass}`}
                      >
                        {comm.tagLines.map((line, idx) => (
                          <div key={idx} className="whitespace-nowrap">{line}</div>
                        ))}
                      </div>
                    </div>

                    {/* Account Handle + Blue Dot */}
                    <div className="flex items-center justify-center gap-1 flex-nowrap px-0.5">
                      <span className="font-black text-xs sm:text-sm xl:text-base text-zinc-950 tracking-tight whitespace-nowrap truncate">
                        {comm.handle}
                      </span>
                      <BlueHandleDot />
                    </div>

                    {/* Centerpiece Extra Niche Subtitle */}
                    {comm.nicheSubLines && (
                      <div className="text-[8.5px] sm:text-[9.5px] xl:text-[10px] font-extrabold text-teal-700 tracking-wider uppercase font-outfit leading-tight pt-0.5">
                        {comm.nicheSubLines.map((line, idx) => (
                          <div key={idx} className="whitespace-nowrap">{line}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Middle Content: Big Statistics */}
                  <div className="my-auto text-center py-2 px-0.5 space-y-1 w-full overflow-hidden">
                    {/* The 750K / 670K / etc: STRICTLY SINGLE ROW! */}
                    <div className="flex justify-center items-center w-full">
                      <span
                        className={`font-black font-outfit text-zinc-950 tracking-tight leading-none whitespace-nowrap select-none ${
                          isFeatured
                            ? "text-[2rem] sm:text-[2.35rem] lg:text-[2rem] xl:text-[2.65rem]"
                            : "text-[1.65rem] sm:text-[1.85rem] lg:text-[1.6rem] xl:text-[2.1rem]"
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {comm.followerCount}
                      </span>
                    </div>

                    {/* Subtitle Lines (e.g. "DIRECT" / "FOLLOWERS" or "FOLLOWERS") */}
                    <div
                      className={`font-extrabold uppercase tracking-wider leading-tight ${
                        isFeatured
                          ? "text-[9.5px] sm:text-[10px] xl:text-[11px] text-teal-700 font-black"
                          : "text-[9px] sm:text-[9.5px] xl:text-[10px] text-zinc-700"
                      }`}
                    >
                      {comm.subtitleLines.map((line, idx) => (
                        <div key={idx} className="whitespace-nowrap">{line}</div>
                      ))}
                    </div>

                    {/* Centerpiece Monthly Views Extra Metric */}
                    {comm.monthlyViews && (
                      <div className="text-[9.5px] sm:text-[10px] xl:text-[11px] font-bold text-zinc-700 pt-0.5 whitespace-nowrap">
                        {comm.monthlyViews}
                      </div>
                    )}
                  </div>

                  {/* Bottom Content: VIRTUAL VELOCITY Brand Tag */}
                  <div className="text-center pt-2 pb-1 border-t border-teal-900/10 w-full px-1 overflow-hidden">
                    <div
                      className={`text-[8px] sm:text-[8.5px] xl:text-[9px] font-mono uppercase tracking-wider leading-tight ${
                        isFeatured
                          ? "text-teal-900 font-extrabold"
                          : "text-teal-900/60 font-bold"
                      }`}
                    >
                      {comm.bottomLines.map((line, idx) => (
                        <div key={idx} className="whitespace-nowrap">{line}</div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
