import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Toolsservice } from './toolsservice';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public AllProducts: any[] = [];
  public filteredProducts: any[] = [];
  public AllCategories: any[] = [];
  public selectedId: any = 'all';
  public spiciness: number = 0;
  public noNuts: boolean = false;
  public vegetarianOnly: boolean = false;

  constructor(public tools: Toolsservice) {}


  ngOnInit() {
    this.allCards();
    this.allCategoriesFunc();
  }

  allCards() {
    this.tools.getAllProducts().subscribe((data: any) => {
      this.AllProducts = data;
      this.applyFilters();
    });
  }

  allCategoriesFunc() {
    this.tools.getCategories().subscribe((data: any) => {
      this.AllCategories = data;
    });
  }

  filterCategories(id: any) {
    this.selectedId = id;
    this.applyFilters();
  }

  applyFilters() {
    if (!this.AllProducts || this.AllProducts.length === 0) {
      return;
    }

    this.filteredProducts = this.AllProducts.filter((p: any) => {
      const categoryMatch = this.selectedId === 'all' || p.categoryId === this.selectedId;
      const spicinessMatch = this.spiciness === 0 || p.spiciness <= this.spiciness;
      const nutsMatch = !this.noNuts || p.nuts === false;
      const vegMatch = !this.vegetarianOnly || p.vegetarian === true || p.vegetarian === 1;

      return categoryMatch && spicinessMatch && nutsMatch && vegMatch;
    });
  }

  resetFilters() {
    this.spiciness = 0;
    this.noNuts = false;
    this.vegetarianOnly = false;
    this.selectedId = 'all';
    this.filteredProducts = [...this.AllProducts];
  }
}