"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error boundary caught an error:", error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-white px-6 text-center text-zinc-900">
      <h1 className="text-3xl font-black">Something went wrong</h1>
      <p className="max-w-lg text-zinc-700">
        This page could not be loaded. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="min-h-11 rounded-xl bg-[#006766] px-5 py-2.5 font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006766] focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </main>
  );
}
