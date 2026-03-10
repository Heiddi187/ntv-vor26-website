import type { Product } from "@/features/products/product";

export type CartItem = {
  product: Product;
  quantity: number;
};
