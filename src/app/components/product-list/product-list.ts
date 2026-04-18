import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  
  filter = { categoryId: 0, search: '', spiciness: 0, noNuts: false, vegetarianOnly: false };

  ngOnInit() {
    this.productService.getAll().subscribe(data => {
      this.allProducts = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredProducts = this.allProducts.filter(p => {
      const categoryMatch = this.filter.categoryId === 0 || p.categoryId === this.filter.categoryId;
      const nutsMatch = !this.filter.noNuts || p.nuts === false;
      const vegMatch = !this.filter.vegetarianOnly || p.vegetarian === true;
      const spiceMatch = this.filter.spiciness === 0 || p.spiciness === this.filter.spiciness;
      return categoryMatch && nutsMatch && vegMatch && spiceMatch;
    });
  }
}