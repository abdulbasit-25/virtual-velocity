"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught an error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          alignItems: "center",
          background: "#fff",
          color: "#18181b",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, sans-serif",
          justifyContent: "center",
          margin: 0,
          minHeight: "100dvh",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <a href="#main-content" style={{ color: "#006766", marginBottom: "16px" }}>
          Skip to main content
        </a>
        <main id="main-content" tabIndex={-1}>
          <h1>Something went wrong</h1>
          <p>This page could not be loaded. Please try again.</p>
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
