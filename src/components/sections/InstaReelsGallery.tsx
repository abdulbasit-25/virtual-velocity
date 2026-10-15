"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/sections/home/primitives";

const BRAND_REELS = [
  {
    id: "reel-01",
    title: "Warning: Boredom Isn't Allowed at Megazone!",
    category: "Entertainment & Gaming",
    client: "Megazone",
    thumbnail: "/images/reels/reel-01.jpg",
    videoUrl: "https://www.instagram.com/reel/Daz6TClqB8r/",
  },
  {
    id: "reel-02",
    title: "Adulting & Modern Coffee Culture",
    category: "Lifestyle & Cafe",
    client: "Virtual Velocity",
    thumbnail: "/images/reels/reel-02.jpg",
    videoUrl: "https://www.instagram.com/reel/DW3yDsgoYOf/",
  },
  {
    id: "reel-03",
    title: "POV: Finding the Ultimate Action Playground",
    category: "Brand Campaign",
    client: "Megazone",
    thumbnail: "/images/reels/reel-03.jpg",
    videoUrl: "https://www.instagram.com/reel/DbxUokOqqsR/",
  },
  {
    id: "reel-04",
    title: "No Blueprint for Greatness: Raw Grit & Focus",
    category: "Performance & Athletics",
    client: "Virtual Velocity",
    thumbnail: "/images/reels/reel-04.jpg",
    videoUrl: "https://www.instagram.com/reel/DLKfZ5xImaT/",
  },
  {
    id: "reel-05",
    title: "Step into Comfort, Power & Unstoppable Style",
    category: "Fashion & Sportswear",
    client: "ANTA Pakistan",
    thumbnail: "/images/reels/reel-05.jpg",
    videoUrl: "https://www.instagram.com/reel/DNxaqZu0JxB/",
  },
  {
    id: "reel-06",
    title: "Margalla Hills Backdrop & Iconic Baradari Views",
    category: "Hospitality & Dining",
    client: "Andaz Restaurant",
    thumbnail: "/images/reels/reel-06.jpg",
    videoUrl: "https://www.instagram.com/reel/Dck9aXZtO1q/",
  },
  {
    id: "reel-07",
    title: "Craving the Ultimate Live BBQ Experience?",
    category: "Culinary & Food",
    client: "Desi Chapter",
    thumbnail: "/images/reels/reel-07.jpg",
    videoUrl: "https://www.instagram.com/reel/DbVKsyPsNew/",
  },
  {
    id: "reel-08",
    title: "From Sizzling BBQ to Juicy Grilled Cuts",
    category: "Gourmet Dining",
    client: "Desi Chapter",
    thumbnail: "/images/reels/reel-08.jpg",
    videoUrl: "https://www.instagram.com/reel/DZxCBSysaQ1/",
  },
  {
    id: "reel-09",
    title: "Good Food, Cozy Ambiance & Perfect Escapes",
    category: "Destination Dining",
    client: "Pamir Restaurant",
    thumbnail: "/images/reels/reel-09.jpg",
    videoUrl: "https://www.instagram.com/reel/DYRcJS6IdvK/",
  },
  {
    id: "reel-10",
    title: "Cozy Corners, Warm Lights & Coffee Comfort",
    category: "Cafe & Culture",
    client: "Chaaye Khana",
    thumbnail: "/images/reels/reel-10.jpg",
    videoUrl: "https://www.instagram.com/reel/DSCsMtkDUPm/",
  },
  {
    id: "reel-11",
    title: "Relationship Status? Fully Committed to Good Food",
    category: "Food & Hospitality",
    client: "Mughlai",
    thumbnail: "/images/reels/reel-11.jpg",
    videoUrl: "https://www.instagram.com/reel/DSXZwAsDZxY/",
  },
  {
    id: "reel-12",
    title: "From Raw Threads to Sheer Elegance",
    category: "Couture & Fashion",
    client: "Virtual Velocity",
    thumbnail: "/images/reels/reel-12.jpg",
    videoUrl: "https://www.instagram.com/reel/DbN1UbgC7J2/",
  },
] as const;

function ReelCard({
  reel,
  duplicate = false,
}: {
  reel: (typeof BRAND_REELS)[number];
  duplicate?: boolean;
}) {
  const content = (
    <>
      <Image
        src={reel.thumbnail}
        alt={duplicate ? "" : `${reel.client}: ${reel.title}`}
        fill
        sizes="(max-width: 640px) 68vw, (max-width: 1024px) 34vw, 230px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-zinc-950/10" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110"
      >
        <Play className="ml-0.5 h-5 w-5 fill-current" />
      </span>
      <span className="absolute inset-x-4 bottom-4 text-left text-white">
        <span className="block text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-white/75">
          {reel.category} · {reel.client}
        </span>
        <span className="mt-2 line-clamp-3 block text-sm font-bold leading-snug sm:text-base">
          {reel.title}
        </span>
      </span>
    </>
  );

  const className =
    "group relative block aspect-[9/16] w-[68vw] max-w-[230px] shrink-0 overflow-hidden rounded-2xl bg-zinc-900 shadow-lg shadow-zinc-950/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-4 sm:w-[34vw] sm:rounded-3xl lg:w-[230px]";

  return (
    <li className="shrink-0">
      {duplicate ? (
        <div aria-hidden="true" className={className}>
          {content}
        </div>
      ) : (
        <Link
          href={reel.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${reel.title} on Instagram`}
          className={className}
        >
          {content}
        </Link>
      )}
    </li>
  );
}

export const InstaReelsGallery = () => (
  <section
    aria-labelledby="reels-heading"
    className="home-section overflow-hidden border-t border-zinc-200 bg-zinc-50 text-zinc-900"
  >
    <div className="home-container">
      <SectionHeader
        eyebrow={<><Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Featured works / reels &amp; media</>}
        index="05"
        title={<>Brand <span className="text-[#00A29F]">Gallery</span></>}
      />
      <h2 id="reels-heading" className="sr-only">Brand gallery</h2>
    </div>
    <div className="hover-marquee group relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-zinc-50 to-transparent sm:w-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-zinc-50 to-transparent sm:w-20"
      />
      <ul className="animate-marquee-left group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] flex w-max gap-4 px-4 sm:gap-6 sm:px-8">
        {BRAND_REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
        {BRAND_REELS.map((reel) => (
          <ReelCard key={`${reel.id}-loop`} reel={reel} duplicate />
        ))}
      </ul>
    </div>
  </section>
);
