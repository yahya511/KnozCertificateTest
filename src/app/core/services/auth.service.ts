import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, AuthResponse, UserInfo } from '../models/auth';
import { LanguageService } from './language-service';
import { Language } from '../mock/dictionary';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private languageService = inject(LanguageService);

  public isAuthenticated = signal<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUserInfo(): UserInfo | null {
    if (isPlatformBrowser(this.platformId)) {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        try {
          return JSON.parse(storedUserInfo) as UserInfo;
        } catch(e) {}
      }
    }
    return null;
  }

  getUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      const userInfo = this.getUserInfo();
      if (userInfo && userInfo.fullName) return userInfo.fullName;

      const token = localStorage.getItem('token');
      if (token) {
        try {
          const base64Url = token.split('.')[1];
          if (base64Url) {
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            return payload['FullName'] ||
                   payload['fullName'] ||
                   payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] ||
                   payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 
                   payload.name || 
                   payload.unique_name || 
                   payload.sub || 
                   'Admin';
          }
        } catch (e) {
          // ignore
        }
      }
      return localStorage.getItem('username') || 'Admin';
    }
    return 'Admin';
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
            localStorage.setItem('username', payload.usernameOrEmail);
            
            if (response.record.userInfo) {
              localStorage.setItem('userInfo', JSON.stringify(response.record.userInfo));
              
              if (response.record.userInfo.preference?.languageCode) {
                 const lang = response.record.userInfo.preference.languageCode.toLowerCase() as Language;
                 if (lang === 'en' || lang === 'ar') {
                    this.languageService.setLanguage(lang);
                 }
              }
            }
          }
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userInfo');
    }
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }
}
