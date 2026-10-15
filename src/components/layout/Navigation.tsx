"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  type Variants,
} from "framer-motion";
import { Menu, X, ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/ui/Magnetic";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "OWNED MEDIA", href: "/owned-media" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Theme tokens: one place for light / dark (Salt Line) styling        */
/* ------------------------------------------------------------------ */
const THEMES = {
  light: {
    barTop: "bg-white/60 backdrop-blur-md border-zinc-200/60",
    barScrolled:
      "bg-white/85 backdrop-blur-xl border-zinc-200/90 shadow-lg shadow-zinc-950/5",
    logoText: "text-zinc-950 group-hover:text-emerald-600",
    logoImg: "mix-blend-multiply",
    link: "text-zinc-600 hover:text-zinc-950",
    linkActive: "text-zinc-950",
    pill: "bg-zinc-100",
    cta: "bg-emerald-500/[0.08] hover:bg-emerald-500/[0.14] text-zinc-950 group-hover:text-emerald-700 border-emerald-500/25",
    ctaIcon:
      "bg-emerald-500/15 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white",
    toggle: "bg-zinc-100/80 border-zinc-200 text-zinc-900",
    drawer: "bg-white text-zinc-950",
    drawerBorder: "border-zinc-200",
    drawerMuted: "text-zinc-500",
    drawerLink: "text-zinc-900 hover:text-emerald-600",
    drawerLinkActive: "text-emerald-600",
    closeBtn: "bg-zinc-100 hover:bg-emerald-50 text-zinc-900 border-zinc-200",
  },
  dark: {
    barTop: "bg-black/40 backdrop-blur-md border-white/10",
    barScrolled:
      "bg-zinc-950/85 backdrop-blur-xl border-zinc-800/80 shadow-lg shadow-black/40",
    logoText: "text-white group-hover:text-emerald-400",
    logoImg: "brightness-0 invert",
    link: "text-zinc-400 hover:text-white",
    linkActive: "text-white",
    pill: "bg-white/10",
    cta: "bg-white/10 hover:bg-white/20 text-white group-hover:text-emerald-300 border-white/20",
    ctaIcon:
      "bg-white/10 text-emerald-400 group-hover:bg-emerald-400 group-hover:text-zinc-950",
    toggle: "bg-zinc-800/80 border-zinc-700 text-white",
    drawer: "bg-zinc-950 text-white",
    drawerBorder: "border-zinc-800",
    drawerMuted: "text-zinc-400",
    drawerLink: "text-zinc-100 hover:text-emerald-400",
    drawerLinkActive: "text-emerald-400",
    closeBtn: "bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */
const drawerVariants: Variants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const Navigation = () => {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState<{
    pathname: string;
    open: boolean;
  }>(() => ({ pathname, open: false }));
  const [scrolled, setScrolled] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const mobileOpen = mobileMenu.open;

  if (mobileMenu.pathname !== pathname) {
    setMobileMenu({ pathname, open: false });
  }

  const isSaltLine = pathname === "/the-salt-line";
  const t = isSaltLine ? THEMES.dark : THEMES.light;

  /* Scroll state: compact bar + hide on scroll down / show on scroll up */
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  /* Lock body scroll + Escape to close while drawer is open */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenu({ pathname, open: false });
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 lg:px-8 pointer-events-none">
        <div
          className={`pointer-events-auto relative mx-auto flex max-w-[1700px] items-center justify-between overflow-hidden rounded-2xl border px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
            scrolled ? `h-14 ${t.barScrolled}` : `h-14 sm:h-16 ${t.barTop}`
          }`}
        >
          {/* Logo */}
          <Magnetic strength={0.15}>
            <Link
              href="/"
              aria-label="Virtual Velocity home"
              className="group relative flex h-full items-center gap-2.5 font-outfit uppercase tracking-tighter"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 -z-10 scale-75 rounded-2xl bg-emerald-400/30 opacity-0 blur-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
              />
              <Image
                src="/VV png.png"
                alt=""
                width={40}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className={`h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-8 ${t.logoImg}`}
                priority
              />
              <span
                className={`text-sm font-black transition-colors duration-300 sm:text-base lg:text-lg ${t.logoText}`}
              >
                VIRTUAL{" "}
                <span className="inline-block text-emerald-500 transition-transform duration-500 group-hover:rotate-180">
                  •
                </span>{" "}
                VELOCITY
              </span>
            </Link>
          </Magnetic>

          {/* Desktop nav: shared-layout pill follows hover / active */}
          <nav
            aria-label="Primary"
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden h-full items-center gap-0.5 lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              const showPill = hoveredHref ? hoveredHref === link.href : false;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  onFocus={() => setHoveredHref(link.href)}
                  onBlur={() => setHoveredHref(null)}
                  className={`relative flex shrink-0 items-center justify-center rounded-lg px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-150 ${
                    isActive ? t.linkActive : t.link
                  }`}
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className={`absolute inset-0 rounded-lg ${t.pill}`}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 36,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="pointer-events-none absolute bottom-0.5 left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-emerald-500"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden h-full items-center lg:flex">
            <Magnetic strength={0.1}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center rounded-xl active:scale-[0.97] transition-transform duration-200"
              >
                {/* Glow that blooms on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1.5 -z-10 rounded-2xl bg-[#00A29F]/40 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                />

                {/* Revolving border (original), with a brighter, longer tail */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl p-[2px]"
                  style={{
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                >
                  <span
                    className="absolute inset-[-250%] group-hover:[animation-duration:1.5s]"
                    style={{
                      background:
                        "conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 40%, rgba(0,162,159,0.25) 58%, #00A29F 76%, #22bcba 88%, #7ae6e3 96%, transparent 100%)",
                      animation: "spin 3s linear infinite",
                      willChange: "transform",
                    }}
                  />
                </span>

                {/* Button body */}
                <span
                  className={`relative z-10 inline-flex items-center gap-2 overflow-hidden rounded-xl border px-5 py-2.5 font-outfit text-[11px] font-black uppercase tracking-[0.15em] backdrop-blur-md transition-colors duration-200 ${t.cta}`}
                >
                  {/* Light sweep on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
                  />
                  <span className="relative">LET&apos;S TALK</span>
                  {/* Arrow circle: rotates up-right and fills on hover */}
                  <span
                    className={`relative flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300 group-hover:rotate-45 ${t.ctaIcon}`}
                  >
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-rotate-45" />
                  </span>
                </span>
              </Link>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() =>
              setMobileMenu((current) => ({ pathname, open: !current.open }))
            }
            className={`relative z-50 rounded-xl border p-2 transition-colors lg:hidden ${t.toggle}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Scroll progress line */}
          <motion.span
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600"
          />
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed inset-0 z-[60] flex flex-col overflow-y-auto p-5 sm:p-10 lg:hidden ${t.drawer}`}
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
            />

            {/* Drawer header */}
            <motion.div
              variants={itemVariants}
              className={`relative flex items-center justify-between border-b pb-4 ${t.drawerBorder}`}
            >
              <Link
                href="/"
                onClick={() => setMobileMenu({ pathname, open: false })}
                className="flex items-center gap-2"
              >
                <Image
                  src="/VV png.png"
                  alt=""
                  width={36}
                  height={36}
                  style={{ width: "auto", height: "auto" }}
                  className={`h-7 w-auto object-contain ${t.logoImg}`}
                />
                <span className="font-outfit text-base font-extrabold sm:text-lg">
                  VIRTUAL <span className="text-emerald-500">•</span> VELOCITY
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenu({ pathname, open: false })}
                aria-label="Close menu"
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 font-mono text-xs font-bold uppercase transition-all ${t.closeBtn}`}
              >
                <span>Close</span>
                <X className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Links */}
            <nav
              aria-label="Mobile"
              className="relative flex flex-1 flex-col justify-center py-8"
            >
              <motion.span
                variants={itemVariants}
                className="mb-4 text-xs font-extrabold uppercase tracking-[0.25em] text-emerald-500"
              >
                Menu
              </motion.span>

              {NAV_LINKS.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenu({ pathname, open: false })}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-baseline gap-4 border-b py-3.5 font-outfit text-3xl font-extrabold uppercase tracking-tight transition-colors sm:text-4xl ${t.drawerBorder} ${
                        isActive ? t.drawerLinkActive : t.drawerLink
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold tracking-widest ${t.drawerMuted}`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 transition-transform duration-300 group-hover:translate-x-2">
                        {link.label}
                      </span>
                      <ArrowUpRight
                        className={`h-5 w-5 self-center transition-all duration-300 ${
                          isActive
                            ? "opacity-100"
                            : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA + inquiries */}
            <motion.div variants={itemVariants} className="relative space-y-5">
              <Link
                href="/contact"
                onClick={() => setMobileMenu({ pathname, open: false })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-outfit text-sm font-black uppercase tracking-wider text-zinc-950 shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400 active:scale-[0.99]"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <div
                className={`flex items-center gap-3 border-t pt-5 ${t.drawerBorder}`}
              >
                <Mail className={`h-4 w-4 ${t.drawerMuted}`} />
                <div>
                  <span
                    className={`block text-[10px] font-bold uppercase tracking-[0.2em] ${t.drawerMuted}`}
                  >
                    Inquiries
                  </span>
                  <a
                    href="mailto:info@thevirtualvelocity.com"
                    className="block font-outfit text-sm font-bold transition-colors hover:text-emerald-500"
                  >
                    info@thevirtualvelocity.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
