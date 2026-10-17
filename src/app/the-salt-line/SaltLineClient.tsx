"use client";

import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

// Cloudinary Hosted Images for The Salt Line Case Study
const CLOUDINARY_IMAGES = {
  slide1: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790186939/1.png", // Header image covering top navigation
  slide2: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179028/2.png", // The Challenge
  slide3: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179027/3.png", // The Music Was The Difference
  slide4: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179028/4.png", // Real Moments -> Real Content
  slide5: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179030/5.png", // The #WOW Moment
  slide6: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179033/6.png", // We Weren't Just Growing A Page
  slide7: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179032/7.png", // What We Actually Did
  slide8: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179027/8.png", // The Result
  slide9: "https://res.cloudinary.com/nudghwmz/image/upload/f_auto,q_auto,w_1400/v1790179027/9.png", // VV's Role
};

export function SaltLineClient() {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <Navigation />

      {/* Main container joining all Salt Line images end-to-end from top to bottom (like Branding page) */}
      <main id="main-content" tabIndex={-1} className="w-full bg-[#0a0a0a] m-0 p-0 overflow-x-hidden">
        <h1 className="sr-only">The Salt Line Case Study</h1>
        <section className="w-full m-0 p-0 flex flex-col">

          {/* 1st Image: Covers the header and overlays 2nd image with rounded bottom edges */}
          <div className="relative w-full m-0 p-0 leading-none z-10 -mb-6 sm:-mb-10 md:-mb-14 lg:-mb-20 rounded-b-2xl sm:rounded-b-3xl md:rounded-b-[2.5rem] lg:rounded-b-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
            <Image
              src={CLOUDINARY_IMAGES.slide1}
              alt="The Salt Line Case Study - Good Food. Great Music. Real People."
              width={1920}
              height={1080}
              priority
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 2nd Image: The Challenge */}
          <div className="relative w-full m-0 p-0 leading-none z-0">
            <Image
              src={CLOUDINARY_IMAGES.slide2}
              alt="The Salt Line - The Challenge"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 3rd Image: The Music Was The Difference */}
          <div className="relative w-full m-0 p-0 leading-none z-0">
            <Image
              src={CLOUDINARY_IMAGES.slide3}
              alt="The Salt Line - The Music Was The Difference"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 4th Image: Overlays 3rd image with rounded top edges */}
          <div className="relative w-full m-0 p-0 leading-none z-10 -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-20 rounded-t-2xl sm:rounded-t-3xl md:rounded-t-[2.5rem] lg:rounded-t-[3.5rem] overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
            <Image
              src={CLOUDINARY_IMAGES.slide4}
              alt="The Salt Line - Real Moments Real Content Real Audience"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 5th Image: Overlays next image with rounded bottom edges */}
          <div className="relative w-full m-0 p-0 leading-none z-20 -mb-6 sm:-mb-10 md:-mb-14 lg:-mb-20 rounded-b-2xl sm:rounded-b-3xl md:rounded-b-[2.5rem] lg:rounded-b-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
            <Image
              src={CLOUDINARY_IMAGES.slide5}
              alt="The Salt Line - The #WOW Moment 3-4 Months Organic Trajectory"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 6th Image (Crowd): Overlays next image with prominent rounded bottom edges */}
          <div className="relative w-full m-0 p-0 leading-none z-10 -mb-8 sm:-mb-14 md:-mb-20 lg:-mb-28 rounded-b-2xl sm:rounded-b-3xl md:rounded-b-[2.5rem] lg:rounded-b-[3.5rem] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
            <Image
              src={CLOUDINARY_IMAGES.slide6}
              alt="The Salt Line - Packed Qawwali Night Crowd"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 7th Image: Floating with rounded top & bottom edges overlaying 6th and 8th */}
          <div className="relative w-full m-0 p-0 leading-none z-10 -mt-[5.6vw] -mb-[5.6vw] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
            <Image
              src={CLOUDINARY_IMAGES.slide7}
              alt="The Salt Line - 5 Pillars What We Actually Did"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 8th Image: The Result */}
          <div className="relative w-full m-0 p-0 leading-none z-0">
            <Image
              src={CLOUDINARY_IMAGES.slide8}
              alt="The Salt Line - The Result Analytics Dashboard"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
          </div>

          {/* 9th Image: VV's Role - Joined end-to-end after 8th */}
          <div className="relative w-full m-0 p-0 leading-none z-0">
            <Image
              src={CLOUDINARY_IMAGES.slide9}
              alt="The Salt Line - Virtual Velocity's Role"
              width={1920}
              height={1080}
              sizes="100vw"
              className="w-full h-auto block m-0 p-0 select-none pointer-events-auto"
            />
            {/* Smooth gradient fade over bottom of 9th image into dark background */}
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 md:h-56 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] pointer-events-none" />
          </div>
        </section>

        {/* Seamless transitional gradient bridging dark portfolio into vibrant teal footer */}
        <div className="relative w-full h-24 sm:h-32 md:h-44 bg-gradient-to-b from-[#0a0a0a] to-[#00A29F] pointer-events-none overflow-hidden">
          {/* Ambient teal glow accent */}
          <div className="absolute inset-0 bg-radial-[at_50%_100%] from-[#00A29F]/30 via-transparent to-transparent" />
        </div>

        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
