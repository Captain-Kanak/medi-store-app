"use client";

import { Medicine } from "@/types";
import { MedicineCard } from "./MedicineCard";

export function MedicineList({
  initialMedicines,
}: {
  initialMedicines: Medicine[] | null;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {initialMedicines?.map((medicine) => (
        <MedicineCard key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
}
