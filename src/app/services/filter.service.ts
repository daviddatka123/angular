import { Injectable } from '@angular/core';
import { ProductFilter } from '../models/filter.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private initialFilter: ProductFilter = {
    categoryId: 'all',
    search: '',
    spiciness: undefined,
    noNuts: false,
    vegetarianOnly: false
  };


  private filterSubject = new BehaviorSubject<ProductFilter>(this.initialFilter);
  

  filter$ = this.filterSubject.asObservable();

  constructor() { }

  updateFilter(newFilter: Partial<ProductFilter>) {
    const currentFilter = this.filterSubject.value;
    this.filterSubject.next({ ...currentFilter, ...newFilter });
  }

  resetFilter() {
    this.filterSubject.next(this.initialFilter);
  }

  
  getCurrentFilterValue(): ProductFilter {
    return this.filterSubject.value;
  }
}