"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { RefreshCw, Home, Mail, TriangleAlert } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const mainRef = useRef<HTMLElement>(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    console.error("Route error boundary caught an error:", error);
  }, [error]);

  // Move focus to the message so keyboard and screen reader users land on it
  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  const handleRetry = () => {
    setRetrying(true);
    reset();
    // If the retry fails again this component re-renders with a new error
    window.setTimeout(() => setRetrying(false), 1200);
  };

  const mailto = `mailto:adddemail@gmail.com?subject=${encodeURIComponent(
    "Website error report",
  )}&body=${encodeURIComponent(
    `Hi team,\n\nI ran into an error on the website.\n\nPage: ${
      typeof window !== "undefined" ? window.location.href : ""
    }\n${error.digest ? `Reference: ${error.digest}\n` : ""}\nWhat I was doing:\n`,
  )}`;

  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-white px-6 py-16 text-center font-outfit text-zinc-900 outline-none"
    >
      {/* Background: soft glows + fading dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00A29F]/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(circle at center, black 20%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 20%, transparent 75%)",
          }}
        />
      </div>

      {/* Icon */}
      <div className="relative mb-7">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-3xl bg-[#00A29F]/30 blur-xl motion-safe:animate-pulse"
        />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-[#00A29F]/30 bg-white text-[#006766] shadow-lg shadow-[#00A29F]/10">
          <TriangleAlert className="h-9 w-9" aria-hidden="true" />
        </span>
      </div>

      <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#006766] sm:text-xs">
        Unexpected error
      </span>

      <h1 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05] tracking-tight text-zinc-950">
        Something went <span className="text-[#00A29F]">wrong</span>
      </h1>

      <p
        role="status"
        className="mt-4 max-w-lg text-base leading-relaxed text-zinc-700 sm:text-lg"
      >
        This page could not be loaded. Please try again. If it keeps happening,
        head back home or let us know and we&apos;ll sort it out.
      </p>

      {/* Actions */}
      <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
        <button
          type="button"
          onClick={handleRetry}
          disabled={retrying}
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#006766] px-6 py-3 font-bold text-white shadow-lg shadow-[#006766]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#005453] active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${retrying ? "motion-safe:animate-spin" : "transition-transform duration-500 group-hover:rotate-180"}`}
            aria-hidden="true"
          />
          {retrying ? "Retrying…" : "Try again"}
        </button>

        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white/80 px-6 py-3 font-bold text-zinc-900 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A29F] hover:text-[#006766] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-2"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <a
          href={mailto}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-zinc-700 underline-offset-4 transition-colors hover:text-[#006766] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-2"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Report this
        </a>
      </div>

      {/* Reference code (helps support find the exact error in the logs) */}
      {error.digest && (
        <p className="mt-10 rounded-full border border-zinc-200 bg-white/80 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-zinc-600 backdrop-blur">
          Reference:{" "}
          <span className="select-all text-zinc-900">{error.digest}</span>
        </p>
      )}
    </main>
  );
}
