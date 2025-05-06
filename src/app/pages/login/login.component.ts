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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.email.invalid) {
      this.errorMessage = 'Invalid email';
    }
    if (this.password.invalid) {
      this.errorMessage = 'Invalid password';
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    //this.showLoginForm = false;
    this.errorMessage = '';

    this.authService
      .signIn(emailValue, passwordValue)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.isLoading = false;
        //this.showLoginForm = true;

        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = 'No account found with this email address';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-credential':
            this.errorMessage = 'Invalid email or password';
            break;
          default:
            this.errorMessage =
              'Authentication failed. Please try again later.';
        }
      });
  }
}
