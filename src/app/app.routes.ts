import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { ProductsCartComponent } from './components/products-cart/products-cart';
import { RegisterComponent } from './components/auth/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: ProductsCartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'profile', component: ProfileComponent },
];