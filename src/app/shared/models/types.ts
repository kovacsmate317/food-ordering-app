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
