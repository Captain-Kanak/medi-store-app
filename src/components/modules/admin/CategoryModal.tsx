"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Loader2, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addCategory, updateCategory } from "@/actions/category.action";
import { useRouter } from "next/navigation";

export function CategoryModal({ category }: { category?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const isEdit = !!category;
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: category?.name || "",
        description: category?.description || "",
      });
    }
  }, [isOpen, category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return toast.error("Category name is required");
    }

    const toastId = toast.loading(isEdit ? "Updating..." : "Creating...");
    setIsLoading(true);

    try {
      const res = isEdit
        ? await updateCategory(category.id, formData.name, formData.description)
        : await addCategory(formData.name, formData.description);

      if (res.success) {
        toast.success(`Category ${isEdit ? "updated" : "created"}!`, {
          id: toastId,
        });
        setIsOpen(false);
      } else {
        throw new Error("Operation failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            <Pencil size={16} />
          </Button>
        ) : (
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold gap-2 cursor-pointer text-white shadow-lg shadow-blue-500/20 transition-all">
            <Plus size={18} /> New Category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="rounded-3xl dark:bg-slate-900 border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            Categorize medicines for easier browsing on the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Category Name
            </Label>
            <Input
              required
              placeholder="e.g. Antibiotics"
              className="rounded-xl bg-slate-100 dark:bg-slate-800 border-none h-11 focus-visible:ring-blue-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
              Description
            </Label>
            <Textarea
              placeholder="Describe what medicines belong here..."
              className="rounded-xl bg-slate-100 dark:bg-slate-800 border-none min-h-25 focus-visible:ring-blue-500"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !formData.name.trim()}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 h-11 font-bold text-white transition-all shadow-lg shadow-blue-500/20 mt-2 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Category"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
