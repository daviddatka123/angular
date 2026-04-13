import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() product!: any;

  constructor(private cartService: CartService) {}

  onAddToCart() {
    console.log('Adding to cart:', this.product);
    this.cartService.addToCart(this.product);
  }
}