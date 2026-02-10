import Link from "next/link";
import {
  Pill,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t dark:border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo />

            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your trusted marketplace for authentic medicines and healthcare
              essentials. Connecting patients with verified pharmacies.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Marketplace
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <FooterLink href="/medicines">All Medicines</FooterLink>
              </li>
              <li>
                <FooterLink href="/medicines">Categories</FooterLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">Terms of Service</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">Contact Support</FooterLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <ContactItem
                icon={<Mail size={16} />}
                text="support@medistore.com"
              />
              <ContactItem
                icon={<Phone size={16} />}
                text="+1 (555) 000-1234"
              />
              <ContactItem
                icon={<MapPin size={16} />}
                text="123 Health Ave, Medical District"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t dark:border-slate-800 flex flex-col md:flex-row justify-center items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <p>© {currentYear} Medistore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialLink({ icon, href }: { icon: any; href: string }) {
  return (
    <Link
      href={href}
      className="h-9 w-9 rounded-lg bg-white dark:bg-slate-800 border dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all shadow-sm"
    >
      {icon}
    </Link>
  );
}

function ContactItem({ icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
      <div className="text-blue-600">{icon}</div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
