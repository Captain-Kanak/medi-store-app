"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { EditMedicineModal } from "./EditMedicineModal";
import { deleteMedicine } from "@/actions/medicine.action";
import { useRouter } from "next/navigation";

export function InventoryActions({ medicine }: { medicine: any }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${medicine.name}. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-3xl border-none shadow-2xl",
        confirmButton: "rounded-xl font-bold px-6 py-3",
        cancelButton: "rounded-xl font-bold px-6 py-3",
      },
    });

    if (result.isConfirmed) {
      try {
        const result = await deleteMedicine(medicine.id);

        if (!result.success) {
          toast.error(result.error?.message || "Failed to delete medicine");
        }

        if (result.success) {
          router.refresh();
          toast.success("Medicine deleted successfully.");
        }
      } catch (error) {
        toast.error("Failed to delete medicine");
      }
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditOpen(true)}
        className="h-9 w-9 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
      >
        <Edit size={18} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        className="h-9 w-9 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
      >
        <Trash2 size={18} />
      </Button>

      <EditMedicineModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        medicine={medicine}
      />
    </div>
  );
}
