import { MedicineList } from "@/components/modules/medicines/MedicineList";
import { medicineService } from "@/services/medicine.service";

export const dynamic = "force-dynamic";

export default async function MedicinesPage() {
  const { data: medicines } = await medicineService.getMedicines(
    {
      search: "",
      page: 1,
      limit: 10,
      price: 0,
      sortBy: "createdAt",
      sortOrder: "desc",
      categoryId: "0eb69056-966b-4148-8db8-8832105fd4f5",
    },
    { cache: "no-store" },
  );

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold mb-8">Available Medicines</h2>

      <MedicineList initialMedicines={medicines} />
    </div>
  );
}
