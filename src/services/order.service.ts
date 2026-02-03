import { env } from "@/env";

interface OrderPayload {
  shippingAddress: string;
  paymentMethod: string;
  items: {
    quantity: number;
    price: number;
    medicineId: string;
  }[];
}

export const orderService = {
  createOrder: async (payload: OrderPayload) => {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/orders`, {
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
