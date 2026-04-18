import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css'
})
export class FilterSidebarComponent {
  // საწყისი მნიშვნელობა გასწორებულია 0-ზე
  @Input() filter: any = { 
    categoryId: 0, 
    search: '', 
    spiciness: 0, 
    noNuts: false, 
    vegetarianOnly: false 
  };
  
  @Output() filterChange = new EventEmitter<any>();

  onChange() {
    this.filterChange.emit({ ...this.filter });
  }

  onReset() {
    this.filter = { categoryId: 0, search: '', spiciness: 0, noNuts: false, vegetarianOnly: false };
    this.onChange();
  }
}
