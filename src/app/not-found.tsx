import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Virtual Velocity page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SmoothScrollProvider>
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-zinc-900 relative font-outfit flex flex-col justify-between">
        <CustomCursor />
        <Navigation />

        <div className="flex-1 flex items-center justify-center pt-20 sm:pt-24 pb-24 px-4 sm:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 inline-block">
              ERROR 404 — PAGE NOT FOUND
            </span>

            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter text-zinc-900 leading-none">
              4<span className="text-emerald-500">0</span>4
            </h1>

            <p className="text-lg sm:text-2xl font-light text-zinc-600 leading-relaxed max-w-lg mx-auto">
              The requested velocity vector does not exist or has moved to an alternate domain.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full bg-zinc-900 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>RETURN TO HOMEPAGE</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-full border border-zinc-300 hover:border-zinc-900 text-zinc-900 text-xs font-bold uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <span>CONTACT DESK</span>
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
