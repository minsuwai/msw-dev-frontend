import { fetchFromStrapi, fetchProjectBySlug, Project } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// 1. Generate Static Paths (for Vercel deployment)
export async function generateStaticParams() {
  const projects = await fetchFromStrapi("projects");
  if (!projects) return [];
  return projects.map((project: Project) => ({ slug: project.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project: Project = await fetchProjectBySlug(slug);

  if (!project) notFound();

  const tagsList = project.tags
    ? project.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <article className="container mx-auto py-12 max-w-4xl px-4 animate-in fade-in duration-500">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>

      {/* Header Section */}
      <div className="space-y-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {project.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tagsList.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {project.demoUrl && (
            <Button asChild>
              <Link href={project.demoUrl} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
              </Link>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="outline">
              <Link href={project.repoUrl} target="_blank">
                <Github className="mr-2 h-4 w-4" /> View Code
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Hero Image */}
      {project.image && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-12">
          <Image
            src={project.image.url}
            alt={project.image.alternativeText || project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Case Study Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <BlocksRenderer content={project.content} />
      </div>
    </article>
  );
}
