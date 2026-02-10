import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  // baseURL: AUTH_URL,
});
