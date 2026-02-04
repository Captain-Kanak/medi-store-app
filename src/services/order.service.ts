import { env } from "@/env";
import { cookies } from "next/headers";

interface OrderPayload {
  shippingAddress: string;
  paymentMethod: string;
  items: {
    quantity: number;
    price: number;
    medicineId: string;
  }[];
}

const API_URL = env.API_URL;

export const orderService = {
  createOrder: async function (payload: OrderPayload) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/orders`, {
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
          error: { message: "Failed to create order" },
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
      console.error("Order Service Error:", error);

      return {
        data: null,
        error: { message: "Failed to create order" },
      };
    }
  },
};
