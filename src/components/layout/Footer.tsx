"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Phone, MapPin, ChevronUp, ArrowUpRight } from "lucide-react";
import { AGENCY_INFO } from "@/data/agencyData";

/* ============================== DATA ============================== */

const SOCIALS = [
  { label: "Behance", href: "https://www.behance.net/thevirtualvelocity" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/virtualvelocitypk/",
  },
  { label: "Facebook", href: "https://www.facebook.com/virtualvelocitypk/" },
  { label: "Instagram", href: "https://www.instagram.com/virtualvelocity_/" },
  { label: "TikTok", href: "https://www.tiktok.com/@virtualvelocitypk" },
  { label: "Pinterest", href: "https://www.pinterest.com/thevirtualvelocity/" },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Studio", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Branding", href: "/branding" },
  { label: "The Salt Line", href: "/the-salt-line" },
  { label: "Our Work", href: "/#work" },
  { label: "Blog & Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SERVICES_ANCHORS = [
  { label: "Digital Marketing", href: "/services#digital-marketing" },
  { label: "BPO Services", href: "/services#bpo-outsourcing" },
  { label: "Hospitality Marketing", href: "/services#hospitality-marketing" },
  { label: "Restaurant Marketing", href: "/services#restaurant-marketing" },
  { label: "Performance Marketing", href: "/services#performance-marketing" },
];

const OFFICES = [
  { city: "United States", phone: "+1 (417) 897-5749", tel: "+14178975749" },
  {
    city: "Islamabad, Pakistan",
    phone: "+92 332 529 6693",
    tel: "+923325296693",
  },
  { city: "Birmingham, UK", phone: "+44 7756 557500", tel: "+447756557500" },
];

const EMAILS = [
  { label: "New Business (BDO)", email: "info@thevirtualvelocity.com" },
  { label: "General Queries", email: "admin@thevirtualvelocity.com" },
];

/* ============================ SHARED UI ============================ */

const ring =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#00716F]";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Accessible tooltip.
 * - Opens on hover AND keyboard focus, closes on blur / mouse leave / Escape
 * - Sets aria-describedby on the trigger while visible
 * - Never intercepts pointer events
 * - `side` controls placement: top | bottom | left
 */
function Tooltip({
  label,
  side = "top",
  block = false,
  children,
}: {
  label: string;
  side?: "top" | "bottom" | "left";
  block?: boolean;
  children: ReactElement<Record<string, unknown>>;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    side: "top" | "bottom" | "left";
  } | null>(null);
  const reduce = useReducedMotion();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
      closeTimeoutRef.current = null;
    }, 120);
  };

  const close = () => {
    cancelClose();
    setOpen(false);
  };

  useEffect(() => () => cancelClose(), []);

  useLayoutEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      if (!trigger || !tooltip) return;

      const rect = trigger.getBoundingClientRect();
      const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      const gap = 12;
      const margin = 8;
      const roomAbove = rect.top;
      const roomBelow = window.innerHeight - rect.bottom;

      let nextSide = side;
      if (side === "top" && roomAbove < height + gap + margin) {
        nextSide = "bottom";
      } else if (side === "bottom" && roomBelow < height + gap + margin) {
        nextSide = "top";
      } else if (side === "left" && rect.left < width + gap + margin) {
        nextSide = roomAbove >= height + gap + margin ? "top" : "bottom";
      }

      const rawLeft =
        nextSide === "left"
          ? rect.left - width - gap
          : rect.left + rect.width / 2 - width / 2;
      const rawTop =
        nextSide === "top"
          ? rect.top - height - gap
          : nextSide === "bottom"
            ? rect.bottom + gap
            : rect.top + rect.height / 2 - height / 2;
      const maxLeft = Math.max(margin, window.innerWidth - width - margin);
      const maxTop = Math.max(margin, window.innerHeight - height - margin);
      const nextPosition = {
        left: Math.min(maxLeft, Math.max(margin, rawLeft)),
        top: Math.min(maxTop, Math.max(margin, rawTop)),
        side: nextSide,
      };

      setPosition((current) =>
        current?.left === nextPosition.left &&
        current.top === nextPosition.top &&
        current.side === nextPosition.side
          ? current
          : nextPosition,
      );
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, side]);

  const trigger = cloneElement(children, {
    "aria-describedby": open ? id : undefined,
  });

  const tooltipSide = position?.side ?? side;
  const arrow =
    tooltipSide === "top"
      ? "left-1/2 top-full -translate-x-1/2 -translate-y-1/2"
      : tooltipSide === "bottom"
        ? "left-1/2 bottom-full -translate-x-1/2 translate-y-1/2"
        : "left-full top-1/2 -translate-x-1/2 -translate-y-1/2";

  const offset = reduce
    ? { opacity: 0 }
    : tooltipSide === "top"
      ? { opacity: 0, y: 6, scale: 0.96 }
      : tooltipSide === "bottom"
        ? { opacity: 0, y: -6, scale: 0.96 }
        : { opacity: 0, x: 6, scale: 0.96 };

  return (
    <span
      ref={triggerRef}
      className={`relative ${block ? "block w-full" : "inline-flex"}`}
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={close}
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      {trigger}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.span
                ref={tooltipRef}
                id={id}
                role="tooltip"
                initial={offset}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={offset}
                transition={{ duration: 0.16, ease: "easeOut" }}
                style={{
                  position: "fixed",
                  top: position?.top ?? 0,
                  left: position?.left ?? 0,
                  visibility: position ? "visible" : "hidden",
                }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className="pointer-events-auto z-[60] block whitespace-nowrap rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-xl shadow-black/30 ring-1 ring-white/10"
              >
                {label}
                <span
                  aria-hidden="true"
                  className={`absolute h-2 w-2 rotate-45 bg-zinc-950 ${arrow}`}
                />
              </motion.span>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </span>
  );
}

function SocialIcon({
  label,
  className = "h-5 w-5",
}: {
  label: string;
  className?: string;
}) {
  switch (label.toUpperCase()) {
    case "BEHANCE":
      return (
        <svg
          className={`${className} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M7.799 10.748c.78-.344 1.258-1.026 1.258-1.92 0-1.636-1.254-2.528-3.155-2.528H0v11.4h5.99c2.091 0 3.447-.999 3.447-2.825 0-1.633-1.012-2.484-2.228-2.677l.59-.45zm-4.79-2.61h2.38c1.077 0 1.704.47 1.704 1.34 0 .907-.655 1.39-1.704 1.39H3.01V8.138zm2.55 7.674H3.01v-3.08h2.55c1.196 0 1.905.512 1.905 1.517 0 1.057-.737 1.563-1.905 1.563zm11.399-5.112c-2.829 0-4.802 2.05-4.802 4.957 0 2.946 1.95 4.975 4.887 4.975 2.19 0 3.737-1.127 4.398-2.996h-2.12c-.378.84-1.228 1.272-2.278 1.272-1.42 0-2.47-.962-2.564-2.428h7.106c.038-.27.057-.59.057-.866 0-2.894-1.848-4.914-4.684-4.914zm-2.464 4.024c.189-1.325 1.154-2.235 2.445-2.235 1.275 0 2.217.91 2.387 2.235h-4.832zm.178-5.352h4.57v1.275h-4.57V10.67z" />
        </svg>
      );
    case "LINKEDIN":
      return (
        <svg
          className={`${className} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "FACEBOOK":
      return (
        <svg
          className={`${className} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      );
    case "INSTAGRAM":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case "TIKTOK":
      return (
        <svg
          className={`${className} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.32 0 .62.06.9.15V9.41a6.32 6.32 0 0 0-.9-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.28 8.28 0 0 0 4.88 1.55v-3.45a4.86 4.86 0 0 1-1.11-.16z" />
        </svg>
      );
    case "PINTEREST":
      return (
        <svg
          className={`${className} fill-current`}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.057.238-.19.289-.438.174-1.63-.759-2.65-3.142-2.65-5.057 0-4.116 2.991-7.899 8.628-7.899 4.528 0 8.047 3.227 8.047 7.54 0 4.5-2.837 8.122-6.774 8.122-1.323 0-2.566-.688-2.991-1.501l-.814 3.105c-.295 1.137-1.094 2.562-1.63 3.428C9.917 23.864 10.938 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      );
    default:
      return null;
  }
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 sm:mb-5 sm:text-xs">
      <span className="h-px w-5 bg-white/60 sm:w-6" aria-hidden="true" />
      {children}
    </h3>
  );
}

const underline =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-white after:transition-transform after:duration-300 after:ease-out group-hover:after:origin-left group-hover:after:scale-x-100 group-focus-visible:after:origin-left group-focus-visible:after:scale-x-100";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[36px] items-center rounded py-1 text-[15px] font-medium text-white/85 transition-colors duration-200 hover:text-white sm:text-base ${ring}`}
    >
      <span
        aria-hidden="true"
        className="h-0.5 w-0 rounded-full bg-white transition-all duration-300 ease-out group-hover:mr-2.5 group-hover:w-3 group-focus-visible:mr-2.5 group-focus-visible:w-3"
      />
      <span
        className={`transition-transform duration-300 group-hover:translate-x-0.5 ${underline}`}
      >
        {children}
      </span>
    </Link>
  );
}

const cardBase =
  "group flex w-full items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.08] p-3.5 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.16] hover:shadow-lg hover:shadow-black/10 active:translate-y-0 sm:p-4";

const iconBubble =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-[#007573]";

/* ============================= FOOTER ============================= */

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  const reveal = (i = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
        };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#00A29F] via-[#008C89] to-[#00655F] font-outfit text-white"
    >
      <h2 id="footer-heading" className="sr-only">
        Virtual Velocity footer
      </h2>

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-black/25 blur-3xl sm:h-[30rem] sm:w-[30rem]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12">
        {/* ------------------------- CTA ------------------------- */}
        <motion.div
          {...reveal()}
          className="flex flex-col gap-6 border-b border-white/20 py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:py-16"
        >
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 sm:text-xs">
              Let&apos;s work together
            </p>
            <p className="mt-3 text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-tight">
              Ready to put your brand
              <br className="hidden sm:block" /> in the fast lane?
            </p>
          </div>

          <Link
            href="/contact"
            className={`group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-[#007573] shadow-xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-950 hover:text-white hover:shadow-2xl active:translate-y-0 sm:w-auto ${ring}`}
          >
            Start a project
            <ArrowUpRight
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* ----------------------- Main grid ---------------------- */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-10 sm:gap-x-10 sm:pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-x-12 lg:pt-16">
          {/* Brand */}
          <motion.div {...reveal(0)} className="col-span-2 lg:col-span-5">
            <Link
              href="/"
              aria-label="Virtual Velocity home"
              className={`group inline-flex items-center gap-3 rounded ${ring}`}
            >
              <Image
                src="/VV png.png"
                alt=""
                width={44}
                height={44}
                className="h-10 w-auto object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-105 sm:h-11"
              />
              <span className="text-[1.6rem] font-black uppercase leading-none tracking-tight sm:text-3xl">
                Virtual Velocity
              </span>
            </Link>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-[17px]">
              {AGENCY_INFO.tagline}. We combine strategic performance marketing,
              web app engineering, and creative direction to fuel business
              growth across global markets.
            </p>

            <p className="mb-3 mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">
              Follow us
            </p>
            <ul
              className="flex flex-wrap items-center gap-2.5"
              aria-label="Social media"
            >
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Tooltip label={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#007573] hover:shadow-lg hover:shadow-black/20 active:translate-y-0 ${ring}`}
                    >
                      <SocialIcon label={s.label} />
                    </a>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick links */}
          <motion.nav
            {...reveal(1)}
            aria-label="Quick links"
            className="col-span-1 lg:col-span-3"
          >
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Services */}
          <motion.nav
            {...reveal(2)}
            aria-label="Services"
            className="col-span-1 lg:col-span-4"
          >
            <ColumnHeading>Our Services</ColumnHeading>
            <ul>
              {SERVICES_ANCHORS.map((s) => (
                <li key={s.label}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact panel (full width at every breakpoint) */}
          <motion.div
            {...reveal(3)}
            className="col-span-2 rounded-3xl border border-white/15 bg-black/10 p-4 backdrop-blur-sm sm:p-6 lg:col-span-12 lg:p-8"
          >
            <ColumnHeading>Get In Touch</ColumnHeading>

            {/* Emails */}
            <ul className="grid gap-3 md:grid-cols-2">
              {EMAILS.map((item) => (
                <li key={item.email} className="min-w-0">
                  <Tooltip label="Send an email" block>
                    <a
                      href={`mailto:${item.email}`}
                      className={`${cardBase} ${ring}`}
                      aria-label={`Email ${item.label}: ${item.email}`}
                    >
                      <span className={iconBubble}>
                        <Mail
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/70">
                          {item.label}
                        </span>
                        <span className="block text-[15px] font-semibold [overflow-wrap:anywhere] sm:text-base">
                          {item.email}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="hidden h-5 w-5 shrink-0 text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white sm:block"
                        aria-hidden="true"
                      />
                    </a>
                  </Tooltip>
                </li>
              ))}
            </ul>

            {/* Offices */}
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {OFFICES.map((o, i) => (
                <li
                  key={o.city}
                  className={`min-w-0 ${i === OFFICES.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                >
                  <Tooltip label="Call this office" block>
                    <a
                      href={`tel:${o.tel}`}
                      className={`${cardBase} ${ring}`}
                      aria-label={`Call our ${o.city} office on ${o.phone}`}
                    >
                      <span className={iconBubble}>
                        <Phone
                          className="h-[18px] w-[18px]"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/70">
                          <MapPin
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="[overflow-wrap:anywhere]">
                            {o.city}
                          </span>
                        </span>
                        <span className="block text-[15px] font-semibold sm:text-base">
                          {o.phone}
                        </span>
                      </span>
                    </a>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ------------------- Giant wordmark ------------------- */}
        <div
          aria-hidden="true"
          className="pointer-events-none -mb-[0.12em] select-none overflow-hidden text-center font-black uppercase leading-[0.85] tracking-tighter text-[clamp(2rem,8.4vw,7.5rem)]"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.22)",
            maskImage:
              "linear-gradient(to bottom, black 35%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 35%, transparent 100%)",
          }}
        >
          <span className="whitespace-nowrap">Virtual Velocity</span>
        </div>

        {/* ----------------------- Bottom bar ---------------------- */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/20 py-6 text-sm text-white/80 sm:flex-row sm:py-7">
          <p className="text-center sm:text-left">
            © {currentYear} Virtual Velocity. All rights reserved.
          </p>
          <ul className="flex items-center gap-1.5 font-medium">
            <li>
              <Link
                href="/privacy-policy"
                className={`group rounded px-2 py-2 transition-colors hover:text-white ${ring}`}
              >
                <span className={underline}>Privacy Policy</span>
              </Link>
            </li>
            <li aria-hidden="true" className="text-white/40">
              •
            </li>
            <li>
              <Link
                href="/terms-of-use"
                className={`group rounded px-2 py-2 transition-colors hover:text-white ${ring}`}
              >
                <span className={underline}>Terms of Use</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ---------------------- Back to top ---------------------- */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={
              reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }
            }
            animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-[100] sm:bottom-6 sm:left-6"
          >
            <Tooltip label="Back to top" side="left">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-[#00A29F] text-white shadow-2xl shadow-black/30 transition-all duration-300 hover:scale-110 hover:bg-zinc-950 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <ChevronUp
                  className="h-6 w-6 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
