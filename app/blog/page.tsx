// app/blog/page.tsx

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { ViewCounter } from "@/components/blog/view-counter";
import { CategoryFilter } from "@/components/blog/category-filter";
import { PaginationControl } from "@/components/blog/pagination-control"; // Import New Component
// NOTE: Make sure to import the NEW fetch function we created in Step 1
import { fetchFromStrapi, fetchFromStrapiWithMeta } from "@/lib/strapi";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BlogPage({ searchParams }: Props) {
  // 1. Await search params
  const { category, page } = await searchParams;

  // 2. Calculate Pagination
  const currentPage = Number(page) || 1;
  const pageSize = 6; // Posts per page

  // 3. Build Query
  // Note: We added pagination[page] and pagination[pageSize]
  const filterQuery = category
    ? `posts?populate=*&filters[category][slug][$eq]=${category}&sort=publishedAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`
    : `posts?populate=*&sort=publishedAt:desc&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;

  // 4. Fetch Data (Using Promise.all for speed)
  // We use fetchFromStrapiWithMeta for posts to get the page count
  const [postsResponse, categoriesData] = await Promise.all([
    fetchFromStrapiWithMeta(filterQuery),
    fetchFromStrapi("categories?sort=name:asc"),
  ]);

  const posts = postsResponse.data;
  const pagination = postsResponse.meta?.pagination; // Get pagination info
  const categories = categoriesData;

  // Helper Functions
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recent";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadTime = (text: string) => {
    const words = text?.split(" ").length || 0;
    const minutes = Math.ceil(words / 50);
    return `${minutes} min read`;
  };

  return (
    <div className="container mx-auto py-12 md:py-24 space-y-12 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Writing & <span className="text-primary">Thoughts</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Deep dives into modern web development, system architecture, and the
          lessons learned along the way.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto sticky top-20 z-30 ">
        <CategoryFilter categories={categories || []} />
      </div>

      {/* Content Grid */}
      {!posts || posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-3xl bg-white/5">
          <p className="text-muted-foreground text-lg">
            {category
              ? `No posts found in "${category}"`
              : "No posts found yet."}
          </p>
          <Button variant="link" asChild className="mt-2">
            <Link href="/blog">Clear filters</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Card
                key={post.id}
                className="group flex flex-col h-full overflow-hidden border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
              >
                {/* Image */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative h-56 w-full overflow-hidden block"
                >
                  {post.cover ? (
                    <>
                      <Image
                        src={post.cover.url}
                        alt={post.cover.alternativeText || post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted/20 flex items-center justify-center text-muted-foreground border-b border-white/5">
                      No Cover
                    </div>
                  )}

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg">
                      {post.category?.name || "Uncategorized"}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/80 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    <ViewCounter
                      slug={post.slug}
                      initialViews={post.views || 0}
                    />
                  </div>

                  <Link href={`/blog/${post.slug}`} className="mb-3 block">
                    <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <CardContent className="p-0 flex-grow">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>

                  <CardFooter className="p-0 pt-6 mt-auto flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{getReadTime(post.description)}</span>
                    </div>

                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold text-foreground group-hover:text-primary transition-colors"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>
                        Read Article{" "}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>

          {/* 5. ADD PAGINATION CONTROL */}
          <PaginationControl
            pageCount={pagination?.pageCount || 1}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
}
