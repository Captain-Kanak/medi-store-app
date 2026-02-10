import { getCategories } from "@/actions/category.action";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function FeaturedCategories() {
  const { data: categories } = await getCategories();

  return (
    <section className="py-16 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Find the right healthcare products across specialized departments.
            </p>
          </div>
          <Link
            href="/medicines"
            className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories?.slice(0, 6).map((category: any) => (
            <Link
              key={category.id}
              href={`/medicines?categoryId=${category.id}`}
              className="group p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 text-center"
            >
              <div className="mb-4 mx-auto h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                {/* Fallback Icon if category doesn't have one */}
                <span className="font-bold text-lg">{category.name[0]}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
