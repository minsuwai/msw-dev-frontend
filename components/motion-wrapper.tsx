"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
  repeat?: boolean; // New prop to control re-animation
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
  fullWidth = false,
  repeat = true, // Default to true so it animates every time by default
}: FadeInProps) {
  const directionOffset = {
    up: 40,
    down: -40,
    left: 40,
    right: -40,
  };

  const axis = direction === "left" || direction === "right" ? "x" : "y";

  return (
    <motion.div
      initial={{
        opacity: 0,
        [axis]: directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        [axis]: 0,
      }}
      // "amount" determines how much of the element must be visible to trigger
      // "once: false" allows it to animate again when you scroll back up/down
      viewport={{ once: !repeat, margin: "-50px", amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`${className} ${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </motion.div>
  );
}
