"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Medicine } from "@/types";
import Link from "next/link";
import { Eye, ChevronRight } from "lucide-react";
import Image from "next/image";

export function MedicineCard({ medicine }: { medicine: Medicine }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white dark:bg-slate-900/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      {/* Visual Placeholder Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={medicine.image}
            height={330}
            width={330}
            alt={medicine.name}
          />
        </div>

        <div className="absolute top-3 left-3">
          <Badge className="bg-white/80 backdrop-blur-md text-blue-600 border-none shadow-sm uppercase">
            {medicine.brand}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">
            {medicine.name}
          </h3>
          <span className="text-lg font-black text-blue-600">
            ${Number(medicine.price).toFixed(2)}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex flex-col border-r border-slate-200 dark:border-slate-800">
            <span>Dosage</span>
            <span className="text-slate-700 dark:text-slate-200">
              {medicine.dosage}
            </span>
          </div>
          <div className="flex flex-col pl-2">
            <span>Stock</span>
            <span
              className={
                medicine.stock > 0 ? "text-emerald-500" : "text-rose-500"
              }
            >
              {medicine.stock > 0 ? `${medicine.stock} units` : "Out of Stock"}
            </span>
          </div>
        </div>

        {/* Action Button: Redirects to Details Page */}
        <Button
          asChild
          variant="outline"
          className="w-full rounded-xl border-blue-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white transition-all group/btn cursor-pointer"
        >
          <Link href={`/medicines/${medicine.id}`} className="mt-6">
            <Eye className="mr-2 h-4 w-4" />
            View Details
            <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-2 group-hover/btn:translate-x-0" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
