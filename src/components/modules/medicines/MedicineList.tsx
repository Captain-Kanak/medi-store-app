"use client";

import { Medicine } from "@/types";
import { MedicineCard } from "./MedicineCard";

export function MedicineList({
  initialMedicines,
}: {
  initialMedicines: Medicine[] | null;
}) {
  const handleAddToCart = (medicine: Medicine) => {
    console.log("Added to cart:", medicine.name);
    // You can add your LocalStorage or Context logic here later
    alert(`${medicine.name} added to cart!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {initialMedicines?.map((item) => (
        <MedicineCard
          key={item.id}
          medicine={item}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
