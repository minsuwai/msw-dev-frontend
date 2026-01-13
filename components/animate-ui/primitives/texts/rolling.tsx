"use client";

import { motion } from "framer-motion";

interface RollingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const RollingText = ({
  text,
  className = "",
  delay = 0,
}: RollingTextProps) => {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className}>
      {words.map((word, i) => {
        const characters = word.split("");
        const currentWordIndex = i;

        return (
          // 1. WORD WRAPPER (motion.span)
          // The 'whileHover' is here, so hovering ANY part of the word triggers the effect.
          <motion.span
            key={i}
            className="inline-block whitespace-nowrap cursor-pointer"
            whileHover="hover" // Trigger the "hover" variant
            variants={{
              hover: { transition: { staggerChildren: 0.08 } }, // Stagger letters by 0.03s
            }}
          >
            {characters.map((char, j) => {
              const currentDelay = delay + charIndex * 0.05;
              charIndex++;

              return (
                // 2. LETTER WRAPPER (Handles Entrance + Stagger Reception)
                <motion.span
                  key={j}
                  className="inline-block relative overflow-hidden h-[1.1em] align-bottom"
                  // Entrance Animation (Fade In)
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.4,
                    delay: currentDelay,
                    ease: "easeOut",
                  }}
                  // This empty variant is required to receive the stagger signal from parent
                  variants={{
                    hover: { y: 0 },
                  }}
                >
                  {/* 3. ROLLING SLIDER (Handles the Y-Axis Move) */}
                  <motion.span
                    className="flex flex-col min-w-[4px]"
                    variants={{
                      hover: { y: "-100%" }, // The actual roll effect
                    }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    {/* Visible Letter */}
                    <span className="h-[1.1em] flex items-center">{char}</span>

                    {/* Hidden Duplicate (Wait at bottom) */}
                    <span className="h-[1.1em] flex items-center absolute top-full text-primary font-bold">
                      {char}
                    </span>
                  </motion.span>
                </motion.span>
              );
            })}

            {/* Space Handling */}
            {currentWordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}

            {/* Sync charIndex for spaces */}
            {(() => {
              if (currentWordIndex < words.length - 1) charIndex++;
              return null;
            })()}
          </motion.span>
        );
      })}
    </span>
  );
};
