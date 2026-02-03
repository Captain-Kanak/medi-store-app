import { env } from "@/env";

interface CartItem {
  medicineId: string;
  quantity: number;
}

const API_URL = env.NEXT_PUBLIC_API_URL;

export const cartService = {
  getCartItems: async function () {
    try {
      const res = await fetch(`${API_URL}/carts`);

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
        data: result,
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
  addToCart: async function (payload: CartItem) {
    try {
      const res = await fetch(`${API_URL}/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        data: result,
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
