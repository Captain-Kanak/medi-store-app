"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { authClient } from "@/lib/auth-client";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const initializeCart = useCartStore((state) => state.initializeCart);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user) {
      initializeCart();
    }
  }, [session, initializeCart]);

  return <>{children}</>;
}
