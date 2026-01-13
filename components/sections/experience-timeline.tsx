"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";

// --- MOCK DATA ---
const experienceData = [
  {
    year: "2024",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    description:
      "Leading the Core UI team. Focusing on performance optimization and design system architecture.",
    tags: ["Next.js", "React", "System Design"],
  },
  {
    year: "2022",
    title: "Product Engineer",
    company: "Linear",
    description:
      "Built the real-time sync engine and the new issue triage interface. Improved animation performance.",
    tags: ["WebSockets", "Canvas", "Performance"],
  },
  {
    year: "2020",
    title: "Full Stack Developer",
    company: "Shopify",
    description:
      "Developed custom storefront themes and apps with a focus on accessible e-commerce experiences.",
    tags: ["Liquid", "TypeScript", "A11y"],
  },
  {
    year: "2018",
    title: "UI Designer & Dev",
    company: "Freelance",
    description:
      "Worked with 15+ startups to launch MVP products. Specialized in high-fidelity prototyping.",
    tags: ["Figma", "React", "Motion"],
  },
];

// --- CARD COMPONENT ---
function TimelineItem({
  data,
  index,
  isCompact,
}: {
  data: (typeof experienceData)[0];
  index: number;
  isCompact: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const isEven = index % 2 === 0;
  const isLeft = isEven && !isCompact;

  return (
    <div
      ref={ref}
      className={`relative flex items-center w-full mb-16 md:mb-32 pointer-events-none 
        ${isCompact ? "justify-end" : isEven ? "justify-end" : "justify-start"}
      `}
    >
      {!isCompact && <div className="w-1/2" />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`pointer-events-auto relative z-10 
          ${isCompact ? "w-[85%] pl-6 pr-4 text-left" : "w-1/2 px-16"} 
          ${!isCompact && isLeft ? "text-right order-first" : ""}
        `}
      >
        <span className="inline-block px-3 py-1 mb-3 text-xs font-mono font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
          {data.year}
        </span>
        <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
          {data.title}
        </h3>
        <p className="text-lg md:text-xl font-medium text-muted-foreground mb-4">
          {data.company}
        </p>
        <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-md ml-0 md:ml-auto md:mr-0">
          <span
            className={`block ${
              !isCompact && !isLeft ? "md:mr-auto md:ml-0" : ""
            }`}
          >
            {data.description}
          </span>
        </p>

        <div
          className={`flex flex-wrap gap-2 mt-4 ${
            !isCompact && isLeft ? "justify-end" : "justify-start"
          }`}
        >
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] font-medium uppercase tracking-wider rounded-md bg-white/5 border border-white/10 text-muted-foreground/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // NEW: Tracks content height
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isCompact, setIsCompact] = useState(false);

  // 1. ROBUST DIMENSION TRACKING
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && contentRef.current) {
        const width = containerRef.current.offsetWidth;
        // Use the height of the CONTENT, not the container
        const height = contentRef.current.offsetHeight;

        setDimensions({ width, height });
        setIsCompact(width < 1024);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Observer handles dynamic text wrapping/loading
    const observer = new ResizeObserver(updateDimensions);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  // 2. SCROLL LOGIC
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
  });
  const offsetDistance = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // 3. PATH CALCULATION
  const ITEM_HEIGHT = dimensions.height / experienceData.length;
  const CENTER_X = isCompact ? 40 : dimensions.width / 2;

  let pathD = `M ${CENTER_X} 0`;

  experienceData.forEach((_, i) => {
    const yStart = i * ITEM_HEIGHT + ITEM_HEIGHT * 0.2;
    const yEnd = (i + 1) * ITEM_HEIGHT;

    if (isCompact) {
      pathD += ` C ${CENTER_X + 15} ${yStart}, ${CENTER_X + 15} ${
        yEnd - 50
      }, ${CENTER_X} ${yEnd}`;
    } else {
      const isEven = i % 2 === 0;
      const curveAmp = 120;
      const controlX = isEven ? CENTER_X + curveAmp : CENTER_X - curveAmp;
      pathD += ` C ${controlX} ${yStart + 100}, ${controlX} ${
        yEnd - 100
      }, ${CENTER_X} ${yEnd}`;
    }
  });

  if (dimensions.height > 0) {
    pathD += ` L ${CENTER_X} ${dimensions.height}`;
  }

  return (
    // Removed 'pb-24' here, letting the page handle spacing
    <section className="bg-background relative overflow-hidden">
      <div className="container mx-auto px-0 sm:px-4 max-w-7xl">
        {/* Timeline Container */}
        <div ref={containerRef} className="relative min-h-[800px]">
          {/* --- LAYER 1: SVG PATH --- */}
          {/* Height is forced to match content height */}
          <div
            className="absolute top-0 left-0 w-full z-0 pointer-events-none overflow-visible"
            style={{
              height: dimensions.height > 0 ? dimensions.height : "100%",
            }}
          >
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                  <stop offset="10%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="90%" stopColor="#ec4899" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d={pathD}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeWidth="2"
                strokeDasharray="8 8"
              />

              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                strokeDasharray="8 8"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          </div>

          {/* --- LAYER 2: ORIGAMI PLANE --- */}
          <div
            className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none overflow-hidden"
            style={{ opacity: dimensions.width > 0 ? 1 : 0 }}
          >
            <motion.div
              className="absolute top-0 left-0 w-[40px] h-[40px] md:w-[50px] md:h-[50px] z-50 will-change-transform origin-center"
              style={{
                offsetPath: `path('${pathD}')`,
                offsetDistance: offsetDistance,
                offsetRotate: "auto 90deg",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                fill="none"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
              >
                <defs>
                  <linearGradient
                    id="planeGrad"
                    x1="0"
                    y1="100"
                    x2="100"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 L20 95 L50 75 L80 95 L50 5Z"
                  fill="url(#planeGrad)"
                  stroke="white"
                  strokeWidth="2"
                />
                <path
                  d="M50 5 L50 75"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          </div>

          {/* --- LAYER 3: CONTENT CARDS --- */}
          {/* contentRef measures the true height for the SVG line */}
          <div ref={contentRef} className="relative z-10 pt-10 pb-10">
            {experienceData.map((item, index) => (
              <TimelineItem
                key={index}
                data={item}
                index={index}
                isCompact={isCompact}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
