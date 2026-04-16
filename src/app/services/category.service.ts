import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = 'https://restaurant.stepprojects.ge/api/Categories';

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/GetAll`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/GetCategory/${id}`);
  }
}