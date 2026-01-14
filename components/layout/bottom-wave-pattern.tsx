"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BottomWavePattern() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine opacity based on theme (subtler in dark mode)
  const opacity = mounted && theme === "dark" ? 0.15 : 0.1;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[500px] w-full overflow-hidden z-0 pointer-events-none">
      {/* Use a mask to fade the waves out at the top 
         so they blend seamlessly into the page content.
      */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 20%, transparent 100%)",
        }}
      >
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <defs>
            <linearGradient id="wave-grad" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--grid-color)"
                stopOpacity={opacity}
              />
              <stop
                offset="100%"
                stopColor="var(--grid-color)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Wave 1: Slowest, furthest back */}
          <path
            fill="url(#wave-grad)"
            className="animate-wave-slow origin-bottom"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,138.7C672,117,768,107,864,117.3C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />

          {/* Wave 2: Medium speed */}
          <path
            fill="url(#wave-grad)"
            className="animate-wave-medium origin-bottom"
            style={{ opacity: 0.7 }}
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />

          {/* Wave 3: Fastest, closest */}
          <path
            fill="url(#wave-grad)"
            className="animate-wave-fast origin-bottom"
            style={{ opacity: 0.5 }}
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
}
