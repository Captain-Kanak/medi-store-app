"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Medicine } from "@/types";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function MedicineActions({ medicine }: { medicine: Medicine }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleAction = (actionType: "cart" | "order") => {
    if (!user) {
      toast.error("Authentication Required", {
        description: "Please log in to add items to your cart or place orders.",
        action: {
          label: "Login",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }

    if (actionType === "cart") {
      addItem(medicine, quantity);
      toast.success(`${medicine.name} added to cart`, {
        description: "You can view your items in the navigation bar.",
      });
    } else {
      // Logic for direct order
      toast.info("Proceeding to checkout...");
    }
  };

  const increment = () => {
    if (quantity < medicine.stock) setQuantity((prev) => prev + 1);
  };
  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-slate-500 uppercase tracking-tight">
          Select Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border dark:border-slate-800 rounded-2xl p-1 bg-slate-50 dark:bg-slate-950">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-10 w-10 cursor-pointer"
              onClick={decrement}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-bold text-lg">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl h-10 w-10 cursor-pointer"
              onClick={increment}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-xs text-slate-400">
            {medicine.stock} units in stock
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-4 space-y-3">
        <Button
          onClick={() => handleAction("cart")}
          size="lg"
          className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 rounded-2xl transition-all active:scale-[0.98] cursor-pointer"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>

        <Button
          onClick={() => handleAction("order")}
          variant="outline"
          size="lg"
          className="w-full h-14 text-lg font-bold rounded-2xl border-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-[0.98] cursor-pointer"
        >
          <Zap className="mr-2 h-5 w-5 fill-amber-500 text-amber-500" />
          Order Now
        </Button>
      </div>
    </div>
  );
}
