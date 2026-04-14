// TODO: Make this component generic over the item type.
// When a consumer writes <SelectableList items={products} onSelect={(p) => ...} />,
// the `p` parameter in onSelect should be inferred as the Product type — not `any`.
// `renderItem` should also receive the correctly typed item.
// `selected` should be typed as T | null.

// items = T[]
// item = T

type SelectableListProps<T> = {
   items: T[];
   selected: T | null;
   onSelect: (item: T) => void;
   renderItem: (item: T) => React.ReactNode;
   className?: string;
};

function SelectableList<T>(props: SelectableListProps<T>) {
   const { items, renderItem, onSelect, selected, className } = props;
   return (
      <ul className={`divide-y ${className || ""}`}>
         {items.map((item, index) => (
            <li
               key={index}
               onClick={() => onSelect(item)}
               className={`cursor-pointer p-2 hover:bg-gray-100 ${
                  selected === item ? "bg-blue-50" : ""
               }`}
            >
               {renderItem(item)}
            </li>
         ))}
      </ul>
   );
}

type Product = {
  id: number;
  name: string;
};

const products: Product[] = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' },
];

const selectedProduct: Product | null = null;

<SelectableList
   items={products}
   selected={selectedProduct}
   onSelect={(p) => {
      p;
   }}
   renderItem={(p) => <div>{p.name}</div>}
/>;

// orginal //
// function SelectableList({ items, renderItem, onSelect, selected, className }: any) {
//   return (
//     <ul className={`divide-y ${className || ''}`}>
//       {items.map((item: any, index: number) => (
//         <li
//           key={index}
//           onClick={() => onSelect(item)}
//           className={`cursor-pointer p-2 hover:bg-gray-100 ${
//             selected === item ? 'bg-blue-50' : ''
//           }`}
//         >
//           {renderItem(item)}
//         </li>
//       ))}
//     </ul>
//   );
// }

export { SelectableList };
