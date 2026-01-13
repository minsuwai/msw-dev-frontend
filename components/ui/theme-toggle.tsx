"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div
      className={`
        relative flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors duration-300
        ${isDark ? "bg-zinc-800" : "bg-zinc-200"}
      `}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* The Sliding Circle (Thumb) */}
      <motion.div
        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
        // REMOVED "layout" prop here - this fixes the scroll glitch
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        animate={{
          x: isDark ? 24 : 0, // Simply animate X position
        }}
      >
        {/* The Icon inside the sliding circle */}
        <motion.div
          key={isDark ? "moon" : "sun"}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="h-3.5 w-3.5 text-zinc-900" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-orange-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Background Icons */}
      <div className="absolute left-1.5 text-zinc-400">
        {!isDark && <span className="sr-only">Light</span>}
      </div>
      <div className="absolute right-1.5 text-zinc-500">
        {isDark && <span className="sr-only">Dark</span>}
      </div>
    </div>
  );
}
