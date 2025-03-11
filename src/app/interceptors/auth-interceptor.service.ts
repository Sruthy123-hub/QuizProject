import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('accessToken'); 

    let clonedReq = req;

    if (accessToken) {
      clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // If unauthorized, try refreshing the token
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              // Retry the request with the new token
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(newRequest);
            }),
            catchError(() => {
              // If refreshing fails, log the user out
              this.authService.logout();
              return throwError(() => new Error('Session expired. Please login again.'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}

