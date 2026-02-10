import { medicineService } from "@/services/medicine.service";
import Link from "next/link";
import { MedicineCard } from "../medicines/MedicineCard";

export async function FeaturedMedicines() {
  const { data: medicines } = await medicineService.getMedicines({ limit: 4 });

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Top Selling Medicines
          </h2>
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
