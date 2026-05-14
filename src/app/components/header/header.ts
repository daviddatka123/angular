import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  name = '';  
  email = '';

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private tools: ToolsService
  ) {}

  test() {
    this.tools
      .test({
        name: this.name,
        email: this.email,
      })
      .subscribe();
  }
}