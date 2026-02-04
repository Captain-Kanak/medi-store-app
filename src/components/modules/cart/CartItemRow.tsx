"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CartItemRow({ item }: { item: any }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="group relative flex flex-col sm:flex-row items-center gap-4 p-4 rounded-3xl transition-all duration-300 hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800/60">
      {/* --- Image Wrapper --- */}
      <div className="relative h-24 w-24 min-w-24 overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950 p-2 shadow-sm transition-transform group-hover:scale-105">
        <Image
          src={item.image || "/placeholder-medicine.png"}
          alt={item.name}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* --- Info Section --- */}
      <div className="flex flex-1 flex-col w-full">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Unit:{" "}
              <span className="text-blue-600 dark:text-blue-400">
                ${item.price.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Total for this item (Desktop View) */}
          <div className="hidden sm:block text-right">
            <p className="text-lg font-black text-blue-600 dark:text-blue-400">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* --- Controls Section --- */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 p-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-inner">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-20 transition-all cursor-pointer"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-10 text-center text-sm font-black text-slate-700 dark:text-slate-300">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
              className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4">
            {/* Total for this item (Mobile View) */}
            <p className="sm:hidden text-lg font-black text-blue-600 dark:text-blue-400">
              ${(item.price * item.quantity).toFixed(2)}
            </p>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(item.medicineId)}
              className="h-9 w-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
