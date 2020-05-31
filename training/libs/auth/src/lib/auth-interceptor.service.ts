import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  errorHandler = { 401: () => this.router.navigate(['/unauthorized']) };

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    if (!!token) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              this.errorHandler[err.status]();
              break;
          }
          return throwError(err);
        }
      })
    );
  }
}
