"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Camera,
  Loader2,
  Mail,
  User,
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
import { uploadImageToImgBB } from "@/utils/imageUpload";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { env } from "@/env";

const registerFormSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  imageFile: z.custom<File | null>(
    (val) => val === null || val instanceof File,
    { message: "Invalid file type" },
  ),
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      imageFile: null as File | null,
    },
    validators: { onSubmit: registerFormSchema },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Creating your account...");
      try {
        let imageUrl = "";
        if (value.imageFile) {
          const uploadedUrl = await uploadImageToImgBB(value.imageFile);
          if (uploadedUrl) imageUrl = uploadedUrl;
        }

        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          image: imageUrl,
          callbackURL: env.NEXT_PUBLIC_APP_URL,
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
        callbackURL: env.NEXT_PUBLIC_APP_URL,
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
          Join Us
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
          <div className="flex flex-col items-center justify-center group">
            <div className="relative">
              <div className="h-28 w-28 rounded-3xl rotate-3 group-hover:rotate-0 transition-transform duration-300 border-2 border-dashed border-blue-200 dark:border-slate-700 p-1 bg-white dark:bg-slate-900 overflow-hidden">
                <div className="h-full w-full rounded-[1.2rem] overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center relative">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">
                      Change
                    </span>
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    form.setFieldValue("imageFile", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </div>
          </div>

          <FieldGroup className="space-y-4">
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel className="text-xs font-bold uppercase text-slate-500 tracking-tight">
                    Full Name
                  </FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                      placeholder="John Doe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            "Register"
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
