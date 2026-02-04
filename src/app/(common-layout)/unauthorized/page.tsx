"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Lock } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="relative max-w-md w-full text-center">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full -z-10" />

        {/* Icon Section */}
        <div className="relative mb-8 flex justify-center">
          <div className="h-24 w-24 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-xl rotate-3">
            <ShieldAlert className="h-12 w-12 text-rose-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg -rotate-12">
            <Lock className="h-5 w-5" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-10 text-balance font-medium">
          Oops! It looks like you don&apos;t have the necessary permissions to
          view this section of the pharmacy. If you believe this is an error,
          please contact your administrator.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            variant="outline"
            className="h-12 px-6 rounded-2xl border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer"
          >
            <button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          </Button>

          <Button
            asChild
            className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Error Code: 403 Forbidden
        </p>
      </div>
    </div>
  );
}
