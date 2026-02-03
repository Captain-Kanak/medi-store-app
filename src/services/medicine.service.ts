import { env } from "@/env";
import { ApiResponse, Medicine } from "@/types";

export interface GetMedicinesParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "price" | "name" | "createdAt" | "stock";
  sortOrder?: "asc" | "desc";
  categoryId?: string;
}

interface MedicineServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export const medicineService = {
  getMedicines: async function (
    params?: GetMedicinesParams,
    options?: MedicineServiceOptions,
  ): Promise<ApiResponse<Medicine[]>> {
    try {
      const url = new URL(`${API_URL}/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const res = await fetch(url.toString(), config);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          data: null,
          pagination: null,
          error: {
            message: errorData.message || `Server Error: ${res.status}`,
          },
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          data: null,
          pagination: null,
          error: { message: result.message },
        };
      }

      return {
        data: result.data,
        pagination: result.pagination,
        error: null,
      };
    } catch (error) {
      console.error("Medicine Service Error:", error);
      return {
        data: null,
        pagination: null,
        error: { message: "Failed to fetch medicines" },
      };
    }
  },
  getMedicineById: async function (id: string): Promise<ApiResponse<Medicine>> {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          data: null,
          pagination: null,
          error: {
            message: errorData.message || `Server Error: ${res.status}`,
          },
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          data: null,
          pagination: null,
          error: { message: result.message },
        };
      }

      return {
        data: result.data,
        pagination: null,
        error: null,
      };
    } catch (error) {
      console.error("Medicine Service Error:", error);
      return {
        data: null,
        pagination: null,
        error: { message: "Failed to fetch medicines" },
      };
    }
  },
};
