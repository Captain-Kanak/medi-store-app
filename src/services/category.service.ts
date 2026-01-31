import { env } from "@/env";

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/categories`);
      const result = await res.json();

      if (!result.success) {
        return [];
      }

      return result.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
