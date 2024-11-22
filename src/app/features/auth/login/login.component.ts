// features/auth/pages/login/login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AlertService } from '@core/services/alert.service';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  template: `
    <div class="login-page">
      <!-- Logo and Navigation -->
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" routerLink="/">
            <img src="assets/images/book-icon.svg" alt="Epílogo" height="32">
            <span class="ms-2">Epilogo</span>
          </a>
          <ul class="nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/about">{{ 'nav.about' | translate }}</a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Login Form -->
      <div class="login-container container">
        <div class="card login-card">
          <!-- Logo -->
          <div class="text-center mb-4">
            <img src="assets/images/book-icon.svg" alt="Epílogo" class="login-logo">
          </div>

          <!-- Alert Messages -->
          <div *ngIf="alertMessage" class="alert" [ngClass]="alertClass" role="alert">
            {{ alertMessage | translate }}
          </div>

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Username -->
            <div class="form-group mb-3">
              <label for="username" class="form-label">{{ 'login.username' | translate }}</label>
              <input
                type="text"
                id="username"
                formControlName="username"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('username')"
                [placeholder]="'login.username_placeholder' | translate"
              >
              <div class="invalid-feedback" *ngIf="getErrorMessage('username') as error">
                {{ error | translate }}
              </div>
            </div>

            <!-- Password -->
            <div class="form-group mb-4">
              <label for="password" class="form-label">{{ 'login.password' | translate }}</label>
              <input
                type="password"
                id="password"
                formControlName="password"
                class="form-control"
                [class.is-invalid]="isFieldInvalid('password')"
                [placeholder]="'login.password_placeholder' | translate"
              >
              <div class="invalid-feedback" *ngIf="getErrorMessage('password') as error">
                {{ error | translate }}
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-primary w-100"
              [disabled]="loginForm.invalid || isLoading"
            >
              <span *ngIf="!isLoading">{{ 'login.submit' | translate }}</span>
              <div *ngIf="isLoading" class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>

            <!-- Register Link -->
            <div class="text-center mt-3">
              <p>{{ 'login.no_account' | translate }} 
                <a routerLink="/auth/register">{{ 'login.register_link' | translate }}</a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #F4F1EA;
    }

    .login-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem 1rem;
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      border: none;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .login-logo {
      width: 64px;
      height: 64px;
      margin-bottom: 1rem;
    }

    .form-control {
      padding: 0.75rem;
      border-radius: 0.5rem;
    }

    .form-control:focus {
      border-color: #6B87A5;
      box-shadow: 0 0 0 0.2rem rgba(107, 135, 165, 0.25);
    }

    .btn-primary {
      background-color: #6B87A5;
      border-color: #6B87A5;
      padding: 0.75rem;
      border-radius: 0.5rem;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #5a7390;
      border-color: #5a7390;
    }

    a {
      color: #6B87A5;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    FooterComponent
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  alertMessage = '';
  alertClass = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Clear any existing auth data
    this.authService.logout();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && control.touched;
  }

  getErrorMessage(field: string): string | null {
    const control = this.loginForm.get(field);
    if (control?.errors) {
      if (control.errors['required']) {
        return `login.errors.${field}_required`;
      }
      if (control.errors['minlength']) {
        return `login.errors.${field}_minlength`;
      }
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.alertMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: { role: string; }) => {
          if (response.role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (error: { status: number; }) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.alertMessage = 'login.errors.invalid_credentials';
            this.alertClass = 'alert-danger';
          } else if (error.status === 404) {
            this.alertMessage = 'login.errors.user_not_found';
            this.alertClass = 'alert-danger';
          } else {
            this.alertMessage = 'login.errors.generic_error';
            this.alertClass = 'alert-danger';
          }
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}