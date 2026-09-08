import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  let modifiedReq = req;
  if (token && !req.headers.has('Authorization')) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        // Do not redirect if we are on the verification page
        const isVerificationPage = window.location.pathname.toLowerCase().includes('/certificates/verification');
        if (!isVerificationPage) {
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
