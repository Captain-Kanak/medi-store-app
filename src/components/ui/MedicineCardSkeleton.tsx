export default function MedicineListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
        />
      ))}
    </div>
  );
}
