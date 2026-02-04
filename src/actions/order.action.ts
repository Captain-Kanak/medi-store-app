"use server";

import { OrderPayload, orderService } from "@/services/order.service";

export async function placeOrder(payload: OrderPayload) {
  return await orderService.createOrder(payload);
}
