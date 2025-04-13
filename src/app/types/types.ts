export interface Product {
  name: string;
  description: string;
  price: number;
  spicyLevel: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
