import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../shared/models/types';
import { CartService } from '../../shared/services/cartservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddedToCartComponent } from '../../components/dialogs/added-to-cart/added-to-cart.component';

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

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.dialog.open(AddedToCartComponent);
  }
}
