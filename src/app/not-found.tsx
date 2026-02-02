"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Stethoscope, Pill } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 relative overflow-hidden">
      {/* Abstract Medical Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="max-w-2xl w-full text-center z-10">
        {/* Large 404 Illustration Area */}
        <div className="relative mb-8 flex justify-center">
          <h1 className="text-[12rem] font-black leading-none text-slate-200 dark:text-slate-900 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 -rotate-6 animate-bounce duration-2000">
              <Stethoscope className="w-16 h-16 text-blue-600" />
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 rotate-12 absolute translate-x-24 -translate-y-8 animate-pulse">
              <Pill className="w-10 h-10 text-rose-500" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl tracking-tight">
            Oops! Diagnosis: Page Not Found.
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            We couldn't find the medicine or page you were looking for. It might
            have been moved or the prescription was misread.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 w-full sm:w-auto"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            className="h-12 px-8 border-slate-200 dark:border-slate-800 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 w-full sm:w-auto"
          >
            <Link href="/medicines">
              <Search className="mr-2 h-5 w-5" /> Browse Medicines
            </Link>
          </Button>
        </div>

        {/* Help Link */}
        <p className="mt-12 text-sm text-slate-400">
          Need urgent help?{" "}
          <Link
            href="/contact"
            className="text-blue-500 font-bold hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
