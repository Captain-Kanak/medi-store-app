"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

export function MedicineSort() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = `${searchParams.get("sortBy") ?? "createdAt"}:${searchParams.get("sortOrder") ?? "desc"}`;

  const onChange = (value: string) => {
    const [sortBy, sortOrder] = value.split(":");
    const params = new URLSearchParams(searchParams.toString());

    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    params.set("page", "1");

    router.push(`/medicines?${params.toString()}`);
  };

  return (
    <Select value={current} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="createdAt:desc">Latest</SelectItem>
        <SelectItem value="price:asc">Price: Low to High</SelectItem>
        <SelectItem value="price:desc">Price: High to Low</SelectItem>
        <SelectItem value="name:asc">Name: A–Z</SelectItem>
      </SelectContent>
    </Select>
  );
}
