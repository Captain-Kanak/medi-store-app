import { getCategories } from "@/actions/category.action";
import AddMedicineForm from "@/components/modules/seller/AddMedicineForm";

export default async function SellerAddMedicinePage() {
  const { data: categories } = await getCategories();

  return (
    <div>
      <div className="mb-6 text-gray-500">
        <h1 className="text-2xl font-bold mb-1">Add Medicine to Inventory</h1>
        <p className="text-sm">
          This is the seller's add medicine page. You can add new medicines to
          your inventory here.
        </p>
      </div>

      <AddMedicineForm categories={categories} />
    </div>
  );
}
