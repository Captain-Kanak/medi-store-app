import { medicineService } from "@/services/medicine.service";
import Link from "next/link";
import { MedicineCard } from "../medicines/MedicineCard";

export async function FeaturedMedicines() {
  const { data: medicines } = await medicineService.getMedicines({ limit: 8 });

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Featured Medicines
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Find the right healthcare products across specialized departments.
            </p>
          </div>
          <Link
            href="/medicines"
            className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
          >
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines?.map((medicine: any) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      </div>
    </section>
  );
}
