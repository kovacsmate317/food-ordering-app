import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    if (form.invalid) return;

    console.log('Login submitted:', form.value);
  }

  getErrorMessage(form: NgForm): string {
    const email = this.email.trim();
    const password = this.password.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (form.controls['email']?.invalid && this.submitted) {
      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
      }
    }

    if (form.controls['password']?.invalid && this.submitted) {
      return 'Password is required.';
    }

    return '';
  }
}
