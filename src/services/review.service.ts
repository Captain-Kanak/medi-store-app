import { env } from "@/env";
import { cookies } from "next/headers";

export interface Review {
  rating: number;
  comment: string;
  medicineId: string;
}

export const reviewService = {
  createReview: async (payload: Review) => {
    try {
      const cookieStore = await cookies();
      const url = env.API_URL;

      const res = await fetch(`${url}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
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
