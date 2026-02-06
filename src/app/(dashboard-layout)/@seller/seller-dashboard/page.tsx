import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { orderService } from "@/services/order.service";
import {
  BadgeDollarSign,
  PackageSearch,
  Truck,
  CheckCircle2,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SellerDashboard() {
  const { data: metrics } = await orderService.getOrderMetrics();

  const stats = [
    {
      label: "Total Revenue",
      value: `$${metrics.totalRevenue.toFixed(2)}`,
      description: "Lifetime earnings",
      icon: BadgeDollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Packaging",
      value: metrics.pending + metrics.processing,
      icon: Clock,
      color: "text-amber-600",
    },
    {
      label: "Out for Delivery",
      value: metrics.shipped,
      icon: Truck,
      color: "text-indigo-600",
    },
    {
      label: "Completed",
      value: metrics.delivered,
      description: "Successful sales",
      icon: CheckCircle2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with a "Live" feel */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight">Store Overview</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live store updates
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="border-none shadow-sm ring-1 ring-slate-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                {stat.label === "Total Revenue" && (
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-[10px] text-slate-400">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Insights Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200 p-6 flex items-center justify-between bg-slate-50/50">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900">
              Need to update your stock?
            </h4>
            <p className="text-sm text-slate-700">
              Keep your inventory accurate to avoid cancelled orders.
            </p>
          </div>
          <Button
            asChild
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            <Link href={"/seller-dashboard/medicines-inventory"}>
              Manage Inventory
            </Link>
          </Button>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-rose-100 p-6 bg-rose-50/30">
          <div className="flex items-center gap-3 text-rose-600 mb-2">
            <PackageSearch className="h-5 w-5" />
            <h4 className="font-bold">Cancelled Sales</h4>
          </div>
          <p className="text-2xl font-black text-rose-700">
            {metrics.cancelled}
          </p>
          <p className="text-[10px] text-rose-500 mt-1 uppercase font-bold tracking-tighter">
            Lost Opportunities
          </p>
        </Card>
      </div>
    </div>
  );
}
