import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/strapi";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  // Split the "tags" string into an array (e.g. "Next.js, React" -> ["Next.js", "React"])
  const tagsList = project.tags
    ? project.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border-white/10">
      {/* Image Section - Wrapped in Link */}
      <Link
        href={`/projects/${project.slug}`}
        className="block relative w-full aspect-video overflow-hidden border-b border-white/10 cursor-pointer"
      >
        {project.image && (
          <Image
            src={project.image.url}
            alt={project.image.alternativeText || project.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </Link>

      <CardHeader className="p-6 pb-2">
        {/* Title - Wrapped in Link */}
        <Link
          href={`/projects/${project.slug}`}
          className="hover:underline decoration-primary decoration-2 underline-offset-4"
        >
          <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
        </Link>
        <div className="flex flex-wrap gap-2 mt-3">
          {tagsList.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-2 flex-grow">
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 gap-4">
        {project.demoUrl && (
          <Button asChild size="sm" className="w-full">
            <Link href={project.demoUrl} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
            </Link>
          </Button>
        )}
        {project.repoUrl && (
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={project.repoUrl} target="_blank">
              <Github className="mr-2 h-4 w-4" /> Code
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
