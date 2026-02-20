"use client";

export default function PageLoader() {
  const text = "MEDI-STORE";

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-white/80 backdrop-blur-md dark:bg-slate-950/80 transition-all">
      {/* Brand Name */}
      <h1 className="text-3xl md:text-5xl font-black tracking-widest text-slate-900 dark:text-white">
        {text}
      </h1>

      {/* Bullet Loading */}
      <div className="flex gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce" />
      </div>
    </div>
  );
}
