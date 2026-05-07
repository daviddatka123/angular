import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  address: string;
  role: string;
  zipcode: string;
  avatar: string;
  gender: string;
  phone: string;
  verified: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly BASE_URL = 'https://api.everrest.educata.dev/auth';

  constructor(private http: HttpClient) {}

  signUp(payload: SignUpPayload): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/sign_up`, payload);
  }

  signIn(payload: SignInPayload): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(`${this.BASE_URL}/sign_in`, payload).pipe(
      tap(tokens => {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // JWT token-იდან მომხმარებლის მონაცემების წაკითხვა (API call-ის გარეშე)
  getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded as User;
    } catch {
      return null;
    }
  }

  // Verified მომხმარებლებისთვის API-დან
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}`);
  }

  updateUser(payload: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.BASE_URL}/update`, payload);
  }
}
