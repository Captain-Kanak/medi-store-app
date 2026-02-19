"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function MedicinePagination({ pagination }: { pagination: any }) {
  const searchParams = useSearchParams();
  const { totalPage, currentPage } = pagination;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  if (totalPage <= 1) return null;

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <Pagination className="justify-center md:justify-end">
      <PaginationContent className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-2xl">
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(Number(currentPage) - 1)}
            className={
              Number(currentPage) <= 1 ? "pointer-events-none opacity-40" : ""
            }
          />
        </PaginationItem>

        {pages.map((page) => {
          if (
            page === 1 ||
            page === totalPage ||
            (page >= Number(currentPage) - 1 && page <= Number(currentPage) + 1)
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={Number(currentPage) === page}
                  className={cn(
                    "rounded-xl",
                    Number(currentPage) === page &&
                      "bg-blue-600 text-white hover:bg-blue-700 hover:text-white",
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (
            page === Number(currentPage) - 2 ||
            page === Number(currentPage) + 2
          ) {
            return (
              <PaginationItem key={page}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return null;
        })}

        <PaginationItem>
          <PaginationNext
            href={createPageURL(Number(currentPage) + 1)}
            className={
              Number(currentPage) >= totalPage
                ? "pointer-events-none opacity-40"
                : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
