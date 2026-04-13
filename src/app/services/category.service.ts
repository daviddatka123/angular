import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly BASE_URL = 'https://restaurant.stepprojects.ge/api/Categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}/GetAll`);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.BASE_URL}/GetCategory/${id}`);
  }
}
