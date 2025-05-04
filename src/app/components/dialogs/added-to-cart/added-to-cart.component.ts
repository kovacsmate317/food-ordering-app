import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-added-to-cart',
  imports: [MatDialogModule],
  templateUrl: './added-to-cart.component.html',
  styleUrl: './added-to-cart.component.scss',
})
export class AddedToCartComponent {
  constructor(private dialogRef: MatDialogRef<AddedToCartComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
