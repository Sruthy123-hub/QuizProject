import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      return true; 
    } else if (refreshToken) {
    
      return this.authService.refreshToken().pipe(
        map((newAccessToken: string) => {
          if (newAccessToken) {
            return true; 
          } else {
            this.router.navigate(['/login']); 
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/login']); 
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}