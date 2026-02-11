import { env } from "@/env";
import { Category } from "@/types";
import { cookies } from "next/headers";

export interface CategoryApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
  success?: boolean;
}

const API_URL = env.API_URL;

export const categoryService = {
  getCategories: async function (): Promise<CategoryApiResponse<Category[]>> {
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch categories" },
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
        data: result.data,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to fetch categories" },
      };
    }
  },
  addCategory: async function (
    name: string,
    description?: string,
  ): Promise<CategoryApiResponse<Category>> {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to add category" },
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
        success: true,
        data: result.data,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        data: null,
        error: { message: "Failed to add category" },
      };
    }
  },
  updateCategoryById: async function (
    id: string,
    name: string,
    description?: string,
  ) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update category" },
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
        success: true,
        data: result.data,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to update category" },
      };
    }
  },
  deleteCategory: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to delete category" },
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
        success: true,
        data: result.data,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Failed to delete category" },
      };
    }
  },
};
