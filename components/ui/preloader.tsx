"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the liquid animation (2.5s) + a little buffer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0, y: -20 }} // Smooth exit
          transition={{ duration: 0.5 }}
        >
          {/* Liquid Text Container */}
          <div className="relative">
            <h1
              className="liquid-text text-6xl md:text-8xl font-black tracking-tighter uppercase"
              data-text="Loading..."
            >
              Loading...
            </h1>

            {/* Optional: Small loading bar below */}
            <div className="mt-8 h-1 w-64 bg-muted overflow-hidden rounded-full mx-auto">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
