"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const authGoogle = searchParams.get("auth_google");

    if (authGoogle === "true") {
      toast.success("Welcome! Successfully logged in with Google.", {
        description: "You now have full access to Medi Store.",
      });

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("auth_google");
      const newPath =
        window.location.pathname +
        (newParams.toString() ? `?${newParams.toString()}` : "");

      router.replace(newPath);
    }
  }, [searchParams, router]);

  return null;
}

export function AuthToastListener() {
  return (
    <Suspense fallback={null}>
      <ToastHandler />
    </Suspense>
  );
}
