import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ConfirmDialogComponent } from "./components/confirm-dialog.component";
import { SuccessDialogComponent } from "./components/success-dialog.component";
import { Router } from "@angular/router";

interface DateOption {
    value: string;
    label: string;
  }
  
  interface DurationOption {
    value: number;
    label: string;
  }
  
  @Component({
    selector: 'app-book-reservation',
    standalone: true,
    imports: [ CommonModule, ReactiveFormsModule, ConfirmDialogComponent, SuccessDialogComponent],
    templateUrl: './book-reservation.component.html',
    styleUrls: ['./book-reservation.component.scss']
  })
  export class BookReservationComponent {
    reservationForm: FormGroup;
    showConfirmDialog = signal(false);
    showSuccessDialog = signal(false);
  
    dateOptions = signal<DateOption[]>([
      { value: '1', label: 'Hoy' },
      { value: '2', label: 'Mañana' },
      { value: '3', label: 'En 2 días' },
      { value: '7', label: 'En una semana' }
    ]);
  
    durationOptions = signal<DurationOption[]>([
      { value: 7, label: '1 semana' },
      { value: 14, label: '2 semanas' },
      { value: 21, label: '3 semanas' }
    ]);
  
    constructor(
      private fb: FormBuilder,
      private router: Router
    ) {
      this.reservationForm = this.fb.group({
        reservationDate: ['', Validators.required],
        duration: ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (this.reservationForm.valid) {
        this.showConfirmDialog.set(true);
      }
    }
  
    onConfirm(confirmed: boolean) {
      this.showConfirmDialog.set(false);
      if (confirmed) {
        this.showSuccessDialog.set(true);
      }
    }
  
    onSuccessClose() {
      this.router.navigate(['/dashboard']);
    }
  
    onCancel() {
      this.router.navigate(['/dashboard']);
    }
  }
  