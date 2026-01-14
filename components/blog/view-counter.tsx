"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// Helper to get the Strapi URL
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function ViewCounter({
  slug,
  initialViews = 0,
}: {
  slug: string;
  initialViews?: number;
}) {
  const [views, setViews] = useState<number>(initialViews);

  useEffect(() => {
    // We only fetch if we don't have a valid initial number,
    // OR if you want to poll for live updates.
    // Here we fetch immediately to ensure we have the latest number from the DB.

    async function fetchViews() {
      try {
        // Fetch only the 'views' field for this specific slug
        const res = await fetch(
          `${STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&fields[0]=views`,
          {
            // Cache control: ensure we always get new data
            cache: "no-store",
          }
        );

        const data = await res.json();

        // Strapi returns an array for filters, take the first item
        if (data?.data?.[0]?.attributes?.views) {
          setViews(data.data[0].attributes.views);
        }
      } catch (error) {
        console.error("Error fetching views:", error);
      }
    }

    fetchViews();
  }, [slug]);

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/5">
      <Eye className="h-3 w-3 text-primary" />
      {/* Format the number (e.g., 1,200) */}
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}
