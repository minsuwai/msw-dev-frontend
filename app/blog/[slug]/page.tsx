import { fetchPostBySlug, fetchFromStrapi, Post } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.cover?.url || "/opengraph-image.png", // Use post cover or fallback to site OG
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchFromStrapi("posts");
  if (!posts) return [];
  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post: any = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Format Date
  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className="container mx-auto py-12 md:py-20 px-4 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Navigation */}
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="-ml-4 text-muted-foreground hover:text-foreground"
        >
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <header className="mb-10 space-y-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {date}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" /> Min Su Wai
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}
      </header>

      {/* Featured Image */}
      {post.cover && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl mb-12 border border-white/10">
          <Image
            src={post.cover.url}
            alt={post.cover.alternativeText || post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Main Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:shadow-lg"
      >
        <BlocksRenderer content={post.content} />
      </div>
    </article>
  );
}
