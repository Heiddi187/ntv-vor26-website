import { useCartStore } from '@/shared/store/appStore';
import { CartItemRow } from './components/CartItemRow';
import { CartSummary } from './components/CartSummary';

// type CartProps = {
//   items: CartItem[];
//   onQuantityChange?: (productId: string, quantity: number) => void;
//   onRemove?: (productId: string) => void;
// };
// removed { items, onQuantityChange, onRemove }: CartProps     -from Cart()
export function Cart() {
  //const { items } = useAppStore();
  const items = useCartStore((s) => s.items)
  //console.log(items.length) bætist ekki við í items.length
  console.log('Zustand items:', items)

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold">Cart</h2>
      {items.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <ul className="flex flex-col gap-4">
            {items.map((item) => (
              <li key={item.product.id}>
                <CartItemRow
                  item={item}
                  // onQuantityChange={onQuantityChange}
                  // onRemove={onRemove}
                />
              </li>
            ))}
          </ul>
          <aside>
            <CartSummary  />
          </aside>
        </div>
      )}
    </section>
  );
}
