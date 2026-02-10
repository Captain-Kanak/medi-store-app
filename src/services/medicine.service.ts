import { env } from "@/env";
import { ApiResponse, Medicine } from "@/types";
import { cookies } from "next/headers";

export interface GetMedicinesParams {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "price" | "name" | "createdAt" | "stock";
  sortOrder?: "asc" | "desc";
  categoryId?: string;
}

export interface GetSellerMedicinesParams {
  page?: number;
  limit?: number;
}

interface MedicineServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface UpdateMedicineData {
  price?: number;
  stock?: number;
  description?: string;
  image?: string;
  expiryDate?: Date;
}

export interface CreateMedicineData {
  name: string;
  brand: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  dosage: string;
  expiryDate: Date;
  categoryId: string;
}

const API_URL = env.API_URL;

export const medicineService = {
  addMedicine: async (payload: CreateMedicineData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to add medicine" },
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
      console.error("Medicine Service Error:", error);

      return {
        data: null,
        error: { message: "Failed to add medicine" },
      };
    }
  },
  getMedicines: async function (
    params?: GetMedicinesParams,
    options?: MedicineServiceOptions,
  ): Promise<ApiResponse<Medicine[]>> {
    try {
      const url = new URL(`${API_URL}/api/medicines`);

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
        return {
          data: null,
          pagination: null,
          error: { message: "Failed to fetch medicines" },
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
  getSellerMedicines: async function (
    params?: GetSellerMedicinesParams,
  ): Promise<ApiResponse<Medicine[]>> {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/medicines/seller`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          pagination: null,
          error: { message: "Failed to fetch medicines" },
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
      const res = await fetch(`${API_URL}/api/medicines/${id}`);

      if (!res.ok) {
        return {
          data: null,
          pagination: null,
          error: { message: "Failed to fetch medicine" },
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
        error: { message: "Failed to fetch medicine" },
      };
    }
  },
  updateMedicineById: async function (id: string, data: UpdateMedicineData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update medicine" },
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
      console.error("Medicine Service Error:", error);

      return {
        data: null,
        error: { message: "Failed to update medicine" },
      };
    }
  },
  deleteMedicineById: async function (id: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/medicines/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
      });

      if (!res.ok) {
        return {
          data: null,
          success: false,
          error: { message: "Failed to delete medicine" },
        };
      }

      const result = await res.json();

      if (!result.success) {
        return {
          data: null,
          success: false,
          error: { message: result.message },
        };
      }

      return {
        success: true,
        data: result.data,
        error: null,
      };
    } catch (error) {
      console.error("Medicine Service Error:", error);

      return {
        success: false,
        error: { message: "Failed to delete medicine" },
      };
    }
  },
};
