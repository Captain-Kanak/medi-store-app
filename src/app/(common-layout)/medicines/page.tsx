import { MedicineList } from "@/components/modules/medicines/MedicineList";
import {
  GetMedicinesParams,
  medicineService,
} from "@/services/medicine.service";
import { Button } from "@/components/ui/button";
import { CategoryApiResponse } from "@/services/category.service";
import Link from "next/link";
import { MedicinePagination } from "@/components/modules/medicines/MedicinePagination";
import { ApiResponse, Category, Medicine } from "@/types";
import { MedicineSearch } from "@/components/modules/medicines/MedicineSearch";
import { MedicineSort } from "@/components/modules/medicines/MedicineSort";
import MedicineSidebar from "@/components/modules/medicines/MedicineSidebar";
import { getCategories } from "@/actions/category.action";

export const dynamic = "force-dynamic";

export default async function MedicinesPage({
  searchParams,
}: {
  searchParams: Promise<GetMedicinesParams & { categoryId?: string }>;
}) {
  const params = await searchParams;

  const currentPage = params.page || 1;
  const currentCategoryId = params.categoryId || "";
  const searchTerm = params.search || "";

  const { data: categories, error } =
    (await getCategories()) as CategoryApiResponse<Category[] | null>;

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error.message}</div>;
  }

  const medicinesResponse = (await medicineService.getMedicines({
    search: searchTerm,
    page: currentPage,
    limit: 12,
    sortBy: params.sortBy || "createdAt",
    sortOrder: params.sortOrder || "desc",
    categoryId: currentCategoryId,
  })) as ApiResponse<Medicine[] | null>;

  const { pagination } = medicinesResponse;
  const medicines = (medicinesResponse.data as Medicine[]) || null;

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
        <MedicineSidebar
          categories={categories}
          currentCategoryId={currentCategoryId}
        />

        {/* Results Area */}
        <div className="flex-1 space-y-12">
          {medicines?.length > 0 ? (
            <>
              <MedicineList initialMedicines={medicines} />
              <MedicinePagination pagination={pagination} />
            </>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-500 font-medium">
                No medicines found for the search result.
              </p>
              <Button variant="outline" asChild className="cursor-pointer">
                <Link href="/medicines">Clear all filters</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
