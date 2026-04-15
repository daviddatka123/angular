import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private readonly API_BASE = 'https://restaurant.stepprojects.ge/api';

  items = signal<any[]>([]);

  constructor() {
    this.loadCart();
  }

  loadCart() {
    this.http.get<any[]>(`${this.API_BASE}/Baskets/GetAll`).subscribe({
      next: (data) => this.items.set(data),
      error: (err) => console.error('Error loading cart:', err)
    });
  }

  addToCart(product: any) {
    const currentItems = this.items();
    const existing = currentItems.find(i => 
      (i.product?.id ?? i.productId) === product.id
    );
    const url = existing 
      ? `${this.API_BASE}/Baskets/UpdateBasket` 
      : `${this.API_BASE}/Baskets/AddToBasket`;

    const method = existing ? 'PUT' : 'POST';
    const body = {
      productId: product.id,
      quantity: existing ? existing.quantity + 1 : 1
    };

    this.http.request(method, url, { body }).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });
  }

  // დაამატეთ ეს ფუნქცია
  removeFromCart(productId: number) {
    this.http.delete(`${this.API_BASE}/Baskets/DeleteByProductId/${productId}`).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });
  }

  // დაამატეთ ეს ფუნქცია
  getTotalPrice(): number {
    return this.items().reduce((total, item) => {
      const price = item.product?.price || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  }
}