import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Mail } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/motion-wrapper";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 space-y-20 overflow-x-hidden">
      {/* SECTION 1: HERO & BIO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="order-first md:order-last flex justify-center">
          <FadeIn
            direction="left"
            delay={0.2}
            className="w-full flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/profile.png" // Make sure this image exists in public/images folder
                alt="Profile photo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <FadeIn direction="right" delay={0.4}>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              About Me
            </h1>
          </FadeIn>

          <FadeIn direction="right" delay={0.6}>
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Hello! I'm a passionate developer who loves bridging the gap
                between backend logic and frontend design.
              </p>
              <p>
                I started my journey building WordPress sites, but I quickly
                fell in love with the modern JavaScript ecosystem. Now, I build
                scalable applications using{" "}
                <span className="text-primary font-medium">Next.js</span>,{" "}
                <span className="text-primary font-medium">TypeScript</span>,
                and <span className="text-primary font-medium">Strapi</span>.
              </p>
              <p>
                When I'm not coding, I'm learning new technologies or optimizing
                performance for web applications.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  <Mail className="mr-2 h-4 w-4" /> Get in Touch
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/resume.pdf" target="_blank" prefetch={false}>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 2: TECH STACK */}
      {/* We removed the outer FadeIn wrapper here so we can animate children individually */}
      <section className="space-y-8">
        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Tech Stack
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend Card - Delay 0.2 */}
          <FadeIn direction="up" delay={0.2} className="h-full">
            <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <span className="text-xl">🎨</span>
                  </div>
                  <h3 className="font-semibold text-xl">Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Shadcn/ui",
                    "Framer Motion",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Backend Card - Delay 0.4 */}
          <FadeIn direction="up" delay={0.4} className="h-full">
            <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <span className="text-xl">⚙️</span>
                  </div>
                  <h3 className="font-semibold text-xl">Backend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Node.js",
                    "Strapi (CMS)",
                    "PostgreSQL",
                    "REST APIs",
                    "GraphQL",
                    "Auth",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Tools Card - Delay 0.6 */}
          <FadeIn direction="up" delay={0.6} className="h-full">
            <Card className="h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <span className="text-xl">🛠️</span>
                  </div>
                  <h3 className="font-semibold text-xl">Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Git/GitHub",
                    "VS Code",
                    "Vercel",
                    "Cloudinary",
                    "Figma",
                    "Postman",
                  ].map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
