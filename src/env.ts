import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    API_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_AUTH_URL: z.string(),
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_IMGBB_API_KEY: z.string(),
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_IMGBB_API_KEY: process.env.NEXT_PUBLIC_IMGBB_API_KEY,
  },
});
