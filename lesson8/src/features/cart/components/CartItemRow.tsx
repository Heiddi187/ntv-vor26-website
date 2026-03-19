// import { Card, CardContent } from '@/shared/components/ui/card';
// import { Input } from '@/shared/components/ui/input';
// import { Label } from '@/shared/components/ui/label';
import type { CartItem } from "../types";
import { useCartStore } from "@/shared/store/appStore";

type Props = {
   item: CartItem;
};

// type CartItemRowProps = {
//   item: CartItemType;
//   onQuantityChange?: (productId: string, quantity: number) => void;
//   onRemove?: (productId: string) => void;
// };

//export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
export function CartItemRow({ item }: Props) {
   // const { product, quantity } = item;
   // const subtotal = product.price * quantity;
   const updateQuantity = useCartStore((s) => s.updateQuantity);
   const removeItem = useCartStore((s) => s.removeItem);

   return (
      <div className="flex items-center justify-between">
         <p>{item.product.name}</p>

         <div>
            <button
               onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
               }
            >
               -
            </button>

            <span>{item.quantity}</span>

            <button
               onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
               }
            >
               +
            </button>

            <button onClick={() => removeItem(item.product.id)}>Remove</button>
         </div>
      </div>
   );

   // return (
   //   <Card>
   //     <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
   //       <div className="min-w-0 flex-1">
   //         <p className="font-medium">{product.name}</p>
   //         <p className="text-muted-foreground text-sm">
   //           {new Intl.NumberFormat('is-IS', {
   //             style: 'currency',
   //             currency: 'ISK',
   //           }).format(product.price)}{' '}
   //           each
   //         </p>
   //       </div>
   //       <div className="flex items-center gap-3">
   //         {onQuantityChange && (
   //           <div className="flex items-center gap-2">
   //             <Label htmlFor={`qty-${product.id}`} className="text-muted-foreground text-sm">
   //               Qty
   //             </Label>
   //             <Input
   //               id={`qty-${product.id}`}
   //               type="number"
   //               min={1}
   //               value={quantity}
   //               onChange={(e) => {
   //                 const v = parseInt(e.target.value, 10);
   //                 if (!Number.isNaN(v) && v >= 1) onQuantityChange(product.id, v);
   //               }}
   //               className="h-8 w-16"
   //             />
   //           </div>
   //         )}
   //         <p className="font-medium">
   //           {new Intl.NumberFormat('is-IS', {
   //             style: 'currency',
   //             currency: 'ISK',
   //           }).format(subtotal)}
   //         </p>
   //         {onRemove && (
   //           <button
   //             type="button"
   //             onClick={() => onRemove(product.id)}
   //             className="text-muted-foreground hover:text-foreground text-sm underline"
   //           >
   //             Remove
   //           </button>
   //         )}
   //       </div>
   //     </CardContent>
   //   </Card>
   // );
}
