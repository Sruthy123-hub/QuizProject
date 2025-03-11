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
  loginForm: FormGroup;
  isLoading = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    debugger
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

           
            this.router.navigate(['/dashboard']);
          } else {
            this.showError(response.message || 'Login failed.');
          }
        },
        error: () => {
          this.isLoading = false; 
          this.showError('Invalid credentials. Please try again.');
        }
      });
    } else {
      this.showError('Please fill in all required fields.');
    }
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life: 2000
    });
  }
}