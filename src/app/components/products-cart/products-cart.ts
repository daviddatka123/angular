import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-cart.html', // დარწმუნდი რომ ფაილს ზუსტად ასე ჰქვია
  styleUrl: './products-cart.css'
})
export class ProductsCartComponent {
  public cartService = inject(CartService);

  // ფუნქციის სახელი ემთხვევა HTML-ს
  onRemove(id: number) {
    this.cartService.removeFromCart(id);
  }
}