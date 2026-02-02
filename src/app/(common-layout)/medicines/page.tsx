import { MedicineList } from "@/components/modules/medicines/MedicineList";
import {
  GetMedicinesParams,
  medicineService,
} from "@/services/medicine.service";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryService } from "@/services/category.service";
import Link from "next/link";
import { MedicinePagination } from "@/components/modules/medicines/MedicinePagination";
import { cn } from "@/lib/utils";
import { ApiResponse, Medicine } from "@/types";
import { MedicineSearch } from "@/components/modules/medicines/MedicineSearch";
import { MedicineSort } from "@/components/modules/medicines/MedicineSort";

export const dynamic = "force-dynamic";

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<GetMedicinesParams & { category?: string }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const currentCategoryName = params.category || "";
  const searchTerm = params.search || "";

  const categoriesData = await categoryService.getCategories();
  const categories = categoriesData || [];

  const selectedCategory = categories.find(
    (c: any) => c.name.toLowerCase() === currentCategoryName.toLowerCase(),
  );

  const medicinesResponse = await medicineService.getMedicines({
    page: currentPage,
    limit: 12,
    categoryId: selectedCategory?.id,
    search: searchTerm,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
  });

  const { data, pagination } = medicinesResponse as ApiResponse<
    Medicine[] | null
  >;
  const medicines = data ?? [];

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pharmacy <span className="text-blue-600">Catalog</span>
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium">
            Showing{" "}
            {(pagination?.total ?? 0) > 0 ? (pagination?.offset ?? 0) + 1 : 0}-
            {Math.min(
              (pagination?.offset ?? 0) + (pagination?.limit ?? 0),
              pagination?.total ?? 0,
            )}{" "}
            of {pagination?.total ?? 0} health products
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex w-full max-w-md items-center gap-2">
          <MedicineSearch />
          <MedicineSort />
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar */}
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
                    !currentCategoryName
                      ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 dark:shadow-none"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400",
                  )}
                >
                  All Products
                </Link>
                {categories.map((cat: any) => (
                  <Link
                    key={cat.id}
                    href={`/medicines?category=${cat.name.toLowerCase()}`}
                    className={cn(
                      "block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
                      currentCategoryName === cat.name.toLowerCase()
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

        {/* Results Area */}
        <div className="flex-1 space-y-12">
          {medicines?.length > 0 ? (
            <>
              <MedicineList initialMedicines={medicines} />
              <MedicinePagination pagination={pagination} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-500 font-medium">
                No medicines found in this category.
              </p>
              <Button variant="link" asChild>
                <Link href="/medicines">Clear all filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
