import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Filter } from "lucide-react";
import Link from "next/link";

export default function MedicineSidebar({
  categories,
  currentCategoryId,
}: {
  categories: Category[] | null;
  currentCategoryId: string;
}) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 space-y-8">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-slate-400">
              <Filter className="h-3 w-3" /> Filter by Category
            </h3>
            <div className="space-y-1">
              <Link
                href="/medicines"
                className={cn(
                  "block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
                  !currentCategoryId
                    ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
                )}
              >
                All Products
              </Link>
              {categories?.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/medicines?categoryId=${cat.id}`}
                  className={cn(
                    "block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
                    currentCategoryId === cat.id
                      ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
