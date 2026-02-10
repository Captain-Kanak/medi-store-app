import { ShieldCheck, Truck, Clock, Award } from "lucide-react";

export function TrustSection() {
  const features = [
    {
      icon: <ShieldCheck className="text-emerald-500" />,
      title: "100% Authentic",
      desc: "All medicines are sourced from verified pharmacies.",
      bg: "bg-emerald-50 dark:bg-emerald-900/10",
    },
    {
      icon: <Truck className="text-blue-500" />,
      title: "Express Delivery",
      desc: "Get your essentials delivered to your door in 24 hours.",
      bg: "bg-blue-50 dark:bg-blue-900/10",
    },
    {
      icon: <Clock className="text-amber-500" />,
      title: "24/7 Support",
      desc: "Our pharmacists are online to help with your prescriptions.",
      bg: "bg-amber-50 dark:bg-amber-900/10",
    },
    {
      icon: <Award className="text-purple-500" />,
      title: "Verified Sellers",
      desc: "Only licensed pharmacies are allowed on our platform.",
      bg: "bg-purple-50 dark:bg-purple-900/10",
    },
  ];

  return (
    <section className="py-20 border-y border-slate-100 dark:border-slate-900">
      <div className="container mx-auto px-6">

        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-12">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex gap-5 group">
              <div
                className={`h-14 w-14 shrink-0 rounded-2xl ${f.bg} flex items-center justify-center shadow-sm group-hover:-translate-y-1 transition-transform`}
              >
                {f.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {f.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
