import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
  submitted = false; // Track if the form has been submitted

  onSubmit(form: NgForm) {
    this.submitted = true; // Mark as submitted when button is clicked

    if (form.invalid || this.password !== this.confirmPassword) return;

    // Proceed with form submission logic
    console.log('Form submitted:', form.value);
  }

  getErrorMessage(form: NgForm): string {
    const email = this.email.trim();
    const password = this.password.trim();
    const confirmPassword = this.confirmPassword.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is valid using regex
    if (form.controls['email']?.invalid && this.submitted) {
      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address.';
      }
    }

    // Check if password fields are empty
    if (form.controls['password']?.invalid && this.submitted) {
      return 'Password fields cannot be empty.';
    }

    // Check if passwords match
    if (this.password !== this.confirmPassword && this.submitted) {
      return 'Passwords do not match.';
    }

    return '';
  }
}
