import { orderService } from "@/services/order.service";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Package, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { UserOrderActions } from "@/components/modules/order/UserOrderActions";

export default async function CustomerOrdersPage() {
  const { data: orders } = await orderService.getOrders();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-4">
          <ShoppingBag className="h-12 w-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold">No orders yet</h2>
        <p className="text-slate-500 mb-6">
          Your health is important. Start shopping for your medicines.
        </p>
        <Link
          href="/medicines"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700"
        >
          Browse Medicines
        </Link>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight">My Orders</h1>
        <p className="text-slate-500">View and track your medical purchases.</p>
      </header>

      <div className="grid gap-6">
        {orders.map((order: any) => (
          <Card
            key={order.id}
            className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="p-6">
              {/* Top Row: Meta Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none mb-1">
                      Order Ref
                    </p>
                    <p className="font-bold text-lg leading-none">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:block text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                      Placed On
                    </p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{" "}
                      {format(new Date(order.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
                      Total
                    </p>
                    <p className="font-black text-blue-600 text-xl">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items Section */}
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  Ordered Items ({order.items.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800"
                    >
                      <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                        <ShoppingBag className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate">
                          {item.medicine.name}
                        </p>
                        <p className="text-[10px] font-medium text-slate-500">
                          Qty: {item.quantity} • ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action Row */}
            <div className="bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 border-t">
              <UserOrderActions
                orderId={order.id}
                initialStatus={order.status}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
