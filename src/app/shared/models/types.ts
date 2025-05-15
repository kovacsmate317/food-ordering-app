export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  spicyLevel?: number;
  image: string;
  allergens?: string[];
  ingredients?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'customer';
  address: Address;
  orders: Order[];
}

export interface Order {
  id: string;
  email: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed' | 'canceled';
  orderDate: string;
  deliveryAddress: Address;
}

export interface Address {
  town: string;
  street: string;
  number: string;
  level?: string;
  door?: string;
  ring?: string;
  countyCode?: string;
}
