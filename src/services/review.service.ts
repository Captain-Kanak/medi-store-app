import { env } from "@/env";
import { cookies } from "next/headers";

export interface Review {
  rating: number;
  comment: string;
  medicineId: string;
}

const API_URL = env.API_URL;

export const reviewService = {
  createReview: async (payload: Review) => {
    try {
      const cookieStore = await cookies();
      const cookieHeader = cookieStore.toString();

      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to create review" },
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
      console.error("Error creating review:", error);

      return {
        data: null,
        error: { message: "Failed to create review" },
      };
    }
  },
};
