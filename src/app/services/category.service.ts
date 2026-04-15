import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'https://restaurant.stepprojects.ge/api/Categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/GetAll`);
  }
getCategories() {
  return this.http.get<any[]>(this.apiUrl);
}

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/GetCategory/${id}`);
  }
}
