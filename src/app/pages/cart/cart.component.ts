import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CartService,
  CartItem,
} from '../../shared/services/cartservice.service';
import { Order } from '../../shared/models/types';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  email: string = 'user123@email.com';
  deliveryAddress: string = '123 Main St, City, Country';
  order: Order | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCart();

    this.authService.isLoggedIn().subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  loadCart() {
    this.cart = this.cartService.getCartItems();
  }

  getTotal(): string {
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return total.toFixed(2);
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.name, item.quantity + 1);
    this.loadCart();
  }

  decreaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.name, item.quantity - 1);
    this.loadCart();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.name);
    this.loadCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
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
    this.cartService.clearCart();
    this.loadCart();
  }
}
