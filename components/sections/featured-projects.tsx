import { fetchFromStrapi, Project } from "@/lib/strapi";
import { ProjectCard } from "@/components/sections/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion-wrapper";

export async function FeaturedProjects() {
  // Fetch only 2 projects
  const projects = await fetchFromStrapi(
    "projects?pagination[limit]=2&populate=*"
  );

  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 space-y-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
              <p className="text-muted-foreground text-lg">
                Selected projects that define my style.
              </p>
            </div>
            <Button variant="ghost" asChild className="group">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project: Project, index: number) => (
            <FadeIn key={project.id} delay={index * 0.2}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
