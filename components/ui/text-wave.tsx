"use client";

import { motion } from "framer-motion";

interface TextWaveProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextWave({ text, className = "", delay = 0 }: TextWaveProps) {
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <span className={className}>
      {words.map((word, i) => {
        const characters = word.split("");
        const currentWordIndex = i;

        return (
          // Word Wrapper
          <span key={i} className="inline-block whitespace-nowrap">
            {characters.map((char, j) => {
              const currentDelay = delay + charIndex * 0.05;
              charIndex++;

              return (
                // 1. OUTER WRAPPER: Handles the "Entry" (Blur/Fade) animation
                <motion.span
                  key={j}
                  initial={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.4,
                    delay: currentDelay,
                    ease: "easeOut",
                  }}
                  className="inline-block relative overflow-hidden h-[1.1em] align-bottom" // Fixed height for rolling effect
                >
                  {/* 2. INNER SLIDER: Handles the "Hover" (Roll) animation */}
                  <motion.span
                    className="flex flex-col" // Stack letters vertically
                    whileHover={{ y: "-100%" }} // Slide up on hover
                    transition={{ duration: 0.3, ease: "circOut" }}
                  >
                    {/* The Visible Letter */}
                    <span className="h-[1.1em] flex items-center">{char}</span>

                    {/* The Hidden Duplicate (waiting at the bottom) */}
                    <span className="h-[1.1em] flex items-center absolute top-full text-primary">
                      {" "}
                      {/* Optional: Make duplicate colored */}
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

            {(() => {
              if (currentWordIndex < words.length - 1) charIndex++;
              return null;
            })()}
          </span>
        );
      })}
    </span>
  );
}
