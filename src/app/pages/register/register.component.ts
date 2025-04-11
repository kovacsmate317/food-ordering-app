import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // Form fields
  name = '';
  email = '';
  password = '';

  // Modal visibility state
  isModalVisible = false;

  // Open modal method
  openModal() {
    this.isModalVisible = true;
  }

  // Close modal method
  closeModal() {
    this.isModalVisible = false;
  }

  // Registration method
  onRegister() {
    if (this.name && this.email && this.password) {
      console.log('Registering:', this.name, this.email, this.password);
      // Logic to handle registration (e.g., API call)
      this.closeModal(); // Close the modal after successful registration
    } else {
      console.error('Please fill in all fields');
    }
  }
}
