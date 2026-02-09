import { categoryService } from "@/services/category.service";
import { LayoutGrid, Tags, Info } from "lucide-react";
import { CategoryModal } from "@/components/modules/admin/CategoryModal";
import { DeleteCategoryButton } from "@/components/modules/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const { data: categories } = await categoryService.getCategories();

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Medicines Categories
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage how products are organized.
          </p>
        </div>
        <CategoryModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category: any) => (
          <div
            key={category.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-sm transition-all hover:shadow-md group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                <Tags size={24} />
              </div>
              <div className="flex gap-1">
                <CategoryModal category={category} />
                <DeleteCategoryButton id={category.id} name={category.name} />
              </div>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 min-h-10">
              {category.description || "No description provided."}
            </p>

            <div className="mt-6 pt-6 border-t dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">
                Global Category
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
                <LayoutGrid size={12} />
                <span>{category._count?.medicines || 0} Medicines</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!categories?.length && (
        <div className="py-20 text-center rounded-3xl border-2 border-dashed dark:border-slate-800">
          <Info className="mx-auto h-12 w-12 text-slate-200 mb-3" />
          <p className="text-slate-500 font-medium">
            No categories created yet.
          </p>
        </div>
      )}
    </div>
  );
}
