import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../shared/models/types';
import { CartService } from '../../shared/services/cartservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddedToCartComponent } from '../../components/dialogs/added-to-cart/added-to-cart.component'; // Adjust the import path

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.product = this.getProductById(productId);
    }
  }

  getProductById(id: number): Product | undefined {
    const products: Product[] = [
      {
        id: 1,
        name: 'Spicy Chicken Burger',
        description: 'A hot and crispy chicken burger.',
        price: 7.99,
        spicyLevel: 3,
        image: 'products/burger.jpg',
        allergens: ['Gluten', 'Soy', 'Eggs'], // Example allergens
        ingredients: [
          'Chicken',
          'Lettuce',
          'Tomato',
          'Burger Bun',
          'Spicy Sauce',
        ], // Example ingredients
      },
      {
        id: 2,
        name: 'Cheesy Pizza',
        description: 'Loaded with mozzarella and cheddar.',
        price: 9.99,
        image: 'products/pizza.jpg',
        allergens: ['Gluten', 'Dairy'], // Example allergens
        ingredients: [
          'Flour',
          'Mozzarella',
          'Cheddar',
          'Tomato Sauce',
          'Oregano',
        ], // Example ingredients
      },
      {
        id: 3,
        name: 'BBQ Ribs',
        description: 'Tender ribs with BBQ sauce.',
        price: 12.99,
        image: 'products/bbqribs.jpg',
        allergens: ['Gluten', 'Soy'], // Example allergens
        ingredients: [
          'Pork Ribs',
          'BBQ Sauce',
          'Garlic',
          'Pepper',
          'Olive Oil',
        ], // Example ingredients
      },
      {
        id: 4,
        name: 'BBQ Ribs2',
        description:
          'Tender ribs with BBQ sauce. saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        price: 12.99,
        image: 'products/bbqribs.jpg',
        allergens: ['Gluten', 'Soy'], // Example allergens
        ingredients: [
          'Pork Ribs',
          'BBQ Sauce',
          'Garlic',
          'Pepper',
          'Olive Oil',
        ], // Example ingredients
      },
      {
        id: 5,
        name: 'BBQ Ribs3',
        description: 'Tender ribs with BBQ sauce.',
        price: 12.99,
        image: 'products/bbqribs.jpg',
        allergens: ['Gluten', 'Soy'], // Example allergens
        ingredients: [
          'Pork Ribs',
          'BBQ Sauce',
          'Garlic',
          'Pepper',
          'Olive Oil',
        ], // Example ingredients
      },
    ];

    return products.find((product) => product.id === id);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.dialog.open(AddedToCartComponent);
    }
  }
}
