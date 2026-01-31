import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (!session) {
        return { data: null, error: { message: "Session not found" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error(error);

      return { data: null, error: { message: "Failed to get session" } };
    }
  },
};
