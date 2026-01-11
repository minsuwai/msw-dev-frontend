import { fetchPostBySlug, fetchFromStrapi, Post } from "@/lib/strapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// This function tells Next.js exactly which pages to build (e.g., /blog/first-post)
export async function generateStaticParams() {
  const posts = await fetchFromStrapi("posts");

  // If Strapi is offline or empty, return empty list
  if (!posts) return [];

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

// This strange looking type helps Next.js understand the URL parameters
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  // 1. Get the slug from the URL (await is needed in Next.js 15)
  const { slug } = await params;

  // 2. Fetch the data
  const post: Post = await fetchPostBySlug(slug);

  // 3. If no post found, show 404
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto p-6 md:p-10">
      {/* Back Button */}
      <Link href="/blog" className="text-gray-500 hover:text-black mb-8 block">
        &larr; Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          {post.title}
        </h1>

        {post.cover && (
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.cover.url}
              alt={post.cover.alternativeText || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </header>

      {/* The Content Body */}
      <div className="prose prose-lg max-w-none text-gray-700">
        <BlocksRenderer content={post.content} />
      </div>
    </article>
  );
}
