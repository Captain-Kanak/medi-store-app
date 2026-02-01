import { env } from "@/env";
import { ApiResponse, Medicine } from "@/types";

interface GetMedicinesParams {
  search?: string;
  page?: number;
  limit?: number;
  price?: number;
  sortBy?: string;
  sortOrder?: string;
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

      const data = await res.json();

      if (!data.success) {
        return { data: null, error: { message: data.message } };
      }

      return { data: data.data, error: null };
    } catch (error) {
      console.error("Medicine Service Error:", error);
      return { data: null, error: { message: "Failed to fetch medicines" } };
    }
  },
};
