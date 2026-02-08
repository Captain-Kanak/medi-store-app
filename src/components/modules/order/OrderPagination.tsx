"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function OrderPagination({ totalPages, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-6">
      {/* Previous Button */}
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-xl font-bold transition-all border-2 cursor-pointer shadow-sm",
          currentPage <= 1
            ? "opacity-50 cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-800"
            : "border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95",
        )}
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2 mx-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            onClick={() => handlePageChange(page)}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-xl font-black transition-all cursor-pointer",
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700"
                : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 hover:text-blue-600",
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-xl font-bold transition-all border-2 cursor-pointer shadow-sm",
          currentPage >= totalPages
            ? "opacity-50 cursor-not-allowed border-slate-200 text-slate-400 dark:border-slate-800"
            : "border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95",
        )}
      >
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
