import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    // this.http.get('https://dummyjson.com/auth/me').subscribe({
    //   next: (response: any) => this.user = response,
    //   error: () => console.log('Failed to fetch user details')
    // });
  }
  logout() {
    this.authService.logout();
  }
}
