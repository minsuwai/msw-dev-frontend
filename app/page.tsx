import { Hero } from "@/components/sections/hero";
import { TechTicker } from "@/components/sections/tech-ticker";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { FadeIn } from "@/components/motion-wrapper";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section (Already has its own animation, but we can wrap it if we want) */}
      <FadeIn>
        <Hero />
      </FadeIn>

      {/* 2. Infinite Tech Scroll */}
      <FadeIn delay={0.2}>
        <TechTicker />
      </FadeIn>

      {/* 3. Featured Projects (Fetching from Strapi) */}
      <FeaturedProjects />

      {/* 4. CTA / Final Section */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="container mx-auto px-4 text-center space-y-8">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-bold max-w-2xl mx-auto">
              Ready to bring your next idea to life?
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              I'm currently available for freelance work and open to new
              opportunities.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild className="h-12 px-8 text-lg">
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
