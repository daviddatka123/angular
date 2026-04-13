import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<any[]>([]);

  addToCart(product: any) {
    const currentItems = this.items();
    const existingItem = currentItems.find(i => i.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
      this.items.set([...currentItems]);
    } else {
      this.items.set([...currentItems, { ...product, quantity: 1 }]);
    }
    console.log('Cart updated:', this.items());
  }
}