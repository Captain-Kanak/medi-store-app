import { env } from "@/env";

export const medicineService = {
  getMedicines: async function () {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/medicines`);

      if (!res.ok) {
        throw new Error(`Failed to fetch medicines: ${res.statusText}`);
      }

      const data = await res.json();

      return data.data;
    } catch (error) {
      console.error("Medicine Service Error:", error);
      return [];
    }
  },
};
