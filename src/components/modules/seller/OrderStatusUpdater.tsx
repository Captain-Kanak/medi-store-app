"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/order.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_CONFIG = {
  PENDING: { color: "text-amber-600 bg-amber-50", label: "PENDING" },
  PROCESSING: { color: "text-blue-600 bg-blue-50", label: "PROCESSING" },
  SHIPPED: { color: "text-purple-600 bg-purple-50", label: "SHIPPED" },
  DELIVERED: { color: "text-emerald-600 bg-emerald-50", label: "DELIVERED" },
};

export function OrderStatusUpdater({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleUpdate = async (newStatus: string) => {
    if (newStatus === currentStatus) return;

    setIsPending(true);
    const toastId = toast.loading(`Updating order to ${newStatus}...`);

    try {
      const result = await updateOrderStatus(orderId, newStatus);

      if (result) {
        toast.success("Status updated", {
          id: toastId,
          icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
        });
        router.refresh();
      } else {
        toast.error("Failed to update status", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {isPending && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
      <Select
        defaultValue={currentStatus}
        onValueChange={handleUpdate}
        disabled={isPending}
      >
        <SelectTrigger className="w-35 h-9 rounded-xl border-slate-200 bg-white font-bold text-xs shadow-sm transition-all hover:border-blue-300 cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
          {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
            <SelectItem
              key={key}
              value={key}
              className="text-xs font-semibold py-2"
            >
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
