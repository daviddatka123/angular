import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ProductFilter } from '../../models/filter.model';
import { CategoryBarComponent } from '../category-bar/category-bar';
import { FilterSidebarComponent } from '../filter-sidebar/filter-sidebar';
import { ProductListComponent } from '../product-list/product-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CategoryBarComponent, FilterSidebarComponent, ProductListComponent],
  templateUrl: './home.html',
})

export class HomeComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  filter = signal<ProductFilter>({
    categoryId: null, search: '', spiciness: 0, noNuts: false, vegetarianOnly: false
  });

  categories = signal<any[]>([]);
  products = signal<any[]>([]); 

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => this.categories.set(data));
    this.loadProducts(); 
  }

  loadProducts() {
    this.productService.getAll(this.filter())  // ✅ filter params-ს გადასცემს
      .subscribe(data => this.products.set(data));
  }

  onCategorySelected(id: number | null) {
    this.filter.update(f => ({ ...f, categoryId: id }));
    this.loadProducts(); 
  }

  onFilterChange(updatedFilter: ProductFilter) {
    this.filter.set(updatedFilter);
    this.loadProducts(); 
  }

  onReset() {
    this.filter.set({ categoryId: null, search: '', spiciness: 0, noNuts: false, vegetarianOnly: false });
    this.loadProducts(); 
  }
}