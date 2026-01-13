"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  offset?: number; // How much it moves (e.g., 50px or 100px)
  className?: string;
  stiffness?: number; // Physics spring stiffness
  damping?: number; // Physics spring damping
}

export function Parallax({
  children,
  offset = 50,
  className = "",
  stiffness = 100,
  damping = 30,
}: ParallaxProps) {
  const ref = useRef(null);

  // 1. Track when this specific element is in the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // From "top enters screen" to "bottom leaves screen"
  });

  // 2. Map scroll progress (0 to 1) to pixel movement (-offset to +offset)
  const rawY = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  // 3. Add a spring physics effect so the movement feels fluid/weighted
  const y = useSpring(rawY, { stiffness, damping });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
