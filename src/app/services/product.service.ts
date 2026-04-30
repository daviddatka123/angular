import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      if (filter.spiciness)  params = params.set('spiciness', filter.spiciness);
      if (filter.noNuts)     params = params.set('noNuts', 'true');
      if (filter.vegetarianOnly) params = params.set('vegetarianOnly', 'true');
    }

    return this.http.get<Product[]>(`${this.BASE_URL}/GetAll`, { params }).pipe(
      map(products => this.applyFilter(products, filter))
    );
  }

  private applyFilter(products: Product[], filter?: ProductFilter): Product[] {
    if (!filter) return products;

    return products.filter(p => {
      if (filter.categoryId && p.categoryId !== filter.categoryId) return false;
      if (filter.spiciness && p.spiciness < filter.spiciness) return false;
      if (filter.noNuts && p.nuts) return false;
      if (filter.vegetarianOnly && !p.vegetarian) return false;
      return true;
    });
  }
}