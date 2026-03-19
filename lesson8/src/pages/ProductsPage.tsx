// import { Products } from '@/features/products';
// //import { useCart } from '@/features/cart/context/CartContext';
// import { useAppStore } from '@/shared/store/appStore';

// export function ProductsPage() {
//   // const { addToCart } = useCart();
//   const addToCart = useAppStore((s) => s.addToCart)
//   return <Products onAddToCart={addToCart} />;
// }

import { useCartStore } from "@/shared/store/appStore";

const addToCart = useCartStore((s) => s.addToCart);

<button onClick={() => addToCart(product)}>
  Add To Cart
</button>