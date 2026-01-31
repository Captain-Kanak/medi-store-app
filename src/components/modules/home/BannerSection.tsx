"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, UploadCloud, ShieldCheck, Zap } from "lucide-react";

export default function BannerSection() {
  return (
    <section
      className="relative min-h-125 w-full overflow-hidden rounded-3xl 
      bg-slate-50 dark:bg-slate-950 
      border border-slate-200 dark:border-slate-800
      text-slate-900 dark:text-white transition-colors duration-300"
    >
      {/* --- Adaptive Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Orbs: Soft blue for light, Deep blue for dark */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[60%] rounded-full 
          bg-blue-400/20 dark:bg-blue-600/30 blur-[120px] animate-pulse"
        />
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full 
          bg-cyan-300/20 dark:bg-cyan-500/20 blur-[120px]"
        />

        {/* Grid Pattern: Dark lines for light mode, Light lines for dark mode */}
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-10 
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]"
        />
      </div>

      <div className="relative z-10 flex h-full flex-col lg:flex-row items-center justify-between px-8 py-16 md:px-16 lg:gap-12">
        {/* --- Left Content --- */}
        <div className="flex flex-col justify-center text-center lg:text-left lg:w-3/5">
          <Badge
            className="w-fit mx-auto lg:mx-0 mb-6 
            bg-blue-100 dark:bg-blue-500/10 
            text-blue-600 dark:text-blue-400 
            border-blue-200 dark:border-blue-500/30 
            backdrop-blur-md px-4 py-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-2" />
            100% Genuine Medicines
          </Badge>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
            Your Trusted Online <br />
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Pharmacy Partner
            </span>
          </h1>

          <p
            className="mt-6 text-lg md:text-xl font-light leading-relaxed
            text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0"
          >
            Experience the future of healthcare. Get authentic medicines and
            expert wellness support delivered with speed and care.
          </p>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <Button
              size="lg"
              className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              Browse Medicines <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-full 
                border-slate-300 dark:border-slate-700 
                bg-white/50 dark:bg-slate-900/50 
                backdrop-blur-md text-slate-900 dark:text-white 
                hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <UploadCloud className="mr-2 w-5 h-5" />
              Upload Prescription
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm">
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-bold text-lg">
                15k+
              </span>
              <span className="text-slate-500">Happy Customers</span>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col">
              <span className="text-slate-900 dark:text-white font-bold text-lg">
                24/7
              </span>
              <span className="text-slate-500">Pharmacist Support</span>
            </div>
          </div>
        </div>

        {/* --- Right Content --- */}
        <div className="hidden lg:flex flex-1 justify-center items-center relative">
          <div
            className="relative w-full max-w-md aspect-square rounded-full flex items-center justify-center p-8 
              bg-blue-100/50 dark:bg-blue-600/10 border border-blue-200/50 dark:border-white/5"
          >
            {/* Main Card */}
            <div
              className="w-full h-full rounded-3xl rotate-3 hover:rotate-0 transition-transform duration-500
                  bg-white dark:bg-slate-800/40 
                  backdrop-blur-xl border border-slate-200 dark:border-white/10 
                  shadow-xl dark:shadow-2xl flex items-center justify-center"
            >
              <span className="text-slate-400 dark:text-slate-500 italic font-medium">
                Authentic Meds
              </span>
            </div>

            {/* Floating "Fast Delivery" card */}
            <div
              className="absolute -bottom-4 -left-4 p-4 rounded-2xl flex items-center gap-3 animate-bounce
                  bg-white dark:bg-slate-900 
                  border border-slate-200 dark:border-slate-700
                  shadow-xl shadow-blue-500/10"
            >
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Zap size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-slate-900 dark:text-white text-xs font-bold leading-none">
                  Instant Care
                </p>
                <p className="text-slate-500 text-[10px]">Express Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
