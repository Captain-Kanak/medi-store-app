"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function MedicineSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    value ? params.set("search", value) : params.delete("search");
    params.set("page", "1");

    router.push(`/medicines?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search medicines, brands..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-10 rounded-full"
        />
      </div>

      {/* Search Button */}
      <Button type="submit" className="rounded-full px-5">
        Search
      </Button>
    </form>
  );
}
