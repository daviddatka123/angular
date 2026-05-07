import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  apiError = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      age:       [null, [Validators.required, Validators.min(18)]],
      email:     ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(8)]],
      address:   ['', Validators.required],
      phone:     ['', Validators.required],
      zipcode:   ['', Validators.required],
      gender:    ['', Validators.required],
    });
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.apiError = '';
    this.successMsg = '';

    // Generate avatar using dicebear based on user's name
    const seed = this.form.value.firstName + this.form.value.lastName;
    const avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}`;

    const payload = { ...this.form.value, avatar, age: Number(this.form.value.age) };

    this.authService.signUp(payload).subscribe({
      next: (user) => {
        this.loading = false;
        this.successMsg = `Welcome, ${user.firstName}! Registration successful. Please verify your email.`;
        setTimeout(() => this.router.navigate(['/sign-in']), 2500);
      },
      error: (err) => {
        this.loading = false;
        this.apiError = err?.error?.message || 'Something went wrong. Please try again.';
      }
    });
  }
}
