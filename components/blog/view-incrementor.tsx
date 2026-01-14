"use client";

import { useEffect } from "react";

export function ViewIncrementor({ slug }: { slug: string }) {
  useEffect(() => {
    // We use sessionStorage to prevent duplicate counts
    // if the user refreshes the page in the same session.
    const hasViewed = sessionStorage.getItem(`viewed-${slug}`);

    if (!hasViewed) {
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })
        .then((res) => {
          if (res.ok) {
            sessionStorage.setItem(`viewed-${slug}`, "true");
          }
        })
        .catch((err) => console.error("Failed to count view:", err));
    }
  }, [slug]);

  return null; // This component is invisible
}
