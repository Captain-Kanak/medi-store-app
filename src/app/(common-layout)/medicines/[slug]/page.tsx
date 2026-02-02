import { medicineService } from "@/services/medicine.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pill,
  ShieldCheck,
  Truck,
  Activity,
  Info,
  Calendar,
  Building2,
  PackageCheck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "@/types";

export async function generateStaticParams(): Promise<any> {
  const { data: medicines } = await medicineService.getMedicines();

  return medicines
    ?.map((medicine: Medicine) => ({ slug: medicine.id }))
    .splice(0, 12);
}

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: medicine } = await medicineService.getMedicineById(slug);

  if (!medicine) {
    return (
      <div className="container py-20 text-center">Medicine not found.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* --- Left Column: Visual & Info (7 Cols) --- */}
        <div className="lg:col-span-7 space-y-8">
          {/* Visual Placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-3xl border bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)]" />
            <Pill size={120} strokeWidth={0.5} className="text-blue-500/50" />
            <Badge className="absolute top-6 left-6 bg-blue-600">
              Authentic Product
            </Badge>
          </div>

          {/* Description Block */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <Info className="h-5 w-5 text-blue-500" />
              Product Description
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {medicine.description}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div className="rounded-3xl border bg-slate-50/50 dark:bg-slate-900/50 p-6 md:p-8">
            <h3 className="mb-6 font-bold text-slate-900 dark:text-white uppercase tracking-widest text-sm">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <SpecItem
                icon={Building2}
                label="Manufacturer"
                value={medicine.brand}
              />
              <SpecItem
                icon={Activity}
                label="Dosage Form"
                value={medicine.dosage}
              />
              <SpecItem
                icon={PackageCheck}
                label="Stock Status"
                value={`${medicine.stock} Units Available`}
              />
              <SpecItem
                icon={Calendar}
                label="Last Updated"
                value={new Date(medicine.updatedAt).toLocaleDateString()}
              />
            </div>
          </div>
        </div>

        {/* --- Right Column: Checkout Action (5 Cols) --- */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-xl shadow-blue-500/5 space-y-6">
            <div>
              <Badge
                variant="outline"
                className="mb-2 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900"
              >
                {medicine.brand}
              </Badge>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {medicine.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">
                ${Number(medicine.price).toFixed(2)}
              </span>
              <span className="text-slate-400 line-through text-sm">
                $ {(Number(medicine.price) + 5).toFixed(2)}
              </span>
            </div>

            <Separator className="dark:bg-slate-800" />

            {/* Features List */}
            <div className="space-y-3">
              <Feature
                icon={ShieldCheck}
                text="Verified by MediStore Pharmacists"
              />
              <Feature icon={Truck} text="Fast Delivery (within 24 hours)" />
            </div>

            <div className="pt-4 space-y-3">
              <Button
                size="lg"
                className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg font-bold"
              >
                Buy Now
              </Button>
            </div>

            <p className="text-center text-xs text-slate-500 pt-2">
              * Prescription may be required for certain medicines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-700">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase">{label}</p>
        <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function Feature({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
      <Icon className="h-5 w-5 text-emerald-500" />
      <span>{text}</span>
    </div>
  );
}
