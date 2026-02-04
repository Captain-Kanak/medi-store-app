"use server";

import { CartItem, cartService } from "@/services/cart.service";

export async function getCartItems() {
  return await cartService.getCartItems();
}

export async function addToCart(payload: CartItem) {
  return await cartService.addToCart(payload);
}

export async function updateCartItem(payload: CartItem) {
  return await cartService.updateCartItem(payload);
}

export async function deleteCartItem(medicineId: string) {
  return await cartService.deleteCartItem(medicineId);
}
