import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly API_URL = 'https://restaurant.stepprojects.ge/api/Baskets';
  cartItems = signal<any[]>([]);

  totalPrice = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  constructor(private http: HttpClient) { this.loadCart(); }

  loadCart() {
    this.http.get<any[]>(`${this.API_URL}/GetAll`).subscribe(items => this.cartItems.set(items));
  }

  addToCart(productId: number, price: number) {
    this.http.post(`${this.API_URL}/AddToBasket`, { quantity: 1, price, productId })
      .subscribe(() => this.loadCart());
  }

  increaseQuantity(item: any) {
    this.http.put(`${this.API_URL}/UpdateQuantity/${item.id}`, {
      quantity: item.quantity + 1,
      price: item.price,
      productId: item.product.id
    }).subscribe(() => this.loadCart());
  }

  decreaseQuantity(item: any) {
    if (item.quantity <= 1) {
      this.removeFromCart(item.product.id);
      return;
    }
    this.http.put(`${this.API_URL}/UpdateQuantity/${item.id}`, {
      quantity: item.quantity - 1,
      price: item.price,
      productId: item.product.id
    }).subscribe(() => this.loadCart());
  }

  removeFromCart(productId: number) {
    this.http.delete(`${this.API_URL}/DeleteProduct/${productId}`)
      .subscribe(() => this.loadCart());
  }
}