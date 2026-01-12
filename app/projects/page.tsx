import { fetchFromStrapi, Project } from "@/lib/strapi";
import { ProjectCard } from "@/components/sections/project-card";

export default async function ProjectsPage() {
  const projects = await fetchFromStrapi("projects?populate=*");

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          My Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of web applications, experiments, and open source work.
        </p>
      </div>

      {/* Grid */}
      {projects && projects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          No projects found. (Did you publish one in Strapi?)
        </div>
      )}
    </div>
  );
}
