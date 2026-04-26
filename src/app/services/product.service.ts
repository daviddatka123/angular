import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly BASE_URL = 'https://restaurant.stepprojects.ge/api/Products';

  constructor(private http: HttpClient) {}

  getAll(filter?: ProductFilter): Observable<Product[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.categoryId) params = params.set('categoryId', filter.categoryId);
      if (filter.search)     params = params.set('search', filter.search);
      if (filter.spiciness)  params = params.set('spiciness', filter.spiciness);
      if (filter.noNuts)     params = params.set('noNuts', filter.noNuts);
      if (filter.vegetarianOnly) params = params.set('vegetarianOnly', filter.vegetarianOnly);
    }

    return this.http.get<Product[]>(`${this.BASE_URL}/GetAll`, { params });
  }
}
