import { medicineService } from "@/services/medicine.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pill, Edit, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MedicinePagination } from "@/components/modules/medicines/MedicinePagination";
import { InventoryActions } from "@/components/modules/seller/InventoryActions";

export default async function SellerMedicinesInventory({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { data: medicines, pagination } =
    await medicineService.getSellerMedicines({
      page: currentPage,
      limit: 10,
    });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Inventory
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Manage your {pagination?.total || 0} listed medicines and stock
            levels.
          </p>
        </div>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 h-12 font-bold shadow-lg shadow-blue-200"
        >
          <Link href="/seller-dashboard/add-medicine">
            <Plus className="mr-2 h-5 w-5" /> Add Medicine
          </Link>
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="rounded-3xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="w-75 font-bold py-4">Medicine</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Dosage</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="font-bold">Stock</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines?.map((item) => (
              <TableRow
                key={item.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                      <Pill size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">
                        {item.brand}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-lg font-medium">
                    {item?.category?.name}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="rounded-lg font-medium">
                    {item?.dosage}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold text-slate-700 dark:text-slate-300">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold ${item.stock <= 10 ? "text-rose-500" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      {item.stock}
                    </span>
                    {item.stock <= 10 && (
                      <AlertCircle className="h-4 w-4 text-rose-500 animate-pulse" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <InventoryActions medicine={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {medicines?.length === 0 && (
          <div className="py-20 text-center">
            <div className="mx-auto h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Pill className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No medicines found
            </h3>
            <p className="text-slate-500">
              You haven't added any medicines to your inventory yet.
            </p>
          </div>
        )}
      </div>

      <MedicinePagination pagination={pagination} />
    </div>
  );
}
