import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../types/types';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  products: Product[] = [
    {
      name: 'Spicy Chicken Burger',
      description: 'A hot and crispy chicken burger.',
      price: 7.99,
      spicyLevel: 3,
      image: 'products/burger.jpg',
    },
    {
      name: 'Cheesy Pizza',
      description: 'Loaded with mozzarella and cheddar.',
      price: 9.99,
      spicyLevel: 1,
      image: 'products/pizza.jpg',
    },
    {
      name: 'BBQ Ribs',
      description: 'Tender ribs with BBQ sauce.',
      price: 12.99,
      spicyLevel: 2,
      image: 'products/bbqribs.jpg',
    },
    {
      name: 'BBQ Ribs',
      description: 'Tender ribs with BBQ sauce.',
      price: 12.99,
      spicyLevel: 2,
      image: 'products/bbqribs.jpg',
    },
    {
      name: 'BBQ Ribs',
      description: 'Tender ribs with BBQ sauce.',
      price: 12.99,
      spicyLevel: 2,
      image: 'products/bbqribs.jpg',
    },
  ];

  handleAddToCart(product: any) {
    console.log('Added to cart:', product);
    // Add to cart logic or pass to a cart service here
  }
}
