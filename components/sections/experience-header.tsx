"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ExperienceHeader() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 1. Zoom Effect: Starts small (0.5), grows to huge (1.5)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);

  // 2. Opacity: Fades in, stays visible, then fades out slightly as timeline hits
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0]);

  // 3. Blur: Starts blurry, becomes sharp
  const blur = useTransform(scrollYProgress, [0, 0.4], ["10px", "0px"]);

  // 4. Parallax Y: Moves slightly faster than scroll to feel floating
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={containerRef}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      <div className="sticky top-1/2 -translate-y-1/2 w-full px-4 text-center z-10">
        {/* Top Label */}
        <motion.p
          style={{ opacity: opacity }}
          className="text-sm md:text-base font-semibold text-primary tracking-[0.3em] uppercase mb-4"
        >
          Career Journey
        </motion.p>

        {/* Main Title - The Zooming Element */}
        <motion.h2
          style={{
            scale,
            opacity,
            filter: `blur(${blur})`,
            y,
          }}
          className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground will-change-transform"
        >
          Professional
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20">
            Experience
          </span>
        </motion.h2>
      </div>

      {/* Optional: Background Elements to bridge the gap */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
    </section>
  );
}
