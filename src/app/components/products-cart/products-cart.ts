import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; // დარწმუნდი, რომ გზა სწორია

@Component({
  selector: 'app-products-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products-cart.html',
  styleUrl: './products-cart.css'
})
export class ProductsCartComponent {
  constructor(public cartService: CartService) {}


  increase(item: any) {
    this.cartService.addToCart(item);
  }


  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
}