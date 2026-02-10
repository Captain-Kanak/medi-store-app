import {
  ScrollText,
  ShieldAlert,
  Scale,
  Ban,
  RefreshCcw,
  Truck,
} from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "February 10, 2026";

  const sections = [
    {
      id: "acceptance",
      icon: <Scale size={20} className="text-blue-600" />,
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using MediMart, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use this platform. We reserve the right to update these terms at any time without prior notice.",
    },
    {
      id: "medical",
      icon: <ShieldAlert size={20} className="text-rose-600" />,
      title: "2. Medical Disclaimer",
      content:
        "MediMart is a marketplace, not a healthcare provider. Content provided is for informational purposes only and does not constitute medical advice. Always seek the advice of a qualified physician regarding medical conditions.",
    },
    {
      id: "prescriptions",
      icon: <ScrollText size={20} className="text-amber-600" />,
      title: "3. Prescription Policy",
      content:
        "Certain medications require a valid prescription from a licensed healthcare provider. Sellers are strictly prohibited from dispensing prescription-only medicine (POM) without verifying a valid prescription upload.",
    },
    {
      id: "prohibited",
      icon: <Ban size={20} className="text-slate-600" />,
      title: "4. Prohibited Conduct",
      content:
        "Users may not use the platform to solicit illegal substances, misrepresent their identity, or interfere with the security features of the marketplace. Violation of these rules results in immediate account termination.",
    },
    {
      id: "returns",
      icon: <RefreshCcw size={20} className="text-emerald-600" />,
      title: "5. Returns & Refunds",
      content:
        "Due to the nature of pharmaceutical products, returns are generally not accepted for hygiene and safety reasons unless the product is damaged or incorrect. Please check our specialized Refund Policy for details.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of <span className="text-blue-600">Service.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Intro Card */}
        <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
          <p className="text-blue-900 dark:text-blue-300 font-medium leading-relaxed">
            Please read these terms carefully. They contain important
            information about your legal rights, remedies, and obligations. By
            using the MediMart platform, you signify your agreement to these
            terms and our Privacy Policy.
          </p>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.id}
              className="group flex flex-col md:flex-row gap-6"
            >
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                {section.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-12 border-t dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500 italic">
            Questions about the Terms of Service? Reach out to our legal team at{" "}
            <span className="text-blue-600 font-bold cursor-pointer hover:underline">
              legal@medistore.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
