import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../shared/models/types';
import { CartService } from '../../shared/services/cartservice.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AddedToCartComponent } from '../../components/dialogs/added-to-cart/added-to-cart.component'; // Adjust the import path
import { ProductService } from '../../shared/services/product.service';

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
    private dialog: MatDialog,
    private productService: ProductService
  ) {}

  async ngOnInit(): Promise<void> {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      const data = await this.productService.getProductById(productId);
      if (data) {
        this.product = data;
      }
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.dialog.open(AddedToCartComponent);
    }
  }
}
