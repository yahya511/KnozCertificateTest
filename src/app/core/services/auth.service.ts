import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  public isAuthenticated = signal<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  login(credentials: Partial<LoginRequest>): Observable<AuthResponse> {
    const payload: LoginRequest = {
      usernameOrEmail: credentials.usernameOrEmail || '',
      password: credentials.password || '',
      appType: 0
    };

    return this.http.post<AuthResponse>('https://knoz-api.knoz.online/api/Auth/login', payload).pipe(
      tap(response => {
        if (response.status && response.record?.token) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.record.token);
          }
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
