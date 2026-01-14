"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

// Make the type flexible to handle both formats
interface Category {
  id: number;
  name?: string;
  slug?: string;
  attributes?: {
    name: string;
    slug: string;
  };
}

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleSelect = (slug: string | null) => {
    if (slug) {
      router.push(`/blog?category=${slug}`);
    } else {
      router.push("/blog");
    }
  };

  return (
    <div className="relative w-full overflow-hidden group">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mask-gradient px-1">
        {/* 'All' Button */}
        <button
          onClick={() => handleSelect(null)}
          className={cn(
            "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer",
            !currentCategory
              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:bg-white/10"
          )}
        >
          All Posts
        </button>

        {/* Category Buttons */}
        {categories.map((cat) => {
          // SAFE DATA ACCESS: Check for flattened data OR nested attributes
          const name = cat.attributes?.name || cat.name;
          const slug = cat.attributes?.slug || cat.slug;

          if (!name || !slug) return null; // Skip invalid data

          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(slug)}
              className={cn(
                "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer",
                currentCategory === slug
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                  : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:bg-white/10"
              )}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
