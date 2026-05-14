import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) {}

  test(data: { name: string; email: string }) {
    return this.http.post('http://localhost:5678/webhook-test/add-to-cart', data);
  }


  addToCart(item: any, user: { name: string; email: string }) {
    return this.http.post('http://localhost:5678/webhook-test/add-to-cart', {
      item,
      ...user
    }).subscribe();
  }
}