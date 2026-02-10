import {
  ShieldCheck,
  Users,
  Heart,
  Award,
  CheckCircle2,
  Pill,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="text-blue-600" />,
      title: "Quality Assured",
      desc: "Every pharmacy on our platform undergoes a rigorous multi-step verification process to ensure medicine authenticity.",
    },
    {
      icon: <Users className="text-emerald-600" />,
      title: "Patient Centric",
      desc: "Our technology is designed around the needs of patients, ensuring accessibility for all age groups.",
    },
    {
      icon: <Heart className="text-rose-600" />,
      title: "Compassionate Care",
      desc: "We believe healthcare is a right. We work with sellers to provide competitive pricing and essential availability.",
    },
    {
      icon: <Award className="text-amber-600" />,
      title: "Regulatory Compliance",
      desc: "We strictly adhere to national healthcare guidelines and digital pharmacy regulations.",
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-100 w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* You can replace this div with a background pattern or image */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
        </div>
        <div className="relative z-10 text-center space-y-4 px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Bridging the Gap in{" "}
            <span className="text-blue-500">Healthcare.</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            MediMart is more than a marketplace. We are a digital ecosystem
            dedicated to making life-saving medicines accessible, affordable,
            and authentic.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
              <Pill size={120} strokeWidth={1} />
            </div>
            {/* Replace with actual team or office image */}
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
              alt="Pharmacist working"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-blue-600 rounded-3xl hidden md:flex items-center justify-center text-white shadow-xl">
            <div className="text-center">
              <p className="text-2xl font-black">50+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Pharmacies
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
            Our Journey to Digital <br /> Pharmacy Excellence
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Founded in 2024, MediMart began with a simple question:{" "}
            <i>
              "Why is it so hard to verify the authenticity of medicine online?"
            </i>{" "}
            We saw the challenges faced by both patients and legitimate
            pharmacies in a crowded digital space.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Today, we serve as a trusted intermediary, providing a robust
            platform where sellers can manage inventory transparently and
            customers can shop with absolute peace of mind.
          </p>
          <ul className="space-y-3">
            {[
              "Verified Prescription Handling",
              "Real-time Stock Management",
              "Secure Cold-Chain Logistics",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 font-bold text-slate-800 dark:text-slate-200"
              >
                <CheckCircle2 className="text-blue-600" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-slate-500 font-medium">
              The principles that guide every feature we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow"
              >
                <div className="mb-6 h-12 w-12 rounded-2xl flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                  {v.icon}
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                  {v.title}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
