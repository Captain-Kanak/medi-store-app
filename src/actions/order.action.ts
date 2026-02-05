"use server";

import { OrderPayload, orderService } from "@/services/order.service";

export async function placeOrder(payload: OrderPayload) {
  return await orderService.createOrder(payload);
}

export async function updateOrderStatus(orderId: string, status: string) {
  return await orderService.updateOrderStatus(orderId, status);
}
