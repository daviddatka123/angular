import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { FilterService } from './services/filter.service';
import { Product } from './models/product.model';
import { Category } from './models/category.model';
import { ProductFilter, DEFAULT_FILTER } from './models/filter.model';
import { HeaderComponent } from './components/header/header';
import { CategoryBarComponent } from './components/category-bar/category-bar';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar';
import { ProductListComponent } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoryBarComponent,
    FilterSidebarComponent,
    ProductListComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  filter: ProductFilter = { ...DEFAULT_FILTER };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
    this.productService.getAll().subscribe((data) => {
      this.allProducts = data;
      this.applyFilter();
    });

    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }

  onCategorySelected(id: number | 'all') {
    this.filter = { ...this.filter, categoryId: id };
    this.applyFilter();
  }

  onFilterChange(updated: ProductFilter) {
    this.filter = updated;
    this.applyFilter();
  }

  onReset() {
    this.filter = { ...DEFAULT_FILTER };
    this.filteredProducts = [...this.allProducts];
  }

  private applyFilter() {
    this.filteredProducts = this.filterService.apply(this.allProducts, this.filter);
  }
}
