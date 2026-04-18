import { Routes } from '@angular/router';
import { ProductsCartComponent } from './components/products-cart/products-cart';

export const routes: Routes = [
  // ... სხვა როუტები
  { path: 'cart', component: ProductsCartComponent }
];