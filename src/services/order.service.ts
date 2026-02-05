import { env } from "@/env";
import { cookies } from "next/headers";

export interface OrderPayload {
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
  items: {
    quantity: number;
    medicineId: string;
  }[];
}

const API_URL = env.API_URL;

export const orderService = {
  getOrders: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to fetch orders" },
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
        error: { message: "Failed to fetch orders" },
      };
    }
  },
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
  updateOrderStatus: async function (orderId: string, status: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        return {
          data: null,
          error: { message: "Failed to update order status" },
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
        error: { message: "Failed to update order status" },
      };
    }
  },
};
