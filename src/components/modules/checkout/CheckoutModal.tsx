"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { placeOrder } from "@/actions/order.action";

export function CheckoutModal({ children }: { children: React.ReactNode }) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const total = getTotalPrice();

  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const payload = {
        shippingAddress: formData.get("address") as string,
        phone: formData.get("phone") as string,
        paymentMethod: "Cash on Delivery",
        items: items.map((item) => ({
          quantity: item.quantity,
          medicineId: item.medicineId,
        })),
      };

      const { data, error } = await placeOrder(payload);

      if (error) {
        toast.error("Something went wrong");
        return;
      }

      toast.success("Order placed successfully!");
      clearCart();
      setOpen(false);
      router.push("/customer-dashboard/orders");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl border-none sm:max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 bg-slate-50 dark:bg-slate-900 border-b">
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <ShoppingBag className="text-blue-600" /> Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Information Form */}
          <form
            id="checkout-form"
            onSubmit={handlePlaceOrder}
            className="space-y-5"
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">
              Shipping Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="123 Pharma St, City"
                  required
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+880..."
                  required
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
              <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mb-1">
                Payment Method
              </p>
              <p className="text-sm font-black text-slate-900 dark:text-white">
                Cash on Delivery
              </p>
            </div>
          </form>

          {/* RIGHT: Order Summary */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-4">
              Summary
            </h3>
            <div className="space-y-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.medicineId}
                  className="flex justify-between text-sm"
                >
                  <span className="text-slate-600 dark:text-slate-400 line-clamp-1">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-emerald-600 uppercase text-[10px] tracking-tighter">
                <span>Shipping</span>
                <span>Calculated at door</span>
              </div>
              <div className="flex justify-between text-xl font-black text-blue-600 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Truck className="h-3 w-3" /> Same day delivery available
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="h-3 w-3" /> Official Pharmacy Invoice
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t flex gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="rounded-xl h-12 flex-1 font-bold cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="checkout-form"
            disabled={loading}
            className="rounded-xl h-12 flex-2 bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Confirm Order"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
