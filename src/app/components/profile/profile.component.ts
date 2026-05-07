import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = false;
  error = '';

  editMode = false;
  editForm!: FormGroup;
  saving = false;
  saveError = '';
  saveSuccess = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/sign-in']);
      return;
    }
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    // Note: getUserFromToken reads static data. 
    // If you have a 'getUserInfo' API call, use that instead for real-time data.
    const user = this.authService.getUserFromToken();

    if (user) {
      this.user = user;
      this.buildEditForm(user);
      this.loading = false;
    } else {
      this.error = 'Session expired. Please sign in again.';
      this.loading = false;
      this.router.navigate(['/sign-in']);
    }
  }

  buildEditForm(user: User): void {
    this.editForm = this.fb.group({
      firstName: [user.firstName, [Validators.required]],
      lastName:  [user.lastName, [Validators.required]],
      age:       [user.age, [Validators.required, Validators.min(1)]],
      gender:    [user.gender || 'MALE'],
      address:   [user.address],
      // We keep these in the form for the UI, but we won't send them to the API
      phone:     [user.phone],
      zipcode:   [user.zipcode],
    });
  }

  startEdit(): void {
    this.editMode = true;
    this.saveError = '';
    this.saveSuccess = false;
  }

  cancelEdit(): void {
    this.editMode = false;
    if (this.user) this.buildEditForm(this.user);
  }

  onSave(): void {
    if (this.editForm.invalid) return;

    this.saving = true;
    this.saveError = '';
    this.saveSuccess = false;

    // 1. Destructure to remove 'phone' and 'zipcode' from the API request
    const { firstName, lastName, age, gender, address } = this.editForm.value;
    const payload = { 
      firstName, 
      lastName, 
      age: Number(age), 
      gender, 
      address 
    };

    this.authService.updateUser(payload).subscribe({
      next: (updatedUser) => {
        // 2. Update the local UI state
        this.user = updatedUser;
        this.buildEditForm(updatedUser);
        
        this.saving = false;
        this.saveSuccess = true;

        setTimeout(() => {
          this.saveSuccess = false;
          this.editMode = false;
          // Tip: Because the Token is still old, a manual re-login 
          // might be needed to see changes globally.
        }, 2000);
      },
      error: (err) => {
        this.saving = false;

        // Handle Token Expiry
        if (err.status === 400 && err.error?.errorKeys?.includes('errors.token_expired')) {
          alert('Your session has expired. Please log in again.');
          this.router.navigate(['/sign-in']);
          return;
        }

        this.saveError = err?.error?.message || 'Failed to update profile.';
      }
    });
  }
}