import { useState, useEffect } from "react";
import { fetchProducts } from "@/features/products/services/productService.js";
import type { Product } from "@/shared/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}
