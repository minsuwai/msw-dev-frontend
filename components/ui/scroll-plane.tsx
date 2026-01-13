"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

export function ScrollPlane() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track window size to redraw path responsively
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    handleResize(); // Initial set
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 1. Scroll Progress
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  // 2. Smooth Physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 80,
    mass: 0.5,
  });

  // 3. Define the Flight Path (The Curve)
  // We draw a Quadratic Bezier curve (Q) from bottom-left to top-right
  // Starting slightly off-screen left/bottom -> Swooping up -> Ending off-screen right/top
  // Control point (Q x1 y1) determines the "bend" of the curve.
  const pathString = `M -100,${windowSize.h * 0.8} Q ${windowSize.w * 0.5},${
    windowSize.h * 0.5
  } ${windowSize.w + 100},${windowSize.h * 0.1}`;

  // 4. Map Scroll to Motion Path Distance (0% to 100%)
  const offsetDistance = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // 5. Trail Opacity (Fades in as we scroll)
  const pathOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  // 6. Dynamic Scaling (Breathing effect)
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  if (prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {/* --- LAYER 1: THE TRAIL (Curved Speed Line) --- */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          <defs>
            <linearGradient
              id="trailGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0)" />{" "}
              {/* Transparent Pink */}
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.5)" />{" "}
              {/* Pink Middle */}
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />{" "}
              {/* Transparent Blue */}
            </linearGradient>

            {/* Glow Filter for the Trail */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* The Path Element */}
          <motion.path
            d={pathString}
            fill="none"
            stroke="url(#trailGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{ opacity: pathOpacity }}
            // Animate the drawing of the line
            pathLength={smoothProgress}
          />
        </svg>

        {/* --- LAYER 2: THE PAPER PLANE --- */}
        <motion.div
          className="absolute left-0 top-0 will-change-transform origin-center"
          style={{
            // CSS Motion Path Magic:
            offsetPath: `path('${pathString}')`,
            offsetDistance: offsetDistance,
            offsetRotate: "auto 90deg", // Points the plane forward along the curve
            scale,
          }}
        >
          {/* THE ICON: Matching your image (Origami Style) */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-2xl"
            style={{ transform: "rotate(-45deg)" }} // Initial adjustment to align with path
          >
            <defs>
              {/* Left Wing Gradient (Deep Purple/Blue) */}
              <linearGradient id="leftWing" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#6366f1" /> {/* Indigo */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
              </linearGradient>

              {/* Right Wing Gradient (Pink/Light Blue) */}
              <linearGradient id="rightWing" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#f472b6" /> {/* Pink */}
                <stop offset="100%" stopColor="#60a5fa" /> {/* Light Blue */}
              </linearGradient>

              {/* Center Crease Shadow */}
              <linearGradient id="centerFold" x1="0" y1="0" x2="0" y2="100">
                <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
              </linearGradient>
            </defs>

            {/* 1. Left Wing (Darker side) */}
            <path
              d="M50 95 L20 65 L50 5 Z"
              fill="url(#leftWing)"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />

            {/* 2. Right Wing (Brighter side) */}
            <path
              d="M50 95 L80 65 L50 5 Z"
              fill="url(#rightWing)"
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.3"
            />

            {/* 3. Center/Fuselage Fold (The 3D look) */}
            <path
              d="M50 5 L50 95 L65 75 Z"
              fill="black"
              fillOpacity="0.2"
              style={{ mixBlendMode: "multiply" }}
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
