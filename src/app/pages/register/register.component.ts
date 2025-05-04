import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../shared/models/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.invalid || this.password !== this.confirmPassword) {
      const newUser: User = {
        email: this.email,
        password: this.password,
        role: 'customer',
        address: '',
      };

      console.log('User registered:', newUser);
    }

    console.log('Form submitted: (value): ', form.value); //debug
  }

  getErrorMessage(form: NgForm): string {
    const email = this.email.trim();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.controls['email']?.invalid && this.submitted) {
      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
      }
    }

    if (form.controls['password']?.invalid && this.submitted) {
      return 'Password fields cannot be empty.';
    }

    if (this.password !== this.confirmPassword && this.submitted) {
      return 'Passwords do not match.';
    }

    return '';
  }
}
