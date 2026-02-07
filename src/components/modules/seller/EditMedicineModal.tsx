"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function EditMedicineModal({ isOpen, setIsOpen, medicine }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-125 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Edit Medicine
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* Implement your update form here */}
          <p className="text-sm text-slate-500">Updating: {medicine.name}</p>
          {/* Form Fields: Name, Price, Stock, etc. */}
          <Button className="w-full bg-blue-600 rounded-xl font-bold h-12 cursor-pointer">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
