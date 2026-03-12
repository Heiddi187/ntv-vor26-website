export type CartItem = {
  product: Product;
  quantity: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
};
