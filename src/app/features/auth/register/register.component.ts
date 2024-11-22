// features/auth/pages/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { CustomValidators } from '@shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  alertMessage = '';
  alertClass = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: CustomValidators.passwordMatchValidator
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(field: string): string | null {
    const control = this.registerForm.get(field);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return `register.errors.${field}_required`;
      }
      if (control.errors['minlength']) {
        return `register.errors.${field}_minlength`;
      }
      if (control.errors['email']) {
        return 'register.errors.email_invalid';
      }
      if (control.errors['passwordMismatch']) {
        return 'register.errors.passwords_not_match';
      }
      if (control.errors['hasNumber'] || 
          control.errors['hasCapitalCase'] || 
          control.errors['hasSmallCase']) {
        return 'register.errors.password_pattern';
      }
    }
    return null;
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.alertMessage = '';

      try {
        await this.authService.register(this.registerForm.value).toPromise();
        
        this.alertMessage = 'register.success';
        this.alertClass = 'alert-success';
        
        // Esperar 2 segundos antes de redirigir
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
        
      } catch (error: any) {
        this.isLoading = false;
        
        if (error.status === 409) {
          this.alertMessage = 'register.errors.email_exists';
          this.alertClass = 'alert-danger';
        } else {
          this.alertMessage = 'register.errors.generic_error';
          this.alertClass = 'alert-danger';
        }
      }
    } else {
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}