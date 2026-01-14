"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function ScrollDown() {
  const shouldReduceMotion = useReducedMotion();

  // 1. Scroll Interaction: Fade out completely within the first 100px
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const yOffset = useTransform(scrollY, [0, 100], [0, 20]);

  // --- ANIMATION VARIANTS ---

  // Mouse Icon: subtle up/down float
  const mouseVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        // FIX: Add 'as const' here
        ease: "easeInOut" as const,
      },
    },
  };

  // The Scroll Wheel inside: slides down and fades
  const wheelVariants = {
    animate: {
      y: [0, 6, 0],
      opacity: [1, 0, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        // FIX: Add 'as const' here
        ease: "easeOut" as const,
      },
    },
  };

  // The Waves: Expand outward and fade to 0 opacity
  const waveTransition = {
    duration: 2,
    repeat: Infinity,
    // FIX: Add 'as const' here
    ease: "easeOut" as const,
  };

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ opacity, y: yOffset }}
      className="absolute bottom-20 lg:bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none"
    >
      <div className="relative flex items-center justify-center">
        {/* --- WAVE 1 (Starts immediately) --- */}
        <motion.div
          className="absolute w-full h-full rounded-full border border-primary/30 bg-primary/5"
          initial={{ width: "100%", height: "100%", opacity: 0.5 }}
          animate={{ width: "300%", height: "200%", opacity: 0 }}
          transition={{ ...waveTransition, delay: 0 }}
        />

        {/* --- WAVE 2 (Delayed by 0.6s) --- */}
        <motion.div
          className="absolute w-full h-full rounded-full border border-primary/20"
          initial={{ width: "100%", height: "100%", opacity: 0.5 }}
          animate={{ width: "300%", height: "200%", opacity: 0 }}
          transition={{ ...waveTransition, delay: 0.6 }}
        />

        {/* --- WAVE 3 (Delayed by 1.2s) --- */}
        <motion.div
          className="absolute w-full h-full rounded-full border border-primary/10"
          initial={{ width: "100%", height: "100%", opacity: 0.5 }}
          animate={{ width: "300%", height: "200%", opacity: 0 }}
          transition={{ ...waveTransition, delay: 1.2 }}
        />

        {/* --- MOUSE ICON --- */}
        <motion.div
          className="relative z-10 w-[26px] h-[40px] rounded-full border-2 border-foreground/30 bg-background/30 backdrop-blur-md shadow-lg"
          variants={mouseVariants}
          animate="animate"
        >
          {/* Internal Wheel */}
          <motion.div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-foreground rounded-full"
            variants={wheelVariants}
            animate="animate"
          />
        </motion.div>
      </div>

      {/* Label */}
      <motion.span
        className="absolute top-full mt-4 text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground/80 whitespace-nowrap"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Scroll Down
      </motion.span>
    </motion.div>
  );
}
