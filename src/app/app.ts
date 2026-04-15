import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductFilter } from './models/filter.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  // ფილტრის საწყისი ობიექტი
  filter: ProductFilter = {
    categoryId: 'all',
    search: ''
  };

  categories: any[] = [];
  products: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  // კატეგორიების წამოღება სერვისიდან
  loadCategories() {
    this.categoryService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

  
  loadProducts() {
    this.productService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }


  onCategorySelected(id: number | 'all') {
    this.filter.categoryId = id;
    console.log('Selected Category ID:', id);
  }
}