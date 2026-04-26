import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-cart.html',
  styleUrl: './products-cart.css'
})
export class ProductsCartComponent {
  public cartService = inject(CartService);

  trackById(index: number, item: any): number {
    return item.id ?? index;
  }

  onIncrease(item: any) {
    this.cartService.increaseQuantity(item);
  }

  onDecrease(item: any) {
    this.cartService.decreaseQuantity(item);
  }

  onRemove(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}