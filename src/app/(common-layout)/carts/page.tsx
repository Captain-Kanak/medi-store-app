"use client";

import { useCartStore } from "@/store/useCartStore";
import { CartItemRow } from "@/components/modules/cart/CartItemRow";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, getTotalPrice, isLoading } = useCartStore();
  const totalPrice = getTotalPrice();

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center font-bold text-slate-500">
        Syncing your cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="bg-blue-50 dark:bg-slate-900 p-8 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-3xl font-black mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 max-w-sm">
          It looks like you haven&apos;t added any medicines to your cart yet.
        </p>
        <Button
          asChild
          className="rounded-2xl px-8 h-12 bg-blue-600 hover:bg-blue-700"
        >
          <Link href="/medicines">Explore Medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/medicines">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-3xl font-black tracking-tight">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Item List */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-6 rounded-3xl border-slate-200/60 dark:border-slate-800/60 shadow-sm">
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <CartItemRow key={item.medicineId} item={item} />
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Price Summary */}
        <div className="lg:col-span-4">
          <Card className="p-6 rounded-3xl border-slate-200/60 dark:border-slate-800/60 shadow-lg shadow-blue-500/5 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                <span>Shipping</span>
                <span className="text-emerald-600 font-bold uppercase text-xs">
                  Calculated at checkout
                </span>
              </div>

              <Separator className="my-2" />

              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button
              asChild
              className="w-full mt-8 h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-xl shadow-blue-500/20 group"
            >
              <Link href="/checkout">
                Go to Checkout
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-widest font-bold">
              Secure Transaction
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
