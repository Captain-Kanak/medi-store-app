"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CartItemRow({ item }: { item: any }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 min-w-20 overflow-hidden rounded-2xl border bg-slate-50">
        <Image
          src={item.image || "/placeholder-medicine.png"}
          alt={item.name}
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-1 flex-col self-start">
        <span className="line-clamp-1 text-sm font-bold text-slate-900">
          {item.name}
        </span>
        <span className="text-xs text-slate-500">
          Unit Price: ${item.price}
        </span>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center rounded-lg border bg-white shadow-sm">
            <Button
              onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 hover:text-blue-600 disabled:opacity-30"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center text-xs font-bold">
              {item.quantity}
            </span>
            <Button
              onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
              className="p-1 hover:text-blue-600"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            onClick={() => removeItem(item.medicineId)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-right">
        <span className="text-sm font-black text-blue-600">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
