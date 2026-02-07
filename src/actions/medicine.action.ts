"use server";

import {
  medicineService,
  UpdateMedicineData,
} from "@/services/medicine.service";

export const getMedicines = async () => {
  return await medicineService.getMedicines();
};

export const updateMedicine = async (id: string, data: UpdateMedicineData) => {
  return await medicineService.updateMedicineById(id, data);
};

export const deleteMedicine = async (id: string) => {
  return await medicineService.deleteMedicineById(id);
};
