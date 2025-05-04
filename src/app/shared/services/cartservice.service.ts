// cartservice.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../models/types';

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'cartItems';
  private cartItems: CartItem[] = [];

  constructor() {
    const saved = localStorage.getItem(this.storageKey);
    this.cartItems = saved ? JSON.parse(saved) : [];
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  addToCart(product: Product): void {
    const existing = this.cartItems.find((p) => p.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  updateQuantity(productName: string, quantity: number): void {
    const item = this.cartItems.find((p) => p.name === productName);
    if (item) {
      item.quantity = quantity;
      if (item.quantity < 1) this.removeItem(productName);
      this.saveCart();
    }
  }

  removeItem(productName: string): void {
    this.cartItems = this.cartItems.filter((p) => p.name !== productName);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }
}
