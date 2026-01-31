"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";
import { PlusCircle } from "lucide-react";

export default function CategorySection() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Browse by Category
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Find the right healthcare products categorized for your specific
            needs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {loading
          ? [...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))
          : categories.map((cat) => {
              const Icon = PlusCircle;

              return (
                <div
                  key={cat.id}
                  className={cn(
                    "group cursor-pointer p-6 rounded-2xl border transition-all duration-300",
                    "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800",
                    "hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1",
                  )}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                  bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 
                  transition-transform group-hover:scale-110"
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white truncate">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              );
            })}
      </div>
    </section>
  );
}
