import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  CartService,
  CartItem,
} from '../../shared/services/cartservice.service';
import { Address, Order } from '../../shared/models/types';
import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';
import { UserService } from '../../shared/services/user.service'; // <-- import UserService
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  email: string = '';
  deliveryAddress: Address = {
    town: '',
    street: '',
    number: '',
  };
  order: Order | null = null;
  isLoggedIn: boolean = false;
  isLoading = false;
  errorMsg = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCart();

    this.authService.isLoggedIn().subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.email = user.email || '';

        this.userService.getUserProfile().subscribe((profile) => {
          if (profile.user?.address) {
            this.deliveryAddress = { ...profile.user.address };
          }
        });
      }
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

  async placeOrder() {
    this.isLoading = true;
    this.errorMsg = '';
    console.log('placeOrder clicked');

    if (!this.email) {
      this.errorMsg = 'User email missing; cannot place order';
      this.isLoading = false;
      return;
    }

    try {
      const user = await firstValueFrom(this.authService.currentUser);
      if (!user) {
        this.errorMsg = 'User not logged in';
        this.isLoading = false;
        return;
      }

      const userId = user.uid;
      const totalAmount = parseFloat(this.getTotal());
      const newOrder: Omit<Order, 'id'> = {
        email: this.email,
        items: this.cart,
        totalAmount,
        status: 'pending',
        orderDate: new Date().toISOString(),
        deliveryAddress: this.deliveryAddress,
      };

      const createdOrder = await this.orderService.createOrder(
        newOrder,
        userId
      );
      this.order = createdOrder;
      console.log('Order placed:', this.order);

      this.cartService.clearCart();
      this.loadCart();
    } catch (error) {
      console.error('Failed to place order:', error);
      this.errorMsg = 'Failed to place order: ' + (error as Error).message;
    } finally {
      this.isLoading = false;
    }
  }
}
