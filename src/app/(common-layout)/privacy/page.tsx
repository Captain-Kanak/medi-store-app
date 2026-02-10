import {
  Eye,
  Lock,
  Database,
  Share2,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { RefreshCcw, Ban } from "lucide-react";

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 24, 2025";

  const policies = [
    {
      title: "Data We Collect",
      icon: <Database className="text-blue-600" />,
      items: [
        "Personal identifiers (Name, Email, Phone number)",
        "Delivery information (Physical Address)",
        "Medical prescriptions (when required for specific orders)",
        "Transaction history and payment metadata",
      ],
    },
    {
      title: "How We Use Data",
      icon: <Eye className="text-emerald-600" />,
      items: [
        "To process and fulfill your medicine orders",
        "To verify pharmacy credentials and user roles",
        "To provide real-time order tracking and updates",
        "To improve platform security and prevent fraud",
      ],
    },
    {
      title: "Data Sharing",
      icon: <Share2 className="text-amber-600" />,
      items: [
        "Shared with verified sellers to fulfill your specific order",
        "Shared with logistics partners for delivery purposes",
        "We never sell your medical or personal data to third parties",
        "Legal compliance with healthcare regulatory authorities",
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <div className="h-16 w-16 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-2">
          <ShieldCheck size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy <span className="text-blue-600">Policy.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
          At MediStore, your health privacy is our priority. We are committed to
          protecting your data through secure encryption and transparent
          practices.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 uppercase tracking-widest">
          Last Updated: {lastUpdated}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {policies.map((policy, idx) => (
          <div
            key={idx}
            className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
              {policy.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {policy.title}
            </h3>
            <ul className="space-y-3">
              {policy.items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Security Commitment */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-12 text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="h-20 w-20 shrink-0 rounded-3xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
            <Lock size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">End-to-End Security</h2>
            <p className="text-slate-400 leading-relaxed">
              We use industry-standard SSL encryption for all data transfers.
              Your payment information is processed through PCI-compliant
              gateways and is never stored directly on our servers.
            </p>
          </div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Rights Section */}
      <div className="mt-16 pt-16 border-t dark:border-slate-800">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Your Data Rights
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              You have full control over your information at MediStore.
            </p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <RightCard
              icon={<UserCheck size={18} />}
              text="Request access to your personal data files."
            />
            <RightCard
              icon={<RefreshCcw size={18} />}
              text="Update or correct inaccurate information."
            />
            <RightCard
              icon={<Ban size={18} />}
              text="Request deletion of your account and data."
            />
            <RightCard
              icon={<ShieldCheck size={18} />}
              text="Opt-out of non-essential communications."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RightCard({ icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
      <div className="text-blue-600">{icon}</div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}
