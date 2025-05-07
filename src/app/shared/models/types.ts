export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  spicyLevel?: number;
  image: string;
  allergens?: string[];
  ingredients?: string[];
  category?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'customer';
  address: string;
}

export interface Order {
  id: string;
  email: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed' | 'canceled';
  orderDate: string;
  deliveryAddress: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
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
