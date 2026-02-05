"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Loader2,
  Mail,
  Lock,
  AtSign,
  CheckCircle2,
  EyeOff,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { env } from "@/env";

const loginFormSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: loginFormSchema },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Logging into your account...");
      try {
        const { data, error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          rememberMe: true,
          callbackURL: `${env.NEXT_PUBLIC_APP_URL}`,
        });

        if (error) {
          toast.error(error.message, { id: toastId });
          setIsUploading(false);
          return;
        }

        toast.success("Welcome to the community!", { id: toastId });
        setIsUploading(false);
      } catch (err) {
        toast.error("An unexpected error occurred", { id: toastId });
        setIsUploading(false);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${env.NEXT_PUBLIC_APP_URL}/?auth_google=true`,
      });

      if (!data) {
        toast.error("Could not initiate Google login.");
      }
    } catch (error) {
      toast.error("Social login failed. Please try again.");
      console.error("Google Login Error:", error);
    }
  };

  return (
    <Card
      className={cn(
        "w-full max-w-md mx-auto overflow-hidden border-slate-200/60 dark:border-slate-800/60 shadow-[0_20px_50px_rgba(8,112,184,0.1)]",
        props.className,
      )}
    >
      <div className="h-1.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600" />

      <CardHeader className="text-center pt-8 space-y-2">
        <div className="mx-auto bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-2">
          <CheckCircle2 className="text-blue-600 dark:text-blue-400 w-6 h-6" />
        </div>
        <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Login Now
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 max-w-62.5 mx-auto">
          Start your journey with our secure medical platform
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8">
        <form
          id="register-form"
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            <form.Field
              name="email"
              children={(field) => (
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase text-slate-500 tracking-tight">
                    Email Address
                  </FieldLabel>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="email"
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                      placeholder="john@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <form.Field
              name="password"
              children={(field) => (
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase text-slate-500 tracking-tight">
                    Password
                  </FieldLabel>
                  <div className="relative group/pass">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within/pass:text-blue-500 transition-colors" />

                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    {/* Eye Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer outline-none"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col px-8 pb-10 space-y-4">
        <Button
          form="register-form"
          type="submit"
          disabled={isUploading}
          className="w-full h-12 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-white rounded-xl cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <div className="relative w-full flex items-center gap-4 py-2">
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Social Access
          </span>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
        </div>

        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <Mail className="mr-2 h-4 w-4 text-rose-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Continue with Google
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
