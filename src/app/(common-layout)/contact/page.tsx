"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // this feature is not implemented yet, so we just simulate a successful submission with a delay
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent! Our team will contact you shortly.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Contact Information */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Let's get in <span className="text-blue-600">touch.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-md">
              Have questions about an order or want to partner with us as a
              pharmacy? We're here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <ContactMethod
              icon={<Mail className="text-blue-600" />}
              title="Email Us"
              detail="support@medistore.com"
              description="Response within 24 hours"
            />
            <ContactMethod
              icon={<Phone className="text-emerald-600" />}
              title="Call Us"
              detail="+1 (555) 000-1234"
              description="Mon-Fri, 9am to 6pm"
            />
            <ContactMethod
              icon={<MapPin className="text-rose-600" />}
              title="Visit Us"
              detail="123 Health Ave, Medical District"
              description="Silicon Valley, CA 94043"
            />
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
              <Clock className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Emergency Support
              </p>
              <p className="text-xs text-slate-500">
                Available 24/7 for urgent prescription issues.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                  Full Name
                </Label>
                <Input
                  placeholder="John Doe"
                  className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-12 focus-visible:ring-blue-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                  Email Address
                </Label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-12 focus-visible:ring-blue-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                Subject
              </Label>
              <Input
                placeholder="How can we help?"
                className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none h-12 focus-visible:ring-blue-600"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-slate-500 ml-1">
                Message
              </Label>
              <Textarea
                placeholder="Tell us more about your inquiry..."
                className="rounded-xl bg-slate-50 dark:bg-slate-800 border-none min-h-37.5 focus-visible:ring-blue-600 resize-none"
                required
              />
            </div>

            <Button
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-500/20 transition-all hover:-translate-y-1 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send size={20} className="mr-2" /> Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactMethod({
  icon,
  title,
  detail,
  description,
}: {
  icon: any;
  title: string;
  detail: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-5">
      <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-blue-600 font-bold text-sm">{detail}</p>
        <p className="text-xs text-slate-400 font-medium">{description}</p>
      </div>
    </div>
  );
}
