"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Camera,
  Loader2,
  Pill,
  DollarSign,
  Package,
  Calendar,
  FileText,
  Tag,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import { createMedicine } from "@/actions/medicine.action";
import { Category } from "@/types";

const addMedicineSchema = z.object({
  name: z.string().min(2, "Name is required"),
  brand: z.string().min(2, "Brand is required"),
  price: z.number().min(1, "Price must be at least 1"),
  stock: z.number().int().min(1, "Stock must be at least 1"),
  description: z.string().min(10, "Provide a detailed description"),
  dosage: z.string().min(1, "Dosage info is required (e.g. 500mg)"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  categoryId: z.string().min(1, "Please select a category"),
  imageFile: z.custom<File | null>((val) => val instanceof File, {
    message: "Product image is required",
  }),
});

export default function AddMedicineForm({
  categories,
}: {
  categories: Category[] | null;
}) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      brand: "",
      price: 0,
      stock: 0,
      description: "",
      dosage: "",
      expiryDate: "",
      categoryId: "",
      imageFile: null as File | null,
    },
    validators: {
      onSubmit: addMedicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding medicine to inventory...");
      try {
        let imageUrl = "";
        if (value.imageFile) {
          imageUrl = (await uploadImageToImgBB(value.imageFile)) || "";
        }

        const payload = {
          name: value.name,
          brand: value.brand,
          price: Number(value.price),
          stock: Number(value.stock),
          description: value.description,
          dosage: value.dosage,
          expiryDate: new Date(value.expiryDate),
          categoryId: value.categoryId,
          image: imageUrl,
        };

        const { data, error } = await createMedicine(payload);

        if (error) throw new Error(error.message);

        toast.success("Medicine added successfully!", { id: toastId });
        router.push("/seller-dashboard/medicines-inventory");
        router.refresh();
      } catch (err: any) {
        toast.error(err.message || "Failed to add medicine", { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-4xl mx-auto rounded-3xl border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-black text-gray-500">
          Medicine Details
        </CardTitle>
        <CardDescription>
          Fill in the details to list your product in the marketplace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Image Upload Area */}
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50 group transition-colors hover:border-blue-200">
            <div className="relative h-32 w-32 rounded-2xl overflow-hidden bg-white shadow-sm mb-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <Camera className="h-8 w-8 text-slate-300" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
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
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Upload Product Image
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Pill size={14} /> Medicine Name
                  </Label>
                  <Input
                    className="rounded-xl bg-slate-50 border-none h-11 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Napa Extra"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />

            {/* Brand */}
            <form.Field
              name="brand"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Activity size={14} /> Brand/Manufacturer
                  </Label>
                  <Input
                    className="rounded-xl bg-slate-50 border-none h-11 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Beximco Pharma"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <form.Field
                name="price"
                children={(field) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                      <DollarSign size={14} /> Price
                    </Label>
                    <Input
                      type="number"
                      className="rounded-xl bg-slate-50 border-none h-11 focus:ring-2 focus:ring-blue-500"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              />
              <form.Field
                name="stock"
                children={(field) => (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                      <Package size={14} /> Stock
                    </Label>
                    <Input
                      type="number"
                      className="rounded-xl bg-slate-50 border-none h-11 focus:ring-2 focus:ring-blue-500"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              />
            </div>

            {/* Category Select */}
            <form.Field
              name="categoryId"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Tag size={14} /> Category
                  </Label>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger className="rounded-xl bg-slate-50 border-none h-11 cursor-pointer">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-100">
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            {/* Dosage */}
            <form.Field
              name="dosage"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Activity size={14} /> Dosage
                  </Label>
                  <Input
                    className="rounded-xl bg-slate-50 border-none h-11 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 500mg"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />

            {/* Expiry */}
            <form.Field
              name="expiryDate"
              children={(field) => (
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                    <Calendar size={14} /> Expiry Date
                  </Label>
                  <Input
                    type="date"
                    className="rounded-xl bg-slate-50 border-none h-11 focus:ring-2 focus:ring-blue-500"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            />
          </div>

          {/* Description */}
          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                  <FileText size={14} /> Description
                </Label>
                <Textarea
                  className="rounded-2xl bg-slate-50 border-none min-h-30 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter medicine details, side effects, etc."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-[0.98] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add to Inventory"
                )}
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  );
}
