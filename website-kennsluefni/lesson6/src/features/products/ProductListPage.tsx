import { useProducts } from "@/features/products/useProducts";
import { useCart } from "@/features/cart/useCart";
import { ProductCard } from "@/features/products/ProductCard";

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
