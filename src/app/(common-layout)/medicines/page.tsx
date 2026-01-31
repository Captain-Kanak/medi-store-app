import { medicineService } from "@/services/medicine.service";
import { MedicineList } from "@/components/MedicineList";

export default async function MedicinesPage() {
  const medicines = await medicineService.getMedicines();

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold mb-8">Available Medicines</h2>

      <MedicineList initialMedicines={medicines} />
    </div>
  );
}
