import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../types/types';

interface CartItem {
  name: string;
  description: string;
  price: number;
  spicyLevel: number;
  image: string;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: CartItem[] = [];
  email: string = 'user123@email.com';
  deliveryAddress: string = '123 Main St, City, Country';
  order: Order | null = null;

  constructor() {
    const initialItems = [
      {
        name: 'Spicy Chicken Burger',
        description: 'A hot and crispy chicken burger.',
        price: 7.99,
        spicyLevel: 3,
        image: 'products/burger.jpg',
      },
      {
        name: 'Cheesy Pizza',
        description: 'Loaded with mozzarella and cheddar.',
        price: 9.99,
        spicyLevel: 1,
        image: 'products/pizza.jpg',
      },
      {
        name: 'Cheesy Pizza',
        description: 'Loaded with mozzarella and cheddar.',
        price: 9.99,
        spicyLevel: 1,
        image: 'products/pizza.jpg',
      },
    ];

    this.cart = this.groupItems(initialItems);
  }

  groupItems(items: Omit<CartItem, 'quantity'>[]): CartItem[] {
    const grouped: Record<string, CartItem> = {};

    items.forEach((item) => {
      const key = item.name;
      if (!grouped[key]) {
        grouped[key] = { ...item, quantity: 1 };
      } else {
        grouped[key].quantity++;
      }
    });

    return Object.values(grouped);
  }

  getTotal(): string {
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter((i) => i.name !== item.name);
  }

  placeOrder() {
    const totalAmount = parseFloat(this.getTotal());
    const newOrder: Order = {
      id: `order-${new Date().getTime()}`,
      email: this.email,
      items: this.cart,
      totalAmount,
      status: 'pending',
      orderDate: new Date().toISOString(),
      deliveryAddress: this.deliveryAddress,
      paymentStatus: 'pending',
    };
    this.order = newOrder;
    console.log('Order placed:', this.order);
  }
}
