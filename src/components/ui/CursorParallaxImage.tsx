"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CursorParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  disableParallax?: boolean;
}

export const CursorParallaxImage = ({ src, alt, className = "", disableParallax = false }: CursorParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // —— Scroll-triggered distortion reveal via GSAP ——
  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    const reveal = revealRef.current;
    if (!container || !inner || !reveal) return;

    const ctx = gsap.context(() => {
      // Clip-path circle reveal on wrapper
      gsap.fromTo(
        reveal,
        { clipPath: "circle(0%)" },
        {
          clipPath: "circle(150%)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // Inner image scales up smoothly
      gsap.fromTo(
        inner,
        { filter: "blur(0px)", scale: 1.15 },
        {
          filter: "blur(0px)",
          scale: 1.05,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || disableParallax || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  const handleMouseLeave = () => {
    if (disableParallax || isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 ${className}`}
    >
      {/* Distortion Reveal Layer */}
      <div
        ref={revealRef}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          clipPath: "circle(0%)",
          background: "rgba(0,0,0,0.02)",
        }}
      />
      <motion.div
        ref={innerRef}
        style={{
          rotateX: disableParallax || isMobile ? 0 : rotateX,
          rotateY: disableParallax || isMobile ? 0 : rotateY,
          scale: 1.15,
          filter: "blur(0px)",
        }}
        className="w-full h-full transform-gpu"
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </motion.div>
  );
};