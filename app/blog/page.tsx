import { fetchFromStrapi, Post } from "@/lib/strapi";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export default async function BlogPage() {
  const posts = await fetchFromStrapi("posts?populate=*");

  // Helper to format date
  const formatDate = (dateString: string) => {
    // Strapi provides 'publishedAt' or 'createdAt' usually.
    // If you don't have a date field, this will fallback gracefully.
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-12 md:py-24 space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Writing & Thoughts
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights on web development, design patterns, and my learning journey.
        </p>
      </div>

      {/* Blog Grid */}
      {!posts || posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-card/50 rounded-xl border border-dashed border-muted">
          No posts found. (Check if Strapi is running)
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any, index: number) => (
            <Card
              key={post.id}
              className="flex flex-col h-full overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Link */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative h-48 w-full overflow-hidden block"
              >
                {post.cover ? (
                  <Image
                    src={post.cover.url}
                    alt={post.cover.alternativeText || post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </Link>

              <CardHeader className="p-6 pb-2 space-y-2">
                <div className="flex items-center text-xs text-muted-foreground gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  <h2 className="text-xl font-bold leading-tight line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
              </CardHeader>

              <CardContent className="p-6 pt-2 flex-grow">
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
                  {post.description}
                </p>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-primary"
                  asChild
                >
                  <Link href={`/blog/${post.slug}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
