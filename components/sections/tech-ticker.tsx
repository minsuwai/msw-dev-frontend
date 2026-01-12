"use client";

import { motion } from "framer-motion";

const techs = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Strapi",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Figma",
];

export function TechTicker() {
  return (
    <div className="w-full overflow-hidden py-10 border-y border-white/5 bg-white/5">
      <div className="container mx-auto px-4 mb-4 text-center text-sm text-muted-foreground uppercase tracking-widest">
        Powering Next-Gen Applications With
      </div>
      <div className="flex relative overflow-hidden">
        <motion.div
          className="flex gap-16 items-center whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20, // Adjust speed here
          }}
        >
          {/* We repeat the list twice to create a seamless loop */}
          {[...techs, ...techs].map((tech, index) => (
            <span
              key={index}
              className="text-2xl md:text-4xl font-bold text-white/20 hover:text-white/80 transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
