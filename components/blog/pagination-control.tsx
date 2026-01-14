"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
}

export function PaginationControl({ pageCount, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    // 1. Create a new URLSearchParams object based on current params
    const params = new URLSearchParams(searchParams.toString());

    // 2. Update the 'page' parameter
    params.set("page", newPage.toString());

    // 3. Push new URL (preserves category filters)
    router.push(`/blog?${params.toString()}`);
  };

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* PREV BUTTON */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="h-10 w-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary transition-all disabled:opacity-30"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </Button>

      {/* PAGE INDICATOR */}
      <div className="text-sm font-medium text-muted-foreground/80 font-mono tracking-widest px-4 py-2 rounded-full border border-white/5 bg-black/20">
        PAGE <span className="text-foreground">{currentPage}</span> /{" "}
        {pageCount}
      </div>

      {/* NEXT BUTTON */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pageCount}
        className="h-10 w-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-primary transition-all disabled:opacity-30"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </div>
  );
}
