import { GerOrdersParams, orderService } from "@/services/order.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, User, CheckCircle } from "lucide-react";
import { OrderStatusUpdater } from "@/components/modules/seller/OrderStatusUpdater";
import { OrderStatus } from "@/types";
import { OrderPagination } from "@/components/modules/order/OrderPagination";

export default async function SellerManageOrdersPage({
  searchParams,
}: {
  searchParams: Promise<GerOrdersParams>;
}) {
  const params = await searchParams;
  const currentPage = params.page || 1;

  const { data: orders, pagination } = await orderService.getOrders({
    page: currentPage,
    limit: 10,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";

      case OrderStatus.PROCESSING:
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";

      case OrderStatus.SHIPPED:
        return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";

      case OrderStatus.DELIVERED:
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800";

      case OrderStatus.CANCELLED:
        return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800";

      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Manage Orders
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Track and update your customer shipments
        </p>
      </div>

      <div className="rounded-3xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableRow className="dark:border-slate-800">
              <TableHead className="font-bold">Order Details</TableHead>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Amount</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: any) => (
              <TableRow
                key={order.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors dark:border-slate-800"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Package size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        #{order.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {order.items?.length || 0} items
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-400" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {order.customer?.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-900 dark:text-white">
                  ${order.totalPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {order.status === OrderStatus.DELIVERED ? (
                    <div className="flex items-center justify-end gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-xs pr-4">
                      <CheckCircle size={14} />
                      Completed
                    </div>
                  ) : order.status === OrderStatus.CANCELLED ? (
                    <div className="flex items-center justify-end gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs pr-4">
                      <Package size={14} className="rotate-12" />
                      Canceled
                    </div>
                  ) : (
                    <OrderStatusUpdater
                      orderId={order.id}
                      currentStatus={order.status}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!orders?.length && (
          <div className="py-20 text-center">
            <Package className="mx-auto h-12 w-12 text-slate-200 dark:text-slate-700 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white">
              No orders yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Your orders will appear here once customers start buying.
            </p>
          </div>
        )}
      </div>

      <OrderPagination
        totalPages={pagination.totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
