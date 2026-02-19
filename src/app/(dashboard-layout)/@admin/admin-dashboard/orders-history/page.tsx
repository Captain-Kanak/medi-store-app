import { OrderPagination } from "@/components/modules/order/OrderPagination";
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
import { Package, User, Store, Calendar, CreditCard } from "lucide-react";
import { OrderStatus } from "@/types/order.type";
import { MedicinePagination } from "@/components/modules/medicines/MedicinePagination";

export const dynamic = "force-dynamic";

export default async function AdminOrdersHistoryPage({
  searchParams,
}: {
  searchParams: Promise<GerOrdersParams>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { data: orders, pagination } = await orderService.getOrders({
    page: currentPage,
    limit: 10,
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400";
      case OrderStatus.DELIVERED:
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
      case OrderStatus.CANCELLED:
        return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Orders History
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          A complete audit log of every transaction on the platform.
        </p>
      </div>

      <div className="rounded-3xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableRow className="dark:border-slate-800">
              <TableHead className="font-bold">Order ID</TableHead>
              <TableHead className="font-bold">Customer</TableHead>
              <TableHead className="font-bold">Seller Info</TableHead>
              <TableHead className="font-bold">Total Amount</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="text-right font-bold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: any) => {
              const rawSellerNames =
                order.items?.map((item: any) => {
                  return (
                    item.medicine?.seller?.name || item.seller?.name || null
                  );
                }) || [];

              const sellers = Array.from(new Set(rawSellerNames)).filter(
                Boolean,
              ) as string[];

              const sellerDisplay =
                sellers.length > 0
                  ? sellers.length > 1
                    ? `${sellers[0]} +${sellers.length - 1}`
                    : sellers[0]
                  : "Unknown Seller";

              return (
                <TableRow
                  key={order.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors dark:border-slate-800"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                        <Package size={20} />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white uppercase">
                        #{order.id.slice(-6)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {order.customer?.name || "Guest"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Store size={14} className="text-blue-500" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {sellerDisplay}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                      <CreditCard size={14} className="text-slate-400" />$
                      {order.totalPrice.toFixed(2)}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={`rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase border-none ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {!orders?.length && (
          <div className="py-20 text-center">
            <Package className="mx-auto h-12 w-12 text-slate-200 dark:text-slate-700 mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white">
              No history found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              There are no orders recorded in the system yet.
            </p>
          </div>
        )}
      </div>

      <MedicinePagination pagination={pagination} />
    </div>
  );
}
