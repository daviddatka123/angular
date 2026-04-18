import { Component, Input, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() product!: any;
  private cartService = inject(CartService);

  onAddToCart() {
    this.cartService.addToCart(this.product.id, this.product.price);
  }
}