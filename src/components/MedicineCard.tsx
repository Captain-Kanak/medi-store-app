"use client";

import { ShoppingCart, Pill, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MedicineCardProps {
  medicine: any;
  onAddToCart?: (medicine: any) => void;
}

export function MedicineCard({ medicine, onAddToCart }: MedicineCardProps) {
  const isLowStock = medicine.stock > 0 && medicine.stock < 10;
  const isOutOfStock = medicine.stock === 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Image Section */}
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={medicine.image || "/placeholder-medicine.jpg"}
          alt={medicine.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-bold">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge
            variant="outline"
            className="text-[10px] uppercase tracking-wider"
          >
            {medicine.brand}
          </Badge>
          {isLowStock && (
            <Badge
              variant="destructive"
              className="flex items-center gap-1 text-[10px]"
            >
              <AlertCircle size={10} /> Low Stock
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-lg leading-tight text-foreground line-clamp-1">
          {medicine.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2 min-h-10">
          {medicine.description}
        </p>

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Pill size={14} />
          <span>Dosage: {medicine.dosage}</span>
        </div>

        {/* Pricing and Action */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              ${medicine.price.toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            disabled={isOutOfStock}
            onClick={() => onAddToCart?.(medicine)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ShoppingCart size={16} />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
