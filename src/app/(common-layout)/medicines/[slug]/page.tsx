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
  Store,
  ChevronRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ApiResponse, Medicine } from "@/types";
import Link from "next/link";
import MedicineActions from "@/components/modules/medicines/MedicineActions";
import Image from "next/image";
import MedicineReviews from "@/components/modules/medicines/MedicineReviews";

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: medicine } = (await medicineService.getMedicineById(
    slug,
  )) as ApiResponse<Medicine>;

  if (!medicine) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center py-30">
        <div className="container text-center">Medicine not found.</div>

        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/medicines">Browse Medicines</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-video overflow-hidden rounded-3xl border bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)]" />
            <Pill size={120} strokeWidth={0.5} className="text-blue-500/50" />
            <Badge className="absolute top-6 left-6 bg-blue-600 text-gray-200">
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

          <MedicineReviews reviews={medicine.reviews} />

          {/* Seller Information Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 flex items-center justify-between bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                {medicine?.seller?.image ? (
                  <Image
                    src={medicine.seller.image}
                    alt={medicine.seller.name}
                    className="rounded-2xl h-full w-full object-cover"
                  />
                ) : (
                  <Store className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                  Authorized Seller
                </p>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Name: {medicine?.seller?.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Email: {medicine?.seller?.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-3xl border bg-white dark:bg-slate-900 p-8 shadow-xl shadow-blue-500/5 space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-blue-400 border-blue-200"
                >
                  {medicine.brand}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-slate-100 text-slate-600"
                >
                  {medicine?.category?.name}
                </Badge>
              </div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">
                {medicine.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600">
                ${Number(medicine.price).toFixed(2)}
              </span>
              <span className="text-slate-400 line-through text-md">
                $ {(Number(medicine.price) * 1.2).toFixed(2)}
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
              <MedicineActions medicine={medicine} />
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
