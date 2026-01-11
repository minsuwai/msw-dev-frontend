import { fetchFromStrapi, Post } from "@/lib/strapi"; // The '@' symbol automatically points to your root folder
import Link from "next/link";
import Image from "next/image";

export default async function BlogPage() {
  // 1. Fetch the data
  const posts = await fetchFromStrapi("posts?populate=*");

  // 2. Safety check: If Strapi is off or empty
  if (!posts) {
    return <div className="p-10">Failed to load posts. Is Strapi running?</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">Latest Projects</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Image Section */}
            {post.cover && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.cover.url}
                  alt={post.cover.alternativeText || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Text Section */}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Read Details &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
