import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(payload: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  getUser() {
    return this.userSubject.value;
  }
  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        if (response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
        }
      }),
      map(response => response.accessToken) // ✅ Ensures the return type is `string`
    );
  }

  logout() {
    localStorage.clear(); // Clear all stored session data
    sessionStorage.clear(); // Clear any session-related storage
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Ensure fresh login state
    });
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }
}
