import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-24 md:py-32 text-center space-y-8 animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
      {/* Badge / Pill */}
      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
        ✨ Open for new opportunities
      </div>

      {/* Main Headlines */}
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
          Building digital products with{" "}
          <span className="text-primary">purpose</span>.
        </h1>
        <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto leading-relaxed">
          I am a Full Stack Developer specializing in Next.js, Strapi, and
          modern UI design. I turn complex problems into simple, beautiful
          interfaces.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Button asChild size="lg" className="h-12 px-8 text-base">
          <Link href="/projects">
            View My Work <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-12 px-8 text-base"
        >
          <Link href="/contact">Contact Me</Link>
        </Button>
      </div>

      {/* Social Proof / Icons */}
      <div className="flex gap-6 pt-8 text-muted-foreground">
        <Link
          href="https://github.com"
          target="_blank"
          className="hover:text-primary transition"
        >
          <Github className="h-6 w-6" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          className="hover:text-primary transition"
        >
          <Linkedin className="h-6 w-6" />
          <span className="sr-only">LinkedIn</span>
        </Link>
      </div>
    </section>
  );
}
