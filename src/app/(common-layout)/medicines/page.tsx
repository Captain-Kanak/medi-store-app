import { MedicineList } from "@/components/modules/medicines/MedicineList";
import { medicineService } from "@/services/medicine.service";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function MedicinesPage() {
  const { data: medicines } = await medicineService.getMedicines({
    page: 1,
    limit: 12,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Pharmacy <span className="text-blue-600">Catalog</span>
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Showing {medicines?.length || 0} premium healthcare products
          </p>
        </div>

        <div className="flex w-full max-w-md items-center gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search medicines, brands..."
              className="pl-10 rounded-full border-slate-200 bg-white dark:bg-slate-900 focus-visible:ring-blue-500"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shrink-0"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Fancy Sidebar Placeholder */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="mb-4 flex items-center gap-2 font-bold uppercase tracking-wider text-xs text-slate-500">
                <Filter className="h-3 w-3" /> Categories
              </h3>
              <div className="space-y-2">
                {[
                  "All",
                  "Antibiotics",
                  "Diabetes",
                  "Vitamins",
                  "Baby Care",
                ].map((cat) => (
                  <button
                    key={cat}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:text-slate-300"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl shadow-blue-500/20">
              <h4 className="font-bold">Need Help?</h4>
              <p className="mt-2 text-xs text-blue-100 leading-relaxed">
                Consult with our certified pharmacists for prescription
                guidance.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4 w-full bg-white text-blue-600 hover:bg-blue-50"
              >
                Live Chat
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Grid Area */}
        <div className="flex-1">
          <MedicineList initialMedicines={medicines} />
        </div>
      </div>
    </div>
  );
}
