import { Component, OnInit } from '@angular/core';
import { Address, Order } from '../../shared/models/types';
import { UserService } from '../../shared/services/user.service';
import { NgFor, NgIf, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, CurrencyPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  email: string = '';
  address: Address = { town: '', street: '', number: '' };
  orders: Order[] = [];

  isLoading = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading = true;
    this.error = null;

    this.userService.getUserProfile().subscribe({
      next: (data) => {
        console.log('User profile data:', data);
        if (!data.user) {
          this.error = 'Not logged in';
          this.isLoading = false;
          return;
        }
        this.email = data.user.email || '';
        this.address = data.user.address || {
          town: '',
          street: '',
          number: '',
        };
        this.orders = data.orders || [];
        console.log('Orders loaded:', this.orders);
        this.isLoading = false;
      },

      error: (err) => {
        this.error = 'Failed to load user data';
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
