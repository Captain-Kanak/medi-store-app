"use client";

import { updateMedicine } from "@/actions/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Loader2,
  DollarSign,
  Package,
  Calendar,
  AlignLeft,
  Camera,
} from "lucide-react";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import { useState } from "react";

const medicineUpdateSchema = z.object({
  price: z.preprocess((val) => Number(val), z.number().min(0)),
  stock: z.preprocess((val) => Number(val), z.number().min(0)),
  description: z.string(),
  imageFile: z.custom<File | null>(),
  expiryDate: z.string(),
});

export function EditMedicineModal({ isOpen, setIsOpen, medicine }: any) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(
    medicine?.image || null,
  );

  const form = useForm({
    defaultValues: {
      price: medicine?.price,
      stock: medicine?.stock,
      description: medicine?.description,
      expiryDate: medicine?.expiryDate
        ? new Date(medicine.expiryDate).toISOString().split("T")[0]
        : "",
      imageFile: null as File | null,
    },
    validators: {
      onSubmit: medicineUpdateSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating medicine...");
      try {
        let imageUrl = medicine.image;

        if (value.imageFile) {
          const uploadedUrl = await uploadImageToImgBB(value.imageFile);
          if (uploadedUrl) imageUrl = uploadedUrl;
        }

        const payload: any = {
          image: imageUrl,
        };
        if (value.price !== undefined) payload.price = Number(value.price);
        if (value.stock !== undefined) payload.stock = Number(value.stock);
        if (value.description) payload.description = value.description;
        if (value.expiryDate) payload.expiryDate = new Date(value.expiryDate);

        const { data, error } = await updateMedicine(medicine.id, payload);

        if (error) {
          toast.error(error.message || "Update failed", { id: toastId });
          return;
        }

        toast.success("Medicine updated successfully", { id: toastId });
        setIsOpen(false);
        router.refresh();
      } catch (err) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-125 rounded-3xl border-none shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            Edit <span className="text-blue-600">{medicine.name}</span>
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-5 py-4"
        >
          {/* Image Upload Section */}
          <div className="flex flex-col items-center gap-3 mb-4">
            <div className="relative group h-24 w-24 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50">
              {preview ? (
                <img
                  src={preview}
                  alt="Old preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Camera className="text-slate-300" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-[10px] text-white font-bold">CHANGE</p>
              </div>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    form.setFieldValue("imageFile", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
            <Label className="text-[10px] font-bold text-slate-400 uppercase">
              Product Image
            </Label>
          </div>

          <form.Field
            name="price"
            children={(field) => (
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                  Price ($)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="number"
                    step="0.01"
                    className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="stock"
              children={(field) => (
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                    Stock
                  </Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="number"
                      className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                </div>
              )}
            />

            <form.Field
              name="expiryDate"
              children={(field) => (
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                    Expiry
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="date"
                      className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                </div>
              )}
            />
          </div>

          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                  Description
                </Label>
                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Textarea
                    className="pl-10 min-h-25 bg-slate-50 border-slate-200 rounded-xl focus:ring-blue-500"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold h-12 shadow-lg shadow-blue-100 transition-all active:scale-95 cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
