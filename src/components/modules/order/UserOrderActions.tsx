"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { XCircle, Loader2, AlertCircle } from "lucide-react";
import { OrderStatus } from "@/types";
import { updateOrderStatus } from "@/actions/order.action";
import Swal from "sweetalert2";

export function UserOrderActions({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const isCancellable = currentStatus === OrderStatus.PENDING;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-200";
      case "PROCESSING":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "CANCELLED":
        return "bg-rose-500/10 text-rose-600 border-rose-200";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-200";
    }
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "Restore stock and cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      setCurrentStatus(OrderStatus.CANCELLED);

      startTransition(async () => {
        try {
          const { data } = await updateOrderStatus(
            orderId,
            OrderStatus.CANCELLED,
          );
          if (data?.success) {
            toast.success("Order cancelled");
          } else {
            setCurrentStatus(initialStatus);
            toast.error(data?.message || "Failed to cancel");
          }
        } catch (error) {
          setCurrentStatus(initialStatus);
          toast.error("An error occurred");
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <Badge
        variant="outline"
        className={`rounded-full px-4 py-1 font-bold transition-all duration-200 ${getStatusColor(currentStatus)}`}
      >
        {currentStatus}
      </Badge>

      <div className="flex flex-col items-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!isCancellable || isPending}
          onClick={handleCancel}
          className={`font-bold transition-all gap-2 rounded-xl ${
            isCancellable
              ? "text-rose-600 border-rose-200 cursor-pointer"
              : "text-slate-400 bg-slate-50 opacity-50"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          Cancel Order
        </Button>

        {!isCancellable && currentStatus !== "CANCELLED" && (
          <div className="flex items-center gap-1 text-[10px] text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
            <AlertCircle className="h-3 w-3" />
            Order is being processed.
          </div>
        )}
      </div>
    </div>
  );
}
