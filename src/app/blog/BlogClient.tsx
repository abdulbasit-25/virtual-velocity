"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BLOG_POSTS } from "@/data/agencyData";
import { ArrowRight, ArrowUpRight, Clock, Search, X, Zap } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Post = (typeof BLOG_POSTS)[number];

const ALL = "ALL";

/* ---------- small pieces ---------- */

function Avatar({
  name,
  src,
  dark = false,
}: {
  name: string;
  src?: string;
  dark?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const base = "w-9 h-9 rounded-full shrink-0 border";
  const tone = dark ? "border-white/20" : "border-zinc-200";

  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className={`${base} ${tone} ${
          dark ? "bg-white/10 text-white" : "bg-zinc-100 text-zinc-700"
        } flex items-center justify-center text-xs font-extrabold`}
      >
        {name.trim().charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={36}
      height={36}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`${base} ${tone} object-cover`}
    />
  );
}

function Meta({ post, dark = false }: { post: Post; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <Avatar name={post.author.name} src={post.author.avatar} dark={dark} />
      <div className="text-xs leading-tight min-w-0">
        <span
          className={`block font-extrabold truncate ${dark ? "text-white" : "text-zinc-900"}`}
        >
          {post.author.name}
        </span>
        <span className={dark ? "text-zinc-400" : "text-zinc-500"}>
          {post.date}
        </span>
      </div>
    </div>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="gsap-blog-card group relative overflow-hidden rounded-3xl bg-zinc-900 text-white p-6 sm:p-10 lg:p-14 transition-shadow duration-300 hover:shadow-2xl focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
      />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="space-y-5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-zinc-950 uppercase tracking-wide">
              Latest
            </span>
            <span className="uppercase tracking-wide text-emerald-300">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-balance">
            <Link
              href={`/blog/${post.slug}`}
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-sm sm:text-lg text-zinc-300 font-light leading-relaxed line-clamp-3 sm:line-clamp-none max-w-2xl">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between gap-6 lg:flex-col lg:items-end lg:gap-8">
          <Meta post={post} dark />
          <span className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-950 px-5 py-3 text-sm font-bold transition-colors group-hover:bg-emerald-400">
            Read article
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="gsap-blog-card group relative flex h-full flex-col justify-between gap-6 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/40">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3 text-xs font-bold">
          <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 uppercase tracking-wide text-emerald-700 truncate">
            {post.category}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-zinc-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h2 className="text-xl sm:text-[1.4rem] font-black leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-emerald-600 text-balance">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h2>

        <p className="text-sm text-zinc-600 font-light leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-5">
        <Meta post={post} />
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-900 transition-colors group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

/* ---------- page ---------- */

export function BlogClient() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => [
      ALL,
      ...Array.from(new Set(BLOG_POSTS.map((p) => p.category.toUpperCase()))),
    ],
    [],
  );

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => {
      const matchCat =
        activeCategory === ALL || p.category.toUpperCase() === activeCategory;
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [activeCategory, query]);

  const isDefaultView = activeCategory === ALL && !query.trim();
  const featured = isDefaultView ? filteredPosts[0] : undefined;
  const gridPosts = featured ? filteredPosts.slice(1) : filteredPosts;

  const resetFilters = () => {
    setActiveCategory(ALL);
    setQuery("");
  };

  // Content is visible in the server HTML; motion only enhances it after hydration.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gsap-blog-title > *", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "all",
        });

        const cards = gsap.utils.toArray<HTMLElement>(".gsap-blog-card");
        gsap.set(cards, { opacity: 0, y: 28 });

        ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "all",
              overwrite: true,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: scopeRef, dependencies: [activeCategory], revertOnUpdate: true },
  );

  return (
    <SmoothScrollProvider>
      <main
        id="main-content"
        tabIndex={-1}
        ref={scopeRef}
        className="relative min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white font-outfit"
      >
        <CustomCursor />
        <Navigation />

        <div className="mx-auto max-w-[1700px] px-4 sm:px-8 lg:px-12 pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-28">
          {/* Header */}
          <header className="gsap-blog-title space-y-5 sm:space-y-6 pb-8 sm:pb-10">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-600">
              <Zap className="h-4 w-4" aria-hidden="true" />
              Thought leadership &amp; articles
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black uppercase leading-[0.95] tracking-tighter text-zinc-900">
              The digital <span className="text-zinc-400">journal</span>
            </h1>
            <p className="max-w-2xl text-base sm:text-xl text-zinc-600 font-light leading-relaxed">
              Insights on Google Search PPC, technical SEO audits, paid social
              conversion rates, and brand positioning strategies.
            </p>
          </header>

          {/* Toolbar */}
          <div className="sticky top-0 z-20 -mx-4 sm:-mx-8 lg:-mx-12 mb-8 sm:mb-10 border-y border-zinc-200 bg-white/90 px-4 sm:px-8 lg:px-12 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/75">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div
                role="group"
                aria-label="Filter articles by category"
                className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 py-1 scrollbar-hide [mask-image:linear-gradient(to_right,black_92%,transparent)] lg:[mask-image:none]"
              >
                {categories.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex min-h-[40px] items-center whitespace-nowrap rounded-full border px-4 text-xs font-mono uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                        active
                          ? "border-emerald-600 bg-emerald-600 font-extrabold text-white shadow-sm"
                          : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-300 hover:bg-white"
                      }`}
                    >
                      {cat === ALL ? "All" : cat}
                    </button>
                  );
                })}
              </div>

              <div className="relative w-full lg:w-80">
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                  aria-hidden="true"
                />
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles"
                  autoComplete="off"
                  className="h-11 w-full rounded-full border border-zinc-200 bg-zinc-50 pl-11 pr-11 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "article" : "articles"} found
          </p>

          {filteredPosts.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {featured && <FeaturedPost post={featured} />}

              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
                  {gridPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-zinc-200">
                <Search className="h-5 w-5 text-zinc-500" aria-hidden="true" />
              </span>
              <div className="space-y-1">
                <h2 className="text-xl font-black text-zinc-900">
                  No articles found
                </h2>
                <p className="text-sm text-zinc-600">
                  Try a different keyword or clear your filters.
                </p>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-[44px] rounded-full bg-zinc-900 px-6 text-sm font-bold text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
