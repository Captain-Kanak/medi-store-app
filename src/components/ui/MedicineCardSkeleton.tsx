export default function MedicineListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse overflow-hidden rounded-2xl border bg-white dark:bg-slate-900/50"
        >
          {/* Image Section */}
          <div className="relative aspect-4/3 bg-slate-200 dark:bg-slate-800">
            {/* Brand badge placeholder */}
            <div className="absolute top-3 left-3 h-5 w-20 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Content Section */}
          <div className="flex flex-col p-5 space-y-4">
            {/* Title + Price */}
            <div className="flex justify-between items-start gap-3">
              <div className="h-4 w-3/5 rounded bg-slate-300 dark:bg-slate-700" />
              <div className="h-4 w-12 rounded bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Dosage & Stock */}
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="flex flex-col gap-2 border-r border-slate-200 dark:border-slate-800 pr-2">
                <div className="h-3 w-12 rounded bg-slate-300 dark:bg-slate-700" />
                <div className="h-3 w-16 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
              <div className="flex flex-col gap-2 pl-2">
                <div className="h-3 w-12 rounded bg-slate-300 dark:bg-slate-700" />
                <div className="h-3 w-16 rounded bg-slate-300 dark:bg-slate-700" />
              </div>
            </div>

            {/* Button */}
            <div className="mt-4 h-10 w-full rounded-xl bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
