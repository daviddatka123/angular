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
  @Input() selectedId: number | 'all' = 'all';
  @Output() categorySelected = new EventEmitter<number | 'all'>();

  select(id: number | 'all') {
    this.categorySelected.emit(id);
  }
}
