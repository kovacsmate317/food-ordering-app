import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  confirmPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  errorMessage: string = '';
  isLoading: boolean = false;
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.email.invalid) {
      this.errorMessage = 'Invalid email';
    }
    if (this.password.invalid) {
      this.errorMessage = 'Invalid password';
    }
    if (this.confirmPassword.value !== this.password.value) {
      this.errorMessage = 'Passwords not matching';
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.errorMessage = '';

    this.authService
      .register(emailValue, passwordValue)
      .then((userCredential) => {
        console.log('Register successful:', userCredential.user);
        this.successMessage = 'Register successful!';
      })
      .catch((error) => {
        console.error('Register error:', error);

        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage =
              'An account already exists with this email address.';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'The email address is not valid.';
            break;
          case 'auth/operation-not-allowed':
            this.errorMessage = 'Email/password accounts are not enabled.';
            break;
          case 'auth/weak-password':
            this.errorMessage = 'Password must be at least 6 characters.';
            break;
          default:
            this.errorMessage = 'Registration failed. Please try again later.';
        }
      })
      .finally(() => {
        this.isLoading = false;
        setTimeout(() => {
          this.successMessage = '';
        }, 5500);
      });
  }
}
