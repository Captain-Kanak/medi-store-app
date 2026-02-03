"use client";

import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartBadge() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link
      href="/carts"
      className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors flex items-center justify-center"
    >
      <ShoppingCart className="h-6 w-6 text-slate-700 dark:text-slate-300" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full border-2 border-white dark:border-slate-950">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
