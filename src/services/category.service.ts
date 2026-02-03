import { env } from "@/env";
import { Category } from "@/types";

export interface CategoryApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getCategories: async function (): Promise<CategoryApiResponse<Category[]>> {
    try {
      const res = await fetch(`${API_URL}/categories`);

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch categories" },
        };
      }

      const result = await res.json();

      if (!result.success) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result.data, error: null };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to fetch categories" },
      };
    }
  },
};
