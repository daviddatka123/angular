import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model'; // დარწმუნდი რომ გზა სწორია
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,],
  template: `
    <div class="products-grid">
      @for (item of products; track item.id) {
      } @empty {
        <p>ptoducts not found...</p>
      }
    </div>
  `,
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  @Input() products: Product[] = []; 
}