"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import {
  ArrowUpRight,
  ArrowDown,
  Download,
  Eye,
  Lock,
  Radio,
  ShieldCheck,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  Flame,
} from "lucide-react";

type MetricKey = "followers" | "views" | "share";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Per-channel colour tones (full class strings so Tailwind keeps them) ── */
const TONES = {
  emerald: {
    bar: "bg-gradient-to-b from-white via-emerald-50/90 to-emerald-100/90",
    border: "border-emerald-300 group-hover:border-emerald-500",
    accent: "border-l-emerald-500",
    num: "text-emerald-700 group-hover:text-emerald-600",
    fill: "bg-gradient-to-r from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(23,138,102,0.25)]",
    ring: "ring-emerald-500/40 group-hover:ring-emerald-500",
  },
  amber: {
    bar: "bg-gradient-to-b from-white via-amber-50/90 to-amber-100/90",
    border: "border-amber-300 group-hover:border-amber-500",
    accent: "border-l-amber-500",
    num: "text-amber-700 group-hover:text-amber-600",
    fill: "bg-gradient-to-r from-amber-500 to-orange-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)]",
    ring: "ring-amber-500/40 group-hover:ring-amber-500",
  },
  sky: {
    bar: "bg-gradient-to-b from-white via-sky-50/90 to-sky-100/90",
    border: "border-sky-300 group-hover:border-sky-500",
    accent: "border-l-sky-500",
    num: "text-sky-700 group-hover:text-sky-600",
    fill: "bg-gradient-to-r from-sky-500 to-blue-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(14,165,233,0.25)]",
    ring: "ring-sky-500/40 group-hover:ring-sky-500",
  },
  rose: {
    bar: "bg-gradient-to-b from-white via-rose-50/90 to-rose-100/90",
    border: "border-rose-300 group-hover:border-rose-500",
    accent: "border-l-rose-500",
    num: "text-rose-700 group-hover:text-rose-600",
    fill: "bg-gradient-to-r from-rose-500 to-pink-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(244,63,94,0.25)]",
    ring: "ring-rose-500/40 group-hover:ring-rose-500",
  },
  violet: {
    bar: "bg-gradient-to-b from-white via-violet-50/90 to-violet-100/90",
    border: "border-violet-300 group-hover:border-violet-500",
    accent: "border-l-violet-500",
    num: "text-violet-700 group-hover:text-violet-600",
    fill: "bg-gradient-to-r from-violet-500 to-purple-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(139,92,246,0.25)]",
    ring: "ring-violet-500/40 group-hover:ring-violet-500",
  },
  orange: {
    bar: "bg-gradient-to-b from-white via-orange-50/90 to-orange-100/90",
    border: "border-orange-300 group-hover:border-orange-500",
    accent: "border-l-orange-500",
    num: "text-orange-700 group-hover:text-orange-600",
    fill: "bg-gradient-to-r from-orange-500 to-amber-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(249,115,22,0.25)]",
    ring: "ring-orange-500/40 group-hover:ring-orange-500",
  },
  indigo: {
    bar: "bg-gradient-to-b from-white via-indigo-50/90 to-indigo-100/90",
    border: "border-indigo-300 group-hover:border-indigo-500",
    accent: "border-l-indigo-500",
    num: "text-indigo-700 group-hover:text-indigo-600",
    fill: "bg-gradient-to-r from-indigo-500 to-violet-400",
    glow: "group-hover:shadow-[0_20px_45px_rgba(99,102,241,0.25)]",
    ring: "ring-indigo-500/40 group-hover:ring-indigo-500",
  },
} as const;

type ToneKey = keyof typeof TONES;

interface Channel {
  id: string;
  brand: string;
  handle: string;
  niche: string;
  index: string;
  iconSrc: string;
  followersK: number;
  viewsM?: number;
  featured?: boolean;
  tone: ToneKey;
  heightClass: string;
}

const H = {
  core: "h-[390px] sm:h-[440px] lg:h-[470px] xl:h-[510px]",
  step1: "h-[350px] sm:h-[395px] lg:h-[420px] xl:h-[455px]",
  step2: "h-[320px] sm:h-[360px] lg:h-[388px] xl:h-[418px]",
  step3: "h-[290px] sm:h-[328px] lg:h-[350px] xl:h-[376px]",
  step4: "h-[270px] sm:h-[306px] lg:h-[326px] xl:h-[348px]",
};

const CHANNELS: Channel[] = [
  {
    id: "lahorians",
    brand: "Lahorians",
    handle: "@lahorians",
    niche: "Heritage",
    index: "01",
    iconSrc: "/images/communities/lahorians.png",
    followersK: 230,
    tone: "orange",
    heightClass: H.step3,
  },
  {
    id: "islamabad_insider",
    brand: "Islamabad Insider",
    handle: "@islamabadinsider",
    niche: "Civic News",
    index: "02",
    iconSrc: "/images/communities/islamabad_insider.png",
    followersK: 440,
    tone: "violet",
    heightClass: H.step2,
  },
  {
    id: "sirfchai",
    brand: "Sirf Chai",
    handle: "@sirfchai_",
    niche: "Lifestyle",
    index: "03",
    iconSrc: "/images/communities/sirfchai.png",
    followersK: 670,
    tone: "amber",
    heightClass: H.step1,
  },
  {
    id: "rawalpindians",
    brand: "Rawalpindians",
    handle: "@rawalpindians",
    niche: "Urban Culture",
    index: "04",
    iconSrc: "/images/communities/rawalpindians.png",
    followersK: 750,
    viewsM: 45,
    featured: true,
    tone: "emerald",
    heightClass: H.core,
  },
  {
    id: "lifeofislamabad",
    brand: "Life of Islamabad",
    handle: "@lifeofislamabad",
    niche: "Metro Guide",
    index: "05",
    iconSrc: "/images/communities/lifeofislamabad.png",
    followersK: 620,
    tone: "sky",
    heightClass: H.step1,
  },
  {
    id: "islamabad_reels",
    brand: "Islamabad Reels",
    handle: "@islamabad_reels",
    niche: "Cinematics",
    index: "06",
    iconSrc: "/images/communities/islamabad_reels.png",
    followersK: 200,
    tone: "rose",
    heightClass: H.step4,
  },
  {
    id: "snapseedpak",
    brand: "SnapSeedPak",
    handle: "@snapseedpak",
    niche: "Visual Guild",
    index: "07",
    iconSrc: "/images/communities/snapseedpak.png",
    followersK: 40,
    tone: "indigo",
    heightClass: H.step4,
  },
];

const TOTAL_FOLLOWERS_K = CHANNELS.reduce((s, c) => s + c.followersK, 0);
const MAX_FOLLOWERS_K = Math.max(...CHANNELS.map((c) => c.followersK));
const RANKED = [...CHANNELS].sort((a, b) => b.followersK - a.followersK);
const LEADER = RANKED[0];

const BAR_WIDTH =
  "mx-auto w-full max-w-[124px] sm:max-w-[140px] lg:max-w-[155px] xl:max-w-[175px]";

const formatFollowers = (k: number) =>
  k >= 1000 ? `${(k / 1000).toFixed(2)}M` : `${k}K`;
const formatShare = (k: number) =>
  `${((k / TOTAL_FOLLOWERS_K) * 100).toFixed(1)}%`;

/** What each bar / row shows for the selected metric */
function readout(c: Channel, metric: MetricKey) {
  if (metric === "followers")
    return {
      value: formatFollowers(c.followersK),
      label: "Followers",
      disclosed: true,
      pct: (c.followersK / MAX_FOLLOWERS_K) * 100,
    };
  if (metric === "views")
    return c.viewsM
      ? {
          value: `${c.viewsM}M+`,
          label: "Monthly Views",
          disclosed: true,
          pct: 100,
        }
      : { value: "", label: "Restricted", disclosed: false, pct: 0 };
  return {
    value: formatShare(c.followersK),
    label: "Network Share",
    disclosed: true,
    pct: (c.followersK / MAX_FOLLOWERS_K) * 100,
  };
}

const HERO_METRICS = [
  {
    label: "Aggregated Followers",
    to: 2.95,
    decimals: 2,
    suffix: "M+",
    sub: "Direct Social Audience",
    icon: Users,
  },
  {
    label: "Owned Portals",
    to: 7,
    decimals: 0,
    suffix: " Channels",
    sub: "100% In-House Editorial",
    icon: Radio,
  },
  {
    label: "Reach Authenticity",
    to: 100,
    decimals: 0,
    suffix: "%",
    sub: "Organic Engagement",
    icon: ShieldCheck,
  },
  {
    label: "Monthly Impressions",
    to: 85,
    decimals: 0,
    suffix: "M+",
    sub: "Meta & TikTok Graph",
    icon: Eye,
  },
];

const METRIC_TOGGLES: { key: MetricKey; label: string }[] = [
  { key: "followers", label: "Followers" },
  { key: "views", label: "Monthly Views" },
  { key: "share", label: "Network Share %" },
];

const VALUE_CARDS = [
  {
    num: "01",
    icon: Flame,
    title: "Native Cultural Clout",
    body: "Our channels are deeply ingrained urban lifestyle fixtures shaping regional slang, foodie trends, and social dialogue.",
  },
  {
    num: "02",
    icon: Users,
    title: "High Affinity Demographics",
    body: "Over 82% of audiences are aged 18–34 with high disposable income across the Twin Cities and Lahore metropolitan regions.",
  },
  {
    num: "03",
    icon: TrendingUp,
    title: "Guaranteed Virality Index",
    body: "Coordinated multi-channel distribution creates an omnipresence effect, sparking compounding algorithmic lift across reels.",
  },
];

/* ============================ SHARED UI ============================ */

function CountUp({
  to,
  decimals = 0,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce) {
      setValue(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function Avatar({ c, className }: { c: Channel; className: string }) {
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-full bg-white ${className}`}
    >
      <Image
        src={c.iconSrc}
        alt=""
        fill
        sizes="56px"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </span>
  );
}

/** Desktop: one vertical bar */
function ChannelBar({
  c,
  i,
  metric,
}: {
  c: Channel;
  i: number;
  metric: MetricKey;
}) {
  const reduce = useReducedMotion();
  const tone = TONES[c.tone];
  const centerDist = Math.abs(i - (CHANNELS.length - 1) / 2);
  const r = readout(c, metric);

  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50, scaleY: 0.3 }}
      whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
      whileHover={reduce ? undefined : { y: -10, scale: 1.04 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: centerDist * 0.06,
      }}
      style={{ transformOrigin: "bottom center" }}
      className={`group relative flex list-none flex-col ${BAR_WIDTH} ${c.heightClass} rounded-t-2xl rounded-b-md px-2.5 pb-3 pt-4 transition-shadow duration-300 ${tone.bar} ${tone.glow} ${
        c.featured
          ? "z-20 border-2 border-emerald-500 shadow-lg ring-4 ring-emerald-500/20"
          : `border shadow-xs ${tone.border}`
      }`}
    >
      {/* Crown bar (only the featured channel pulses) */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-2 -top-[6px] h-1.5 rounded-full ${tone.fill} ${c.featured ? "motion-safe:animate-pulse" : ""}`}
      />

      <div className="mt-1 flex flex-col items-center gap-1.5 text-center">
        <Avatar
          c={c}
          className={`h-12 w-12 sm:h-14 sm:w-14 ${
            c.featured
              ? "shadow-md ring-[3px] ring-emerald-500"
              : `shadow-xs ring-2 ${tone.ring}`
          }`}
        />
        <span className="pt-1 font-outfit text-xs font-black leading-tight tracking-tight text-zinc-950 transition-colors group-hover:text-emerald-600 sm:text-sm lg:text-base">
          {c.brand}
        </span>
        <span className="font-mono text-[10px] font-bold leading-none text-emerald-700 sm:text-xs">
          {c.handle}
        </span>
        <span className="mt-0.5 rounded-full bg-white/80 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500 ring-1 ring-zinc-200">
          {c.niche}
        </span>
      </div>

      <div className="mt-auto pt-3 text-center">
        {r.disclosed ? (
          <>
            <motion.span
              key={r.value}
              initial={reduce ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`block font-outfit font-black leading-none tracking-tight ${tone.num} ${
                c.featured
                  ? "text-[1.8rem] sm:text-[2.1rem]"
                  : "text-[1.4rem] sm:text-[1.65rem]"
              }`}
            >
              {r.value}
            </motion.span>
            <span className="mt-1.5 block font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-600 sm:text-[10px]">
              {r.label}
            </span>
          </>
        ) : (
          <>
            <Lock
              className="mx-auto h-4 w-4 text-zinc-400"
              aria-hidden="true"
            />
            <span className="mt-2 block font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500">
              Restricted
            </span>
          </>
        )}

        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: `${r.pct}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2 + centerDist * 0.05,
              ease: "easeOut",
            }}
            className={`block h-full rounded-full ${tone.fill}`}
          />
        </div>
      </div>

      {c.featured ? (
        <Sparkles
          aria-hidden="true"
          className="absolute right-2 top-3 h-3.5 w-3.5 text-emerald-500 motion-safe:animate-pulse"
        />
      ) : (
        <TrendingUp
          aria-hidden="true"
          className="absolute right-2 top-3 h-3.5 w-3.5 text-zinc-300 transition-colors group-hover:text-emerald-600"
        />
      )}
    </motion.li>
  );
}

/** Mobile / tablet: ranked row with true-to-scale bar */
function ChannelRow({
  c,
  rank,
  metric,
}: {
  c: Channel;
  rank: number;
  metric: MetricKey;
}) {
  const reduce = useReducedMotion();
  const tone = TONES[c.tone];
  const r = readout(c, metric);

  return (
    <motion.li
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(rank * 0.05, 0.3),
        ease: EASE,
      }}
      className={`group list-none rounded-2xl border border-l-4 border-zinc-200 bg-white p-4 shadow-xs ${tone.accent} ${
        c.featured ? "ring-2 ring-emerald-500/30" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="w-5 shrink-0 font-mono text-xs font-black text-zinc-400">
          {rank + 1}
        </span>
        <Avatar c={c} className={`h-11 w-11 ring-2 ${tone.ring}`} />
        <div className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 truncate font-outfit text-[15px] font-black leading-tight text-zinc-950">
            {c.brand}
            {c.featured && (
              <Sparkles
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-emerald-500"
              />
            )}
          </span>
          <span className="block truncate font-mono text-[11px] font-bold text-emerald-700">
            {c.handle} <span className="text-zinc-400">• {c.niche}</span>
          </span>
        </div>
        <div className="text-right">
          {r.disclosed ? (
            <>
              <span
                className={`block font-outfit text-xl font-black leading-none ${tone.num}`}
              >
                {r.value}
              </span>
              <span className="mt-1 block font-mono text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                {r.label}
              </span>
            </>
          ) : (
            <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Restricted
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${r.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`block h-full rounded-full ${tone.fill}`}
        />
      </div>
    </motion.li>
  );
}

/* ============================== PAGE ============================== */

export function OwnedMediaClient() {
  const [metric, setMetric] = useState<MetricKey>("followers");
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen bg-white font-outfit text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <CustomCursor />
        <Navigation />

        {/* ============ 1. HERO ============ */}
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white pb-12 pt-28 sm:pb-16 sm:pt-32 lg:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
          >
            <div className="absolute -right-24 -top-32 h-[300px] w-[300px] rounded-full bg-emerald-100/70 blur-[150px] sm:h-[520px] sm:w-[520px]" />
            <div className="absolute -left-32 top-1/3 h-[320px] w-[320px] rounded-full bg-zinc-100/80 blur-[160px] sm:h-[560px] sm:w-[560px]" />
            <div
              className="absolute inset-0 opacity-[0.3]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                maskImage:
                  "linear-gradient(to bottom, black 15%, transparent 85%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 15%, transparent 85%)",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-[1700px] px-4 sm:px-8 lg:px-12">
            <motion.div {...fade(0.05)} className="max-w-5xl space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Owned Media Network
              </span>

              <h1 className="select-none text-[clamp(2.25rem,7vw,5rem)] font-black uppercase leading-[0.92] tracking-tighter text-zinc-950">
                <span className="text-emerald-600">2.95M+</span> Direct Reach.
                <br />
                Seven Channels. Zero Middlemen.
              </h1>

              <p className="max-w-3xl text-base font-normal leading-relaxed text-zinc-700 sm:text-lg lg:text-xl">
                In-house digital media network driving organic urban youth
                culture, viral regional reach, and unmatched demographic
                resonance across primary metropolitan hubs.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <a
                  href="#channels"
                  data-cursor-pointer
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white shadow-lg shadow-zinc-950/10 transition-all duration-300 hover:bg-emerald-600 active:scale-[0.98]"
                >
                  See the channels
                  <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <Link
                  href="/contact"
                  data-cursor-pointer
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white/70 px-6 py-3.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-900 backdrop-blur transition-all duration-300 hover:border-emerald-500 hover:text-emerald-700 active:scale-[0.98]"
                >
                  Inquire for collaborations
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>

            {/* Metric grid */}
            <ul className="grid grid-cols-1 gap-3.5 pt-10 min-[480px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {HERO_METRICS.map((m, i) => (
                <motion.li
                  key={m.label}
                  {...fade(0.1 + i * 0.06)}
                  className="group relative list-none overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/10 sm:p-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-zinc-600 sm:text-[11px]">
                      {m.label}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                      <m.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <span className="mt-4 block font-outfit text-3xl font-black leading-none text-zinc-950 sm:text-4xl">
                    <CountUp
                      to={m.to}
                      decimals={m.decimals}
                      suffix={m.suffix}
                    />
                  </span>
                  <span className="mt-2.5 block font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700 sm:text-[11px]">
                    {m.sub}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============ 2. CHANNEL MATRIX ============ */}
        <section
          id="channels"
          className="relative mx-auto max-w-[1700px] scroll-mt-24 border-b border-zinc-200 px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end">
            <div>
              <span className="mb-1 block font-mono text-xs font-extrabold uppercase tracking-[0.25em] text-emerald-600">
                Media Ecosystem
              </span>
              <h2 className="text-3xl font-black uppercase leading-tight tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                Proprietary Channels{" "}
                <span className="text-emerald-600">Overview</span>
              </h2>
            </div>

            {/* Metric toggle with sliding pill */}
            <div
              role="radiogroup"
              aria-label="Choose metric"
              className="inline-flex max-w-full items-center gap-1 self-start overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-100 p-1 lg:self-auto"
            >
              {METRIC_TOGGLES.map((t) => {
                const active = metric === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setMetric(t.key)}
                    className={`relative shrink-0 cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="metric-pill"
                        className="absolute inset-0 rounded-lg bg-emerald-600 shadow-sm"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 36,
                        }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {METRIC_TOGGLES.find((t) => t.key === metric)?.label} for
            each channel.
          </p>

          {/* Leader callout */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-sm text-zinc-800">
            <Sparkles
              className="h-4 w-4 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <span>
              <strong className="font-extrabold text-zinc-950">
                {LEADER.brand}
              </strong>{" "}
              leads the network with{" "}
              <strong className="font-extrabold text-emerald-700">
                {formatFollowers(LEADER.followersK)}
              </strong>{" "}
              followers — {formatShare(LEADER.followersK)} of the 2.95M total
              {LEADER.viewsM ? ` and ${LEADER.viewsM}M+ monthly views` : ""}.
            </span>
          </div>

          {/* Desktop: bar chart */}
          <div className="relative mt-6 hidden overflow-hidden rounded-3xl border border-zinc-200 bg-[#f8fafb] shadow-xs lg:block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(23,138,102,0.25)_1.5px,transparent_1.5px)] [background-size:24px_24px]"
            />
            <div className="relative z-10 pt-12">
              <ul
                aria-label="Owned media channels"
                className="grid grid-cols-7 items-end gap-6 px-8 pb-0 xl:gap-8"
              >
                {CHANNELS.map((c, i) => (
                  <ChannelBar key={c.id} c={c} i={i} metric={metric} />
                ))}
              </ul>
              <div className="px-8 pb-2">
                <div className="h-px w-full bg-zinc-300" />
              </div>
              <p className="px-8 pb-4 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Bar heights are a visual tier · figures and progress lines show
                real values
              </p>
            </div>
          </div>

          {/* Mobile / tablet: ranked list */}
          <ul
            aria-label="Owned media channels ranked"
            className="mt-6 space-y-3 lg:hidden"
          >
            {RANKED.map((c, i) => (
              <ChannelRow key={c.id} c={c} rank={i} metric={metric} />
            ))}
          </ul>
        </section>

        {/* ============ 3. VALUE + CTA ============ */}
        <section className="mx-auto max-w-[1700px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {VALUE_CARDS.map((v, i) => (
              <motion.div
                key={v.num}
                {...(reduce
                  ? {}
                  : {
                      initial: { opacity: 0, y: 20 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: "-40px" },
                      transition: {
                        duration: 0.6,
                        delay: i * 0.08,
                        ease: EASE,
                      },
                    })}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-emerald-600 sm:text-4xl">
                    {v.num}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors duration-300 group-hover:bg-emerald-600 group-hover:text-white">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 font-outfit text-lg font-black uppercase tracking-tight text-zinc-950 sm:mt-5 sm:text-xl lg:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-700">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Brand amplification banner */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, margin: "-40px" },
                  transition: { duration: 0.7, ease: EASE },
                })}
            className="relative isolate mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 shadow-xl shadow-emerald-900/20 sm:mt-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.35)_1.2px,transparent_1.2px)] [background-size:22px_22px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl"
            />

            <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:p-14">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] font-extrabold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  Brand Amplification
                </span>
                <h2 className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-white sm:mt-5 sm:text-3xl lg:text-4xl">
                  Amplify Your Brand Across 2.95M+ Audience
                </h2>
                <p className="mt-3 text-sm font-normal leading-relaxed text-white/90 sm:mt-4 lg:text-base">
                  Tap into Virtual Velocity&apos;s influential regional media
                  network for native brand integrations, viral reels, and
                  targeted reach.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
                <Magnetic strength={0.05}>
                  <Link
                    href="/contact"
                    data-cursor-pointer
                    className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-emerald-800 shadow-md transition-colors duration-300 hover:bg-zinc-950 hover:text-white active:scale-[0.98] sm:px-7 sm:text-[11px]"
                  >
                    <span>Inquire for Collaborations</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>

                <a
                  href="/Virtual%20Velocity%20Profile%20(1).pdf"
                  download
                  data-cursor-pointer
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/60 bg-transparent px-6 py-3.5 font-outfit text-[10px] font-black uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white hover:bg-white/15 active:scale-[0.98] sm:px-7 sm:text-[11px]"
                >
                  <span>Download Media Kit</span>
                  <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
