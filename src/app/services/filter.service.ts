import { Injectable, signal } from '@angular/core';
import { ProductFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private initialFilter: ProductFilter = {
    categoryId: null,
    search: '',
    spiciness: 0,
    noNuts: false,
    vegetarianOnly: false
  };

  
  filter = signal<ProductFilter>(this.initialFilter);

  updateFilter(newFilter: Partial<ProductFilter>) {
    this.filter.update(current => ({ ...current, ...newFilter }));
  }

  resetFilter() {
    this.filter.set(this.initialFilter);
  }
}