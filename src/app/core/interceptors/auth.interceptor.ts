import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SERVER_URL } from '../tokens/server-url.token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const serverUrl = inject(SERVER_URL, { optional: true });
  
  let token = null;
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  let modifiedReq = req;
  if (token && !req.headers.has('Authorization')) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  if (!isPlatformBrowser(platformId) && serverUrl && modifiedReq.url.startsWith('/api/')) {
    modifiedReq = modifiedReq.clone({
      url: `${serverUrl}${modifiedReq.url}`
    });
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (isPlatformBrowser(platformId)) {
          localStorage.removeItem('token');
          // Do not redirect if we are on the verification page
          const isVerificationPage = window.location.pathname.toLowerCase().includes('/certificates/verification');
          if (!isVerificationPage) {
            router.navigate(['/login']);
          }
        }
      }
      return throwError(() => error);
    })
  );
};
