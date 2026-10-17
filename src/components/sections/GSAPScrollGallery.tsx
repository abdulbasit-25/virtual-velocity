"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";
import { PROJECTS, type Project } from "@/data/agencyData";
import { SectionHeader } from "@/components/sections/home/primitives";

const FILTERS = [
  "All",
  "Hospitality",
  "Food & Beverage",
  "Retail",
  "Fintech",
  "Healthcare",
  "Automotive",
] as const;

type Filter = (typeof FILTERS)[number];

function getFilter(industry: string): Exclude<Filter, "All"> {
  if (industry.includes("HOSPITALITY")) return "Hospitality";
  if (industry.includes("FOOD")) return "Food & Beverage";
  if (industry.includes("RETAIL")) return "Retail";
  if (industry.includes("FINANCIAL")) return "Fintech";
  if (industry.includes("HEALTHCARE")) return "Healthcare";
  return "Automotive";
}

function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const href = project.liveUrl ?? "#contact";
  const isExternal = project.liveUrl?.startsWith("http") ?? false;
  const headlineResult = project.results[0];
  const secondaryResult = project.results[1];

  return (
    <article className="group h-full">
      <Link
        href={href}
        aria-label={`${project.liveUrl ? "View case study" : "Discuss this project"}: ${project.client}`}
        className="home-card relative flex h-full min-h-[430px] flex-col overflow-hidden border-zinc-200 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-4"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div
          className={`relative overflow-hidden bg-zinc-100 ${
            featured ? "aspect-[16/9]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.client} project`}
            fill
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            }
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
          <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
            <span className="rounded-full border border-white/30 bg-zinc-950/55 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
              {project.number} / {project.year}
            </span>
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-zinc-900">
              {project.industry}
            </span>
          </div>
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/75">
                {project.client}
              </p>
              {headlineResult && (
                <p
                  className={`mt-2 max-w-[22ch] font-outfit font-black leading-[1.02] tracking-tight ${
                    featured ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {headlineResult}
                </p>
              )}
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#00A29F] group-hover:text-white">
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#006766]">
            {project.category}
          </p>
          <h3 className="mt-2 text-lg font-black uppercase leading-tight tracking-tight text-zinc-950 sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-700">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-4">
            {secondaryResult && (
              <span className="max-w-[28ch] text-xs font-semibold text-zinc-700">
                {secondaryResult}
              </span>
            )}
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white transition-colors group-hover:bg-[#006766]">
              {project.liveUrl ? "View case study" : "Discuss this project"}
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export const GSAPScrollGallery = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const projects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => getFilter(project.industry) === activeFilter);
  const featured = activeFilter === "All" ? projects.slice(0, 2) : [];
  const remaining = featured.length ? projects.slice(2) : projects;

  return (
    <section
      id="work"
      className="home-section border-t border-zinc-200 bg-white px-4 text-zinc-900 sm:px-8 lg:px-12"
    >
      <div className="home-container">
        <SectionHeader
          eyebrow={<><Briefcase aria-hidden="true" className="h-3.5 w-3.5" /> Featured case studies</>}
          index="04"
          title={<>Proven results &amp; <span className="text-[#00A29F]">brand archives.</span></>}
          aside={<span>{projects.length} selected works</span>}
        />

        <div
          role="group"
          aria-label="Filter case studies by industry"
          className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2 ${
                activeFilter === filter
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-[#00A29F] hover:text-[#006766]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        )}
        {remaining.length > 0 && (
          <div
            className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 ${
              featured.length ? "mt-6 lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {remaining.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
