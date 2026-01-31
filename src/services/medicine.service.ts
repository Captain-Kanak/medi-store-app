import { env } from "@/env";
import { ApiResponse, Medicine } from "@/types";

export const medicineService = {
  getMedicines: async function (): Promise<ApiResponse<Medicine[]>> {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/medicines`, {
        cache: "no-store",
      });

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
