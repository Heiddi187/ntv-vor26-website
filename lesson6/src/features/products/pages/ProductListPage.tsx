import { useProducts } from "@/features/products/hooks/useProducts";
import { useCart } from "@/features/cart/hooks/useCart";
import { ProductCard } from "@/features/products/components/ProductCard";

export function ProductListPage() {
  const { products, loading } = useProducts();
  const { addToCart } = useCart();

  if (loading) return <p>Loading products…</p>;

  return (
    <section>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addToCart}
          />
        ))}
      </div>
    </section>
  );
}
