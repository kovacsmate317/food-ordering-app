import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/types';
import { CartService } from '../../shared/services/cartservice.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpicyPipe } from '../../shared/pipes/spicy.pipe';
import { RouterModule } from '@angular/router';
import { AddedToCartComponent } from '../dialogs/added-to-cart/added-to-cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    SpicyPipe,
    RouterModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  fullProduct?: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    if (this.product?.id) {
      const fetched = await this.productService.getProductById(this.product.id);
      if (fetched) {
        this.fullProduct = fetched;
      }
    }
  }

  addProduct() {
    if (this.fullProduct) {
      this.cartService.addToCart(this.fullProduct);
      this.dialog.open(AddedToCartComponent);
    }
  }
}
