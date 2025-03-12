import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup;
  isLoading = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    
  
  }
  ngOnInit() {
    // Reset form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  
    // Clear stored session on login page load (prevents stale login states)
    this.clearSessionData();
  }
  
  clearSessionData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('image');
  }
  onLogin() {
    
    if (this.loginForm.valid) {
      this.isLoading = true; 

      const payload = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(payload).subscribe({
        next: (response: any) => {
          this.isLoading = false; 

          if (response.accessToken) {
            const { accessToken, refreshToken, id, username, email, image } = response;

           
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', id.toString());
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('image', image);

           
            this.messageService.add({
              severity: 'success',
              summary: 'Login Successful',
              detail: `Welcome, ${username}!`,
              life: 2000
            });

           
             setTimeout(() => {
              this.router.navigate(['/dashboard']);
                 }, 2000);
          } else {
            
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning',
              detail: response.message || 'Login failed.',
              life: 2000
            });
          }
        },
        error: () => {
          this.isLoading = false; 
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: `Invalid credentials. Please try again.`,
            life: 2000
          });
        }
      });
    } else {
     
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: `Please fill in all required fields.`,
        life: 2000
      });
    }
  }


}