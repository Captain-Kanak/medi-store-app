import { medicineService } from "@/services/medicine.service";
import { MedicinePagination } from "@/components/modules/medicines/MedicinePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pill, Store, Package } from "lucide-react";
import { DeleteMedicineButton } from "@/components/modules/admin/DeleteMedicineButton";

export const dynamic = "force-dynamic";

export default async function AdminMedicinesListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const { data: medicines, pagination } = await medicineService.getMedicines({
    page: currentPage,
    limit: 10,
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Medicines Inventory
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Global list of all medicines available on the platform.
        </p>
      </div>

      <div className="rounded-3xl border dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableRow className="dark:border-slate-800">
              <TableHead className="font-bold">Medicine</TableHead>
              <TableHead className="font-bold">Dosage</TableHead>
              <TableHead className="font-bold">Seller</TableHead>
              <TableHead className="font-bold">Stock</TableHead>
              <TableHead className="font-bold">Price</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicines?.map((medicine: any) => (
              <TableRow
                key={medicine.id}
                className="dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                      {medicine.image ? (
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="h-full w-full object-cover rounded-xl"
                        />
                      ) : (
                        <Pill size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {medicine.name}
                      </p>
                      <p className="text-xs text-slate-500">{medicine.brand}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Pill size={14} className="text-slate-400" />
                    <span className="text-sm font-medium dark:text-slate-300">
                      {medicine.dosage}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Store size={14} className="text-slate-400" />
                    <span className="text-sm font-medium dark:text-slate-300">
                      {medicine.seller?.name || "Unknown"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        medicine.stock < 10 ? "destructive" : "secondary"
                      }
                      className="rounded-lg px-2"
                    >
                      {medicine.stock}
                    </Badge>
                    {medicine.stock < 10 && (
                      <span className="text-[10px] font-bold text-rose-500 uppercase">
                        Low
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-900 dark:text-white">
                  ${medicine.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DeleteMedicineButton id={medicine.id} name={medicine.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {(!medicines || medicines.length === 0) && (
          <div className="py-20 text-center">
            <Package className="mx-auto h-12 w-12 text-slate-200 mb-3" />
            <p className="text-slate-500 font-medium">
              No medicines found in the system.
            </p>
          </div>
        )}
      </div>

      <MedicinePagination pagination={pagination} />
    </div>
  );
}
