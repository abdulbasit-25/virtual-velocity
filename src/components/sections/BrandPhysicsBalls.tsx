"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type * as MatterNS from "matter-js";
import { Sparkles, RotateCcw, Hand } from "lucide-react";

interface BrandItem {
  src: string;
  name: string;
}

const BRANDS: BrandItem[] = [
  { src: "/All logo in SVG Format/pizza hut.svg", name: "Pizza Hut" },
  {
    src: "/All logo in SVG Format/Gloria Jeans logo.svg",
    name: "Gloria Jeans",
  },
  { src: "/All logo in SVG Format/Anta logo.svg", name: "Anta" },
  { src: "/All logo in SVG Format/Unied nations.svg", name: "United Nations" },
  { src: "/All logo in SVG Format/chaaye khana.svg", name: "Chaaye Khana" },
  {
    src: "/All logo in SVG Format/Blue world city.svg",
    name: "Blue World City",
  },
  { src: "/All logo in SVG Format/Red apple.svg", name: "Red Apple" },
  { src: "/All logo in SVG Format/Megazone logo.svg", name: "Megazone" },
  { src: "/All logo in SVG Format/wild wings logo.svg", name: "Wild Wings" },
  { src: "/All logo in SVG Format/chinaar.svg", name: "Chinaar" },
  { src: "/All logo in SVG Format/maple vista.svg", name: "Maple Vista" },
  { src: "/All logo in SVG Format/Glamar.svg", name: "Glamar" },
  { src: "/All logo in SVG Format/andaz.svg", name: "Andaz" },
  { src: "/All logo in SVG Format/ariston.svg", name: "Ariston" },
  { src: "/All logo in SVG Format/capital arena.svg", name: "Capital Arena" },
  { src: "/All logo in SVG Format/cresto.svg", name: "Cresto" },
  { src: "/All logo in SVG Format/de asthethic.svg", name: "De Aesthetic" },
  { src: "/All logo in SVG Format/desi chapter.svg", name: "Desi Chapter" },
  { src: "/All logo in SVG Format/Untitled-1.svg", name: "Galaxy Hayatabad" },
  {
    src: "/All logo in SVG Format/iplexmarketing.svg",
    name: "IPlex Marketing",
  },
  { src: "/All logo in SVG Format/kapacious.svg", name: "Kapacious" },
  { src: "/All logo in SVG Format/levante.svg", name: "Levante" },
  { src: "/All logo in SVG Format/media sniffers.svg", name: "Media Sniffers" },
  { src: "/All logo in SVG Format/Mughlai logo.svg", name: "Mughlai" },
  { src: "/All logo in SVG Format/Pamir.svg", name: "Pamir" },
  { src: "/All logo in SVG Format/shake wake.svg", name: "Shake Wake" },
  { src: "/All logo in SVG Format/slice and cone.svg", name: "Slice and Cone" },
  { src: "/All logo in SVG Format/TSL.svg", name: "TSL" },
  { src: "/All logo in SVG Format/revival.svg", name: "Revival" },
  { src: "/All logo in SVG Format/oxbite.svg", name: "Oxbite" },
];

/**
 * Pick a ball radius from the arena size so all brands always fit with room
 * to move — bigger (more legible) logos on phones thanks to a taller arena,
 * and never oversized on wide desktops.
 */
const computeRadius = (w: number, h: number) => {
  const r = Math.sqrt((0.5 * w * h) / (BRANDS.length * Math.PI));
  return Math.round(Math.max(20, Math.min(42, r)));
};

export const BrandPhysicsBalls = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cleanupPhysicsRef = useRef<(() => void) | null>(null);
  const startLoopRef = useRef<(() => void) | null>(null);
  const stopLoopRef = useRef<(() => void) | null>(null);
  const hasTriggeredRef = useRef(false);
  const initTokenRef = useRef(0);
  const lastWidthRef = useRef(0);

  // Tooltip (single DOM node, positioned from the hovered body each frame)
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLSpanElement>(null);
  const tooltipArrowRef = useRef<HTMLSpanElement>(null);
  const hoveredRef = useRef<number | null>(null);
  const bodiesRef = useRef<MatterNS.Body[]>([]);
  const radiusRef = useRef(36);

  const [hasTriggered, setHasTriggered] = useState(false);
  const [ballRadius, setBallRadius] = useState(36);

  /* ----------------------------- Tooltip ----------------------------- */

  const positionTooltip = useCallback(() => {
    const tip = tooltipRef.current;
    const arrow = tooltipArrowRef.current;
    const container = containerRef.current;
    const idx = hoveredRef.current;
    if (!tip || !container) return;

    if (idx === null) {
      tip.style.opacity = "0";
      return;
    }
    const body = bodiesRef.current[idx];
    if (!body) return;

    const w = tip.offsetWidth;
    const h = tip.offsetHeight;
    const cw = container.clientWidth;
    const r = radiusRef.current;

    let x = body.position.x - w / 2;
    x = Math.max(6, Math.min(cw - w - 6, x));

    let y = body.position.y - r - h - 10;
    let below = false;
    if (y < 6) {
      y = body.position.y + r + 10;
      below = true;
    }

    tip.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    tip.style.opacity = "1";

    if (arrow) {
      const ax = Math.max(12, Math.min(w - 12, body.position.x - x));
      arrow.style.left = `${ax}px`;
      arrow.style.top = below ? "-4px" : "auto";
      arrow.style.bottom = below ? "auto" : "-4px";
    }
  }, []);

  const showTip = useCallback(
    (idx: number) => {
      hoveredRef.current = idx;
      if (tooltipTextRef.current)
        tooltipTextRef.current.textContent = BRANDS[idx].name;
      positionTooltip();
    },
    [positionTooltip],
  );

  const hideTip = useCallback(() => {
    hoveredRef.current = null;
    positionTooltip();
  }, [positionTooltip]);

  /* ----------------------------- Physics ----------------------------- */

  const initPhysics = useCallback(async () => {
    const container = containerRef.current;
    if (!container) return;

    const token = ++initTokenRef.current;

    // Load the physics engine on demand — keeps ~90KB of matter-js off the
    // initial page payload. It is only fetched once this section scrolls in.
    const { default: Matter } = await import("matter-js");
    if (token !== initTokenRef.current || !containerRef.current) return;

    if (cleanupPhysicsRef.current) {
      cleanupPhysicsRef.current();
      cleanupPhysicsRef.current = null;
    }

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width <= 0 || height <= 0) return;
    lastWidthRef.current = width;

    const radius = computeRadius(width, height);
    radiusRef.current = radius;
    setBallRadius(radius);
    hoveredRef.current = null;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.0, scale: 0.0012 },
      enableSleeping: true,
    });

    const wallOptions: MatterNS.IChamferableBodyDefinition = {
      isStatic: true,
      restitution: 0.45,
      friction: 0.35,
    };
    const wallThickness = 120;
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width * 3,
      wallThickness,
      wallOptions,
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 8,
      wallOptions,
    );
    const rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 8,
      wallOptions,
    );
    Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

    const isMobile = width < 640;
    const dropStagger = isMobile ? 8 : 22;
    const bodies: MatterNS.Body[] = BRANDS.map((_, i) => {
      const minX = radius + 10;
      const maxX = Math.max(width - radius - 10, minX + 10);
      const randomX = minX + Math.random() * (maxX - minX);
      const randomY = -radius - i * dropStagger - Math.random() * 20;

      const body = Matter.Bodies.circle(randomX, randomY, radius, {
        restitution: 0.52,
        friction: 0.35,
        frictionAir: 0.016,
        density: 0.002,
        angle: (Math.random() - 0.5) * 0.4,
      });
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 2,
      });
      return body;
    });
    Matter.Composite.add(engine.world, bodies);
    bodiesRef.current = bodies;

    const renderFrame = () => {
      let maxSpeed = 0;
      for (let idx = 0; idx < bodies.length; idx++) {
        const body = bodies[idx];
        const el = ballElementsRef.current[idx];
        if (el) {
          const x = body.position.x - radius;
          const y = body.position.y - radius;
          const deg = (body.angle * 180) / Math.PI;
          el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
        }
        if (body.speed > maxSpeed) maxSpeed = body.speed;
      }
      if (hoveredRef.current !== null) positionTooltip();
      return maxSpeed;
    };

    /* Reduced motion: pre-settle the balls, render once, no animation, no drag. */
    if (reduceMotion) {
      for (let i = 0; i < 600; i++) Matter.Engine.update(engine, 1000 / 60);
      renderFrame();
      startLoopRef.current = () => {};
      stopLoopRef.current = () => {};
      cleanupPhysicsRef.current = () => {
        Matter.World.clear(engine.world, false);
        Matter.Engine.clear(engine);
      };
      return;
    }

    /* Mouse / touch drag */
    const mouse = Matter.Mouse.create(container);
    const typedMouse = mouse as unknown as {
      mousewheel: (e: WheelEvent) => void;
      mousemove: (e: MouseEvent | TouchEvent) => void;
      mousedown: (e: MouseEvent | TouchEvent) => void;
      mouseup: (e: MouseEvent | TouchEvent) => void;
    };

    // Detach Matter's default wheel + touch listeners so page scrolling is never blocked
    const el = mouse.element as HTMLElement;
    el.removeEventListener("wheel", typedMouse.mousewheel);
    el.removeEventListener(
      "mousewheel",
      typedMouse.mousewheel as EventListener,
    );
    el.removeEventListener(
      "DOMMouseScroll",
      typedMouse.mousewheel as EventListener,
    );
    el.removeEventListener("touchmove", typedMouse.mousemove as EventListener);
    el.removeEventListener("touchstart", typedMouse.mousedown as EventListener);
    el.removeEventListener("touchend", typedMouse.mouseup as EventListener);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    let animationFrameId = 0;
    let isRunning = true;
    let isInteracting = false;
    let idleFrames = 0;

    const updateDOM = () => {
      if (!isRunning) return;
      const maxSpeed = renderFrame();

      if (isInteracting || mouseConstraint.body) {
        idleFrames = 0;
      } else if (maxSpeed < 0.12) {
        idleFrames++;
      } else {
        idleFrames = 0;
      }

      // Settled for 50 frames → pause engine + RAF to free the CPU/GPU
      if (idleFrames > 50) {
        isRunning = false;
        Matter.Runner.stop(runner);
        return;
      }
      animationFrameId = requestAnimationFrame(updateDOM);
    };

    const wakeUp = () => {
      idleFrames = 0;
      if (!isRunning) {
        isRunning = true;
        Matter.Runner.run(runner, engine);
        animationFrameId = requestAnimationFrame(updateDOM);
      }
    };

    animationFrameId = requestAnimationFrame(updateDOM);

    let activeTouch = false;
    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-ball='true']")) {
        activeTouch = true;
        isInteracting = true;
        wakeUp();
        typedMouse.mousedown(e);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (activeTouch && mouseConstraint.body) {
        if (e.cancelable) e.preventDefault();
        wakeUp();
        typedMouse.mousemove(e);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (activeTouch) {
        activeTouch = false;
        isInteracting = false;
        wakeUp();
        typedMouse.mouseup(e);
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("[data-ball='true']")) {
        isInteracting = true;
        wakeUp();
      }
    };
    const onPointerUp = () => {
      if (isInteracting) {
        isInteracting = false;
        wakeUp();
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("touchcancel", onTouchEnd, { passive: true });
    container.addEventListener("mousedown", onPointerDown, { passive: true });
    window.addEventListener("mouseup", onPointerUp, { passive: true });

    // Pause physics & RAF when off-screen
    startLoopRef.current = wakeUp;
    stopLoopRef.current = () => {
      if (isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        Matter.Runner.stop(runner);
      }
    };

    cleanupPhysicsRef.current = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [positionTooltip]);

  /* --------------------- Start when scrolled into view --------------------- */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            setHasTriggered(true);
            initPhysics();
          } else {
            startLoopRef.current?.();
          }
        } else {
          stopLoopRef.current?.();
        }
      },
      { threshold: 0.05, rootMargin: "80px 0px 80px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [initPhysics]);

  /* Re-init on real width changes only (debounced). Ignoring height-only
     resizes stops mobile address-bar show/hide from resetting the arena. */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const c = containerRef.current;
        if (!c || !hasTriggeredRef.current) return;
        if (Math.abs(c.clientWidth - lastWidthRef.current) > 1) initPhysics();
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [initPhysics]);

  useEffect(() => {
    return () => {
      initTokenRef.current++; // cancel any in-flight init
      cleanupPhysicsRef.current?.();
      cleanupPhysicsRef.current = null;
    };
  }, []);

  /* ------------------------------ Render ------------------------------ */

  return (
    <section
      aria-labelledby="brands-heading"
      className="relative mx-auto w-full max-w-[1700px] select-none border-t border-zinc-200 bg-white px-4 py-12 text-zinc-900 sm:px-8 sm:py-16 lg:px-12 lg:py-24"
    >
      {/* Header */}
      <div className="mb-6 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#00A29F] sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Our Clients &amp; Partners</span>
          </div>
          <h2
            id="brands-heading"
            className="font-outfit text-[clamp(1.6rem,4.5vw,3rem)] font-black uppercase leading-[1.05] tracking-tight text-zinc-950"
          >
            Trusted by <span className="text-[#00A29F]">Ambitious Brands.</span>
          </h2>
          <p className="mt-3 text-sm font-normal leading-relaxed text-zinc-600 sm:text-base">
            From high-growth scaleups to international enterprises, we engineer
            measurable momentum for brands worldwide.
          </p>
        </div>

        <button
          type="button"
          onClick={() => initPhysics()}
          className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00A29F] hover:text-[#00A29F] hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00A29F] focus-visible:ring-offset-2 sm:w-auto"
        >
          <RotateCcw
            className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180"
            aria-hidden="true"
          />
          Drop again
        </button>
      </div>

      {/* Screen-reader list of brands (the arena itself is visual/interactive) */}
      <ul className="sr-only">
        {BRANDS.map((b) => (
          <li key={b.name}>{b.name}</li>
        ))}
      </ul>

      {/* Physics arena */}
      <div
        ref={containerRef}
        role="group"
        aria-label="Interactive logos of our clients and partners. Drag a logo to move it."
        className="relative h-[340px] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 shadow-[inset_0_2px_12px_rgba(0,0,0,0.04)] sm:h-[340px] lg:h-[400px]"
        style={{ touchAction: "pan-y" }}
      >
        {/* Dot grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(#18181b 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden px-2"
        >
          <span className="w-full whitespace-nowrap text-center font-outfit text-[clamp(2.25rem,11vw,8rem)] font-black uppercase tracking-[0.25em] text-[#00A29F]/[0.12]">
            Velocity
          </span>
        </div>

        {/* Balls */}
        {BRANDS.map((brand, idx) => (
          <div
            key={brand.name}
            data-ball="true"
            aria-hidden="true"
            ref={(el) => {
              ballElementsRef.current[idx] = el;
            }}
            onPointerEnter={() => showTip(idx)}
            onPointerLeave={hideTip}
            className={`group absolute left-0 top-0 z-10 cursor-grab touch-none select-none will-change-transform active:cursor-grabbing ${
              hasTriggered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              width: `${ballRadius * 2}px`,
              height: `${ballRadius * 2}px`,
              transform: "translate3d(-200px, -200px, 0)",
            }}
          >
            {/* Inner circle takes the hover styling so it never fights the physics transform */}
            <div className="flex h-full w-full items-center justify-center rounded-full border border-zinc-200 bg-white p-[3px] shadow-[0_4px_14px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-[#00A29F] group-hover:shadow-[0_10px_28px_rgba(0,162,159,0.35)] group-active:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.src}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="pointer-events-none h-auto max-h-[88%] w-auto max-w-[88%] select-none object-contain"
              />
            </div>
          </div>
        ))}

        {/* Tooltip (single node, positioned by JS) */}
        <div
          ref={tooltipRef}
          role="tooltip"
          className="pointer-events-none absolute left-0 top-0 z-20 rounded-lg bg-zinc-950 px-3 py-1.5 text-xs font-semibold tracking-wide text-white opacity-0 shadow-xl shadow-black/25 ring-1 ring-white/10 transition-opacity duration-150"
        >
          <span ref={tooltipTextRef} className="whitespace-nowrap" />
          <span
            ref={tooltipArrowRef}
            aria-hidden="true"
            className="absolute h-2 w-2 -translate-x-1/2 rotate-45 bg-zinc-950"
          />
        </div>

        {/* Floor lip */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-2 rounded-b-3xl bg-gradient-to-r from-[#00A29F] via-[#22bcba] to-[#008280] opacity-90"
        />
      </div>

      {/* Caption */}
      <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[11px] text-zinc-600">
        <span className="font-semibold uppercase tracking-wider">
          {BRANDS.length}+ Global Partner Brands
        </span>
        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#00A29F]">
          <Hand className="h-3.5 w-3.5" aria-hidden="true" />
          Drag &amp; throw the logos
        </span>
      </div>
    </section>
  );
};
