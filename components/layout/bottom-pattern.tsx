// components/layout/bottom-pattern.tsx
"use client";

export function BottomPattern() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[600px] z-0 pointer-events-none overflow-hidden"
      style={{
        // Create a fade-out effect towards the top
        maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
      }}
    >
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define the wave pattern.
            We use the CSS variable var(--grid-color) for the stroke
            so it automatically inherits your neon color settings.
          */}
          <pattern
            id="bottom-wave-pattern"
            x="0"
            y="0"
            width="100"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 60 C 25 60, 25 0, 50 0 C 75 0, 75 60, 100 60"
              fill="none"
              stroke="var(--grid-color)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
            <path
              d="M0 0 C 25 0, 25 60, 50 60 C 75 60, 75 0, 100 0"
              fill="none"
              stroke="var(--grid-color)"
              strokeWidth="1"
              strokeOpacity="0.5"
            />
          </pattern>
        </defs>
        {/* Fill a rectangle with the pattern */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#bottom-wave-pattern)"
        />
      </svg>
    </div>
  );
}
