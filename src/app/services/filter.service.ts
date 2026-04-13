import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductFilter } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class FilterService {
  apply(products: Product[], filter: ProductFilter): Product[] {
    return products.filter((p) => {
      const categoryMatch =
        filter.categoryId === 'all' || p.categoryId === filter.categoryId;
      const spicinessMatch =
        filter.spiciness === 0 || p.spiciness <= filter.spiciness;
      const nutsMatch = !filter.noNuts || p.nuts === false;
      const vegMatch =
        !filter.vegetarianOnly || p.vegetarian === true;

      return categoryMatch && spicinessMatch && nutsMatch && vegMatch;
    });
  }
}
