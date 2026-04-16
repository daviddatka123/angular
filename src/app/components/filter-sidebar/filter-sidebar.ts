import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFilter } from '../../models/filter.model';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebarComponent {
  @Input() filter: ProductFilter = {
    categoryId: 'number',
    search: '',
    spiciness: 0,
    noNuts: false,
    vegetarianOnly: false
  };

  @Output() filterChange = new EventEmitter<ProductFilter>();
  @Output() reset = new EventEmitter<void>();

  onChange() {
    this.filterChange.emit({ ...this.filter });
  }

  onReset() {
    this.reset.emit();
}
