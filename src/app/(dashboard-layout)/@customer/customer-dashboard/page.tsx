import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orderService } from "@/services/order.service";
import {
  ShoppingBag,
  Wallet,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  ArrowUpRight,
  Home,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CustomerDashboard() {
  const { data: metrics, error } = await orderService.getOrderMetrics();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Orders",
      value: metrics?.totalOrders ?? 0,
      icon: ShoppingBag,
      description: "Complete order history",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Spent",
      value: `$${metrics?.totalRevenue.toFixed(2) ?? 0}`,
      icon: Wallet,
      description: "Total successful purchases",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Active Orders",
      value: `${metrics?.pending + metrics?.processing + metrics?.shipped || 0}`,
      icon: Clock,
      description: "Pending, Packing & Shipped",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Completed",
      value: metrics?.delivered ?? 0,
      icon: CheckCircle2,
      description: "Successfully delivered",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-600">
            Dashboard
          </h1>
          <p className="text-slate-500">
            Overview of your medicine purchases and activity.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="rounded-xl shadow-sm">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-xl bg-blue-600 hover:bg-blue-700 shadow-md transition-all"
          >
            <Link href="/customer-dashboard/orders">
              View All Orders <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <h2 className="text-3xl font-bold tracking-tight mt-1">
                  {stat.value}
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status Breakdown Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Order Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <StatusRow
              label="Delivered"
              count={metrics?.delivered}
              total={metrics?.totalOrders}
              color="bg-emerald-500"
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-500" />}
            />

            <StatusRow
              label="Shipped"
              count={metrics?.shipped}
              total={metrics?.totalOrders}
              color="bg-indigo-500"
            />

            <StatusRow
              label="Processing"
              count={metrics?.processing}
              total={metrics?.totalOrders}
              color="bg-blue-500"
              icon={<Truck className="h-4 w-4 text-blue-500" />}
            />

            <StatusRow
              label="Pending"
              count={metrics?.pending}
              total={metrics?.totalOrders}
              color="bg-amber-500"
              icon={<Clock className="h-4 w-4 text-amber-500" />}
            />

            <StatusRow
              label="Cancelled"
              count={metrics?.cancelled}
              total={metrics?.totalOrders}
              color="bg-rose-500"
              icon={<XCircle className="h-4 w-4 text-rose-500" />}
            />
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-600 border-none text-white overflow-hidden relative">
          <div className="absolute -right-5 -top-5 opacity-10">
            <ShoppingBag size={200} />
          </div>
          <CardContent className="p-10 flex flex-col h-full justify-center relative z-10">
            <h3 className="text-2xl font-bold mb-4">
              Your Health, Simplified.
            </h3>
            <p className="text-blue-100 mb-8 max-w-sm">
              Manage your prescriptions, track deliveries in real-time, and view
              your medical spending history all in one place.
            </p>
            <Button
              variant="secondary"
              className="w-fit font-bold rounded-xl"
              asChild
            >
              <Link href="/medicines">Order More Medicines</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper component for the Status Progress rows
function StatusRow({ label, count, total, color, icon }: any) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 font-semibold text-slate-700">
          {icon} {label}
        </div>
        <span className="text-slate-500">{count} orders</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
