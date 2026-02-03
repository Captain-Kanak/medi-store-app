import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.SERVER_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!result) {
        return { data: null, error: { message: "Session not found" } };
      }

      return { data: result, error: null };
    } catch (error) {
      console.error(error);

      return { data: null, error: { message: "Failed to get session" } };
    }
  },
};
