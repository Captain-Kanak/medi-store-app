import { env } from "@/env";
import { cookies } from "next/headers";

export interface ProfileUpdatePayload {
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
}

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const result = await res.json();

      if (!result) {
        return {
          data: null,
          error: { message: "Session not found" },
        };
      }

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to get session" },
      };
    }
  },
  getUsersMetrics: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/users/metrics`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to get user metrics" },
        };
      }

      const result = await res.json();

      if (!result) {
        return {
          data: null,
          error: { message: "Session not found" },
        };
      }

      return {
        data: result.data,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to get user metrics" },
      };
    }
  },
  updateProfile: async function (profileData: ProfileUpdatePayload) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(profileData),
        credentials: "include",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update profile" },
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          data: null,
          error: { message: result.message },
        };
      }

      return {
        data: result,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to update profile" },
      };
    }
  },
};
