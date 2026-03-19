import type { Product } from "@/features";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/features";

export type CartState = {
   items: CartItem[];
   addToCart: (product: Product) => void;
   updateQuantity: (productId: string, quantity: number) => void;
   removeItem: (productId: string) => void;
   clearCart: () => void;
}

export const useCartStore = create<CartState>()(
   persist(
      (set) => ({
         items: [],

         addToCart: (product) =>
            set((state) => {
               const existing = state.items.find(
                  (i) => i.product.id === product.id,
               );

               if (existing) {
                  return {
                     items: state.items.map((i) =>
                        i.product.id === product.id
                           ? { ...i, quantity: i.quantity + 1 }
                           : i,
                     ),
                  };
               }

               return {
                  items: [...state.items, { product, quantity: 1 }],
               };
            }),

         updateQuantity: (productId, quantity) =>
            set((state) => ({
               items: state.items
                  .map((i) =>
                     i.product.id === productId ? { ...i, quantity } : i,
                  )
                  .filter((i) => i.quantity > 0),
            })),

         removeItem: (productId) =>
            set((state) => ({
               items: state.items.filter((i) => i.product.id !== productId),
            })),

         clearCart: () => set({ items: [] }),
      }),
      {
         name: "cart-storage", // 🔑 key in localStorage
      },
   ),
);
