import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductFilter } from './models/filter.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { CategoryBarComponent } from './components/category-bar/category-bar';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar';
import { ProductCardComponent } from './components/product-card/product-card';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductsCartComponent } from './components/products-cart/products-cart';


@Component({
  selector: 'app-root',
  standalone: true, // აუცილებელია თანამედროვე Angular-ისთვის
  imports: [CommonModule, RouterOutlet, HeaderComponent, CategoryBarComponent, FilterSidebarComponent, ProductListComponent,], // დაამატე HeaderComponent, CategoryBar და ა.შ.
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private router = inject(Router);

  filter = signal<ProductFilter>({
    categoryId: null, // 'all'-ის ნაცვლად null
    search: '',
    spiciness: 0,
    noNuts: false,
    vegetarianOnly: false
  });

  categories = signal<any[]>([]);
  products = signal<any[]>([]);

  // ავტომატურად გაფილტრული პროდუქტები
  filteredProducts = computed(() => {
    const currentFilter = this.filter();
    return this.products().filter(product => {
      const categoryMatch = !currentFilter.categoryId || product.categoryId === currentFilter.categoryId;
      const spicinessMatch = product.spiciness >= currentFilter.spiciness!;
      const nutsMatch = !currentFilter.noNuts || !product.nuts;
      const vegMatch = !currentFilter.vegetarianOnly || product.vegetarian;
      return categoryMatch && spicinessMatch && nutsMatch && vegMatch;
    });
  });

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => this.categories.set(data));
    this.productService.getAll().subscribe(data => this.products.set(data));
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  onCategorySelected(id: number | null) {
  this.filter.update(f => ({ ...f, categoryId: id }));
}

  onFilterChange(updatedFilter: ProductFilter) {
    this.filter.set(updatedFilter);
  }

  onReset() {
    this.filter.set({
      categoryId: null,
      search: '',
      spiciness: 0,
      noNuts: false,
      vegetarianOnly: false
    });
  }
}