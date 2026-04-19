import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProductsCartComponent } from './components/products-cart/products-cart';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: ProductsCartComponent }
];