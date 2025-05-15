import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../shared/models/types';
import { CartService } from '../../shared/services/cartservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddedToCartComponent } from '../../components/dialogs/added-to-cart/added-to-cart.component';
import { ProductService } from '../../shared/services/product.service';
import { AuthService } from '../../shared/services/auth.service';
import { take } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  showAddForm = false;

  newProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    image: '',
  };

  isManagerOrAdmin = false;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.checkUserRole();
  }

  private loadProducts() {
    this.productService
      .getAllproducts()
      .pipe(take(1))
      .subscribe((products) => {
        this.products = products;
      });
  }

  private async checkUserRole() {
    const user = await firstValueFrom(this.authService.currentUser);

    if (user) {
      const userData = await this.userService.getUserById(user.uid);
      console.log(userData);
      if (
        userData &&
        (userData.role === 'admin' || userData.role === 'manager')
      ) {
        this.isManagerOrAdmin = true;
      }
    }
  }

  handleAddToCart(product: Product) {
    this.cartService.addToCart(product);
    this.dialog.open(AddedToCartComponent);
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  async addProduct() {
    if (
      !this.newProduct.name ||
      !this.newProduct.description ||
      !this.newProduct.price ||
      !this.newProduct.image
    ) {
      return;
    }

    const created = await this.productService.addProduct(
      this.newProduct as Product
    );
    this.products.push(created);
    this.newProduct = { name: '', description: '', price: 0, image: '' };
    this.showAddForm = false;
  }

  async deleteProduct(id: string) {
    await this.productService.deleteProduct(id);
    this.products = this.products.filter((p) => p.id !== id);
  }
}
