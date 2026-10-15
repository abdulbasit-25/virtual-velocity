"use client";

import { TrendingUp } from "lucide-react";
import { AGENCY_METRICS } from "@/data/agencyData";
import {
  CountUp,
  HomeCard,
  SectionHeader,
} from "@/components/sections/home/primitives";

const STATS_DATA = [
  {
    value: AGENCY_METRICS.campaignsManaged.target,
    suffix: "+",
    label: "Campaigns Deployed",
    detail: "Across US, European & Asian markets",
  },
  {
    value: AGENCY_METRICS.averageRoas.target,
    suffix: "x",
    decimals: 1,
    label: "Average ROAS",
    detail: "Across PPC, social & performance ads",
  },
  {
    value: 320,
    suffix: "%",
    label: "Organic Growth",
    detail: "Compounding search & audience reach",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Retention",
    detail: "Long-term client trust & brand retention",
  },
];

export const LightStatsSection = () => (
  <section className="home-section relative overflow-hidden border-t border-zinc-800 bg-zinc-950 px-4 text-white sm:px-8 lg:px-12">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#00A29F]/20 blur-[140px]"
    />
    <div className="home-container relative z-10">
      <SectionHeader
        eyebrow={<><TrendingUp aria-hidden="true" className="h-3.5 w-3.5" /> Proven metrics &amp; impact</>}
        index="07"
        title={<>Agency impact <span className="text-[#52d3d0]">in numbers.</span></>}
        description="Data-backed performance across paid media, search scaling, and custom web engineering."
        tone="dark"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {STATS_DATA.map((stat, index) => (
          <HomeCard
            key={stat.label}
            className="border-white/15 bg-white/[0.04] p-5 text-white shadow-none hover:border-[#52d3d0]/50 hover:bg-white/[0.08] sm:p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-white/55">
                0{index + 1}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#52d3d0]"
              />
            </div>
            <div className="mt-8">
              <p className="font-outfit text-4xl font-black tracking-tight text-white sm:text-5xl">
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <h3 className="mt-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white/85">
                {stat.label}
              </h3>
            </div>
            <p className="mt-5 border-t border-white/15 pt-3 text-xs leading-relaxed text-white/70">
              {stat.detail}
            </p>
          </HomeCard>
        ))}
      </div>
    </div>
  </section>
);
