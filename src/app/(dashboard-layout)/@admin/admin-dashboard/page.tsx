import { orderService } from "@/services/order.service";
import {
  Activity,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/order.type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { userService } from "@/services/user.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const { data: metrics } = await orderService.getOrderMetrics();
  const { data: allOrders } = await orderService.getOrders();
  const { data: userMetrics } = await userService.getUsersMetrics();

  const recentOrders = allOrders?.slice(0, 10) || [];

  return (
    <div className="space-y-8 p-6 min-h-screen bg-slate-50/30 dark:bg-transparent">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Platform Overview
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Global statistics and order management for the entire platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${metrics?.totalRevenue?.toLocaleString() || "0"}`}
          icon={<TrendingUp className="text-emerald-500" />}
          trend="+12.5% from last month"
        />
        <StatCard
          title="Total Orders"
          value={metrics?.totalOrders || "0"}
          icon={<Package className="text-blue-500" />}
          trend="Across all sellers"
        />
        <StatCard
          title="Active Sellers"
          value={userMetrics?.totalSellers || "0"}
          icon={<Users className="text-purple-500" />}
          trend="Verified partners"
        />
        <StatCard
          title="Active Customers"
          value={userMetrics?.totalCustomers || "0"}
          icon={<Users className="text-amber-500" />}
          trend="Verified customers"
        />
      </div>

      {/* Stats Grid section remains same */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ... StatCards code ... */}
      </div>

      {/* Recent Global Orders Table */}
      <div className="rounded-3xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">
            Last 10 Global Orders
          </h2>
          <Activity size={20} className="text-slate-400" />
        </div>
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableRow className="dark:border-slate-800">
              <TableHead className="font-bold uppercase text-[11px]">
                Order ID
              </TableHead>
              <TableHead className="font-bold uppercase text-[11px]">
                Customer
              </TableHead>
              <TableHead className="font-bold uppercase text-[11px]">
                Items / Sellers
              </TableHead>
              <TableHead className="font-bold uppercase text-[11px]">
                Amount
              </TableHead>
              <TableHead className="font-bold uppercase text-[11px]">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order: any) => {
              const uniqueSellers = Array.from(
                new Set(
                  order.items?.map((item: any) => item.medicine?.seller?.name),
                ),
              ).filter(Boolean);

              return (
                <TableRow key={order.id} className="dark:border-slate-800">
                  <TableCell className="font-medium dark:text-slate-300">
                    #{order.id.slice(-6).toUpperCase()}
                  </TableCell>
                  <TableCell className="dark:text-slate-400">
                    {order?.customer?.name || "Guest User"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag size={12} className="text-blue-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {order.items?.length || 0} Products
                        </span>
                      </div>

                      {/* Show Seller Badge */}
                      <div className="flex flex-wrap gap-1">
                        {uniqueSellers.length > 1 ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-100 dark:border-blue-800"
                                >
                                  {uniqueSellers.length} Sellers
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  {uniqueSellers.join(", ")}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-[10px] font-medium text-slate-500 italic">
                            {(uniqueSellers[0] as string) || "Unknown Seller"}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold dark:text-white">
                    ${order.totalPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                      <div
                        className={`h-2 w-2 rounded-full ${getStatusDot(order.status)}`}
                      />
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, icon, trend }: any) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-black dark:text-white">{value}</h3>
        <p className="text-xs font-medium text-slate-500">{trend}</p>
      </div>
    </div>
  );
}

function getStatusDot(status: string) {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-amber-500";

    case OrderStatus.DELIVERED:
      return "bg-emerald-500";

    case OrderStatus.CANCELLED:
      return "bg-rose-500";

    default:
      return "bg-blue-500";
  }
}
