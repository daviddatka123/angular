import { Component, Input, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToolsService } from '../../services/tools.service'; // ✅ დამატებული

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() product!: any;
  private cartService = inject(CartService);
  private tools = inject(ToolsService); // ✅ დამატებული

  onAddToCart() {
    const name = prompt('Enter name');
    const email = prompt('Enter email');

    if (!name || !email) return;

    this.tools.addToCart(this.product, { name, email }); // ✅ დამატებული
    this.cartService.addToCart(this.product.id, this.product.price);
  }
}