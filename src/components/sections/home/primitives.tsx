"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[#00A29F]/25 bg-[#00A29F]/[0.08] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#006766] sm:text-xs ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
  aside,
  className = "",
  tone = "light",
}: {
  eyebrow: ReactNode;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`mb-8 flex flex-col gap-4 border-b pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8 ${dark ? "border-white/15" : "border-zinc-200"} ${className}`}
    >
      <div className="max-w-3xl">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {index && (
            <span className={`font-mono text-[10px] font-bold tracking-[0.16em] ${dark ? "text-white/60" : "text-zinc-500"}`}>
              {index}
            </span>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h2 className={`home-heading font-outfit font-black uppercase ${dark ? "text-white" : "text-zinc-950"}`}>
          {title}
        </h2>
        {description && (
          <p className={`mt-4 max-w-2xl text-sm leading-relaxed sm:text-base ${dark ? "text-white/75" : "text-zinc-700"}`}>
            {description}
          </p>
        )}
      </div>
      {aside && (
        <div className={`shrink-0 text-xs font-mono font-bold uppercase tracking-wider ${dark ? "text-white/70" : "text-zinc-600"}`}>
          {aside}
        </div>
      )}
    </div>
  );
}

export function HomeCard({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#00A29F]/50 hover:shadow-lg focus-within:ring-2 focus-within:ring-[#00A29F] focus-within:ring-offset-2 ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#00A29F] transition-transform duration-300 group-hover:scale-x-100"
      />
      {children}
    </div>
  );
}

export function RevolvingCTA({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-12 items-center justify-center rounded-xl p-[2px] transition-transform duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <span
          className="absolute inset-[-250%] motion-safe:animate-[spin_3s_linear_infinite] group-hover:[animation-duration:1.5s] motion-reduce:animate-none"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 40%, rgba(0,162,159,0.25) 58%, #00A29F 76%, #22bcba 88%, #7ae6e3 96%, transparent 100%)",
          }}
        />
      </span>
      <span className="relative inline-flex min-h-11 items-center gap-3 rounded-[10px] bg-zinc-950 px-5 py-3 font-outfit text-xs font-black uppercase tracking-[0.15em] text-white transition-colors group-hover:bg-[#006766]">
        {children}
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45"
        />
      </span>
    </Link>
  );
}

export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (current) => {
        if (ref.current) {
          const formatted =
            decimals > 0 ? current.toFixed(decimals) : `${Math.round(current)}`;
          ref.current.textContent = `${formatted}${suffix}`;
        }
      },
    });
    return () => controls.stop();
  }, [decimals, inView, reduceMotion, suffix, value]);

  const initialValue =
    decimals > 0 ? value.toFixed(decimals) : `${Math.round(value)}`;

  return (
    <span
      ref={ref}
      className={className}
      aria-label={`${initialValue}${suffix}`}
    >
      {initialValue}
      {suffix}
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
