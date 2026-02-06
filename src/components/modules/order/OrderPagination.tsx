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
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Previous Button */}
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-xl font-bold transition-all border cursor-pointer",
          currentPage <= 1
            ? "opacity-40 cursor-not-allowed border-slate-200 text-slate-400"
            : "border-slate-300 hover:bg-slate-100 active:scale-95 text-slate-700",
        )}
      >
        <ChevronLeft className="h-4 w-4" /> Prev
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 mx-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-xl font-bold transition-all cursor-pointer",
              currentPage === page
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-slate-100",
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={cn(
          "flex items-center gap-1 px-4 py-2 rounded-xl font-bold transition-all border cursor-pointer",
          currentPage >= totalPages
            ? "opacity-40 cursor-not-allowed border-slate-200 text-slate-400"
            : "border-slate-300 hover:bg-slate-100 active:scale-95 text-slate-700",
        )}
      >
        Next <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
