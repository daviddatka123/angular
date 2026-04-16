import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<any[]>([]);
  private http = inject(HttpClient);
  private readonly API_BASE = 'https://restaurant.stepprojects.ge/api/Baskets';

  

  // ავტომატურად დათვლილი ჯამი
  totalPrice = computed(() => {
    return this.items().reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  });

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.http.get<any[]>(`${this.API_BASE}/GetAll`).subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  addToCart(product: Product) {
    const existing = this.items().find(i => i.product.id === product.id);
    
    
    const url = existing ? `${this.API_BASE}/UpdateBasket` : `${this.API_BASE}/AddToBasket`;
    const method = existing ? 'PUT' : 'POST';
    
    const body = {
      productId: product.id,
      quantity: existing ? existing.quantity + 1 : 1
    };

    this.http.request(method, url, { body }).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Cart update error:', err)
    });
  }


  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      return;
    }

  }
}