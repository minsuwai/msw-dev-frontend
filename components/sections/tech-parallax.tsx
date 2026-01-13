"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Settings,
  Terminal,
  Zap,
  Cpu,
  Cloud,
  Shield,
  Smartphone,
} from "lucide-react";

const techStack = [
  { name: "Next.js", icon: Globe, color: "text-white" },
  { name: "React", icon: Code2, color: "text-blue-400" },
  { name: "TypeScript", icon: Terminal, color: "text-blue-600" },
  { name: "Tailwind", icon: Layout, color: "text-cyan-400" },
  { name: "Strapi", icon: Database, color: "text-purple-500" },
  { name: "Node.js", icon: Server, color: "text-green-500" },
  { name: "PostgreSQL", icon: Database, color: "text-blue-300" },
  { name: "Framer", icon: Zap, color: "text-pink-500" },
  { name: "Docker", icon: Settings, color: "text-blue-500" },
  { name: "AWS", icon: Cloud, color: "text-yellow-500" },
  { name: "GraphQL", icon: Cpu, color: "text-pink-400" },
  { name: "Security", icon: Shield, color: "text-green-400" },
  { name: "Mobile", icon: Smartphone, color: "text-indigo-400" },
];

interface ParallaxProps {
  baseVelocity: number;
}

function ParallaxText({ baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Calculate movement based on time and scroll speed
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  useAnimationFrame((t, delta) => {
    // 1. If Hovered, stop movement (velocity = 0)
    if (isHovered) return;

    // 2. Otherwise calculate natural movement
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // 3. Add Scroll Velocity (Parallax Effect)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="overflow-hidden m-0 flex flex-nowrap whitespace-nowrap"
      onMouseEnter={() => setIsHovered(true)} // Pause on Enter
      onMouseLeave={() => setIsHovered(false)} // Resume on Leave
    >
      <motion.div
        className="flex flex-nowrap gap-12 md:gap-24 pl-4"
        style={{ x }}
      >
        {/* Render list 4 times for infinite loop */}
        {[...techStack, ...techStack, ...techStack, ...techStack].map(
          (tech, index) => (
            <div
              key={index}
              className="group flex flex-row items-center gap-4 cursor-pointer transition-opacity duration-300 hover:opacity-100 opacity-70"
            >
              {/* Clean Icon (No Box) */}
              <div
                className={`transition-transform duration-300 group-hover:scale-125 ${tech.color}`}
              >
                <tech.icon size={48} strokeWidth={1.5} />
              </div>

              {/* Text (Hidden by default, shows on hover or keep visible if you prefer) */}
              <span className="font-bold text-2xl tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
}

export function TechParallax() {
  return (
    <section className="py-24 overflow-hidden relative z-10 bg-background/50 border-y border-white/5">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-sm font-bold text-primary tracking-[0.2em] uppercase mb-3">
          Technologies
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
          Tools of the Trade
        </h3>
      </div>

      <div className="w-full relative">
        {/* Pass negative velocity to move Right to Left */}
        <ParallaxText baseVelocity={-0.6} />

        {/* Clean Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
}
