import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { TechParallax } from "@/components/sections/tech-parallax";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Parallax } from "@/components/animate-ui/parallax";
import { FadeIn } from "@/components/motion-wrapper";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { ExperienceHeader } from "@/components/sections/experience-header";

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden">
      <section className="relative mb-24">
        <Parallax offset={-60}>
          <Hero />
        </Parallax>
      </section>

      <div className="mb-24">
        <TechParallax />
      </div>

      {/* FEATURED PROJECTS */}
      <section className="container mx-auto px-4 z-20 relative bg-background/50 backdrop-blur-sm rounded-3xl py-8 mb-0">
        <FadeIn>
          <FeaturedProjects />
        </FadeIn>
      </section>

      {/* 1. THE ZOOM HEADER (Bridge) */}
      <ExperienceHeader />

      {/* 2. THE TIMELINE (Pulled Up) */}
      {/* We add -mt-24 so the timeline starts sliding in WHILE the header is zooming out */}
      <section className="container mx-auto px-0 sm:px-4 z-20 relative bg-background/50 backdrop-blur-sm rounded-3xl pb-8 -mt-24">
        <FadeIn>
          <ExperienceTimeline />
        </FadeIn>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 md:py-32 relative z-0">
        <Parallax offset={100}>
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-extrabold max-w-2xl mx-auto tracking-tighter">
              Ready to build the <br />
              <span className="text-primary">next big thing?</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              I'm currently available for freelance work. Let's discuss your
              project.
            </p>

            <div className="flex gap-4 justify-center pt-4">
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-primary/25 transition-all"
              >
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </div>
        </Parallax>
      </section>
    </div>
  );
}
