import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Medicine } from "@/types";
import { cartService } from "@/services/cart.service";

interface CartItem extends Medicine {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Medicine, qty: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, qty) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + qty }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: qty }] });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),
      updateQuantity: (id, qty) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i,
          ),
        }),
      clearCart: () => set({ items: [] }),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    { name: "medistore-cart" },
  ),
);
