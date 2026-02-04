import { create } from "zustand";
import { Medicine } from "@/types";
import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from "@/actions/cart.action";

interface CartItem {
  medicineId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  initializeCart: () => Promise<void>;
  addItem: (medicine: Medicine, qty: number) => Promise<void>;
  updateQuantity: (medicineId: string, qty: number) => Promise<void>;
  removeItem: (medicineId: string) => Promise<void>;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,

  initializeCart: async () => {
    set({ isLoading: true });
    try {
      const { data } = await getCartItems();
      if (data) {
        const formattedItems = data.map((item: any) => ({
          medicineId: item.medicineId,
          quantity: item.quantity,
          name: item.medicine.name,
          price: item.medicine.price,
          image: item.medicine.image,
          stock: item.medicine.stock,
        }));
        set({ items: formattedItems });
      }
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (medicine, qty) => {
    const previousItems = get().items;
    const existing = previousItems.find((i) => i.medicineId === medicine.id);

    if (existing) {
      set({
        items: previousItems.map((i) =>
          i.medicineId === medicine.id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        ),
      });
    } else {
      set({
        items: [
          ...previousItems,
          {
            medicineId: medicine.id,
            name: medicine.name,
            price: medicine.price,
            image: medicine.image,
            quantity: qty,
            stock: medicine.stock,
          },
        ],
      });
    }

    const { data, error } = await addToCart({
      medicineId: medicine.id,
      quantity: qty,
    });

    if (error) {
      set({ items: previousItems });
    } else {
      get().initializeCart();
    }
  },

  updateQuantity: async (medicineId, qty) => {
    const previousItems = get().items;

    set({
      items: previousItems.map((item) =>
        item.medicineId === medicineId ? { ...item, quantity: qty } : item,
      ),
    });

    const { error } = await updateCartItem({ medicineId, quantity: qty });
    if (error) {
      set({ items: previousItems });
    }
  },

  removeItem: async (medicineId) => {
    const previousItems = get().items;
    set({ items: previousItems.filter((i) => i.medicineId !== medicineId) });

    const { error } = await deleteCartItem(medicineId);
    if (error) set({ items: previousItems });
  },

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    return get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  },
}));
