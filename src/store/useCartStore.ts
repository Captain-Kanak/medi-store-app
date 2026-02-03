import { create } from "zustand";
import { Medicine } from "@/types";
import { cartService } from "@/services/cart.service";

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
  addItem: (product: Medicine, qty: number) => Promise<void>;
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
      const { data } = await cartService.getCartItems();
      if (data?.success) {
        const formattedItems = data.data.map((item: any) => ({
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

  addItem: async (product, qty) => {
    const previousItems = get().items;
    const existing = previousItems.find((i) => i.medicineId === product.id);

    if (existing) {
      set({
        items: previousItems.map((i) =>
          i.medicineId === product.id
            ? { ...i, quantity: i.quantity + qty }
            : i,
        ),
      });
    } else {
      set({
        items: [
          ...previousItems,
          {
            medicineId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: qty,
            stock: product.stock,
          },
        ],
      });
    }

    const { data, error } = await cartService.addToCart({
      medicineId: product.id,
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

    const { error } = await cartService.updateCartItem(medicineId, qty);
    if (error) {
      set({ items: previousItems });
    }
  },

  removeItem: async (medicineId) => {
    const previousItems = get().items;
    set({ items: previousItems.filter((i) => i.medicineId !== medicineId) });

    const { error } = await cartService.deleteCartItem(medicineId);
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
