import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-bar.html',
  styleUrl: './category-bar.css',
})
export class CategoryBarComponent {
  @Input() categories: Category[] = [];
  @Input() selectedId: number | null = null;
  @Output() categorySelected = new EventEmitter<number | null>();

  select(id: number | 'all') {
    const value = id === 'all' ? null : id;
    this.categorySelected.emit(value);
  } 
}