import { MedicineList } from "@/components/modules/medicines/MedicineList";
import { medicineService } from "@/services/medicine.service";

export const dynamic = "force-dynamic";

export default async function MedicinesPage() {
  const { data: medicines } = await medicineService.getMedicines();

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold mb-8">Available Medicines</h2>

      <MedicineList initialMedicines={medicines} />
    </div>
  );
}
