import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;

  constructor(private authService: AuthService, private router: Router,) {
    // this.user = this.authService.getUser();
  }

  goToAssesment1()
  {
    this.router.navigate(['/assesment1']);
  }
}
