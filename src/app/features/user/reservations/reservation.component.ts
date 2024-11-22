// features/books/pages/reservation/reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from '@core/services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationConfirmComponent } from './modals/reservation-confirm.modal';
import { ReservationSuccessComponent } from './modals/reservation-success.modal';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  book: any;
  isLoading = true;

  // Opciones para duración de reserva
  durationOptions = [
    { value: '7', label: '1 semana' },
    { value: '14', label: '2 semanas' },
    { value: '21', label: '3 semanas' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private modalService: NgbModal
  ) {
    this.reservationForm = this.fb.group({
      reservationDate: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const bookId = this.route.snapshot.params['id'];
    this.loadBookDetails(bookId);
    this.setMinMaxDates();
  }

  loadBookDetails(id: string) {
    this.isLoading = true;
    this.bookService.getBookDetails(id).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/user/books']);
      }
    });
  }

  setMinMaxDates() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    this.reservationForm.get('reservationDate')?.setValidators([
      Validators.required,
      (control) => {
        const date = new Date(control.value);
        return date >= today && date <= maxDate ? null : { dateRange: true };
      }
    ]);
  }

  async onSubmit() {
    if (this.reservationForm.valid) {
      const confirmModal = this.modalService.open(ReservationConfirmComponent, {
        centered: true,
        backdrop: 'static'
      });

      try {
        const result = await confirmModal.result;
        if (result === 'confirm') {
          const reservationData = {
            bookId: this.book.id,
            ...this.reservationForm.value
          };

          await this.bookService.createReservation(reservationData).toPromise();
          
          const successModal = this.modalService.open(ReservationSuccessComponent, {
            centered: true,
            backdrop: 'static'
          });

          await successModal.result;
          this.router.navigate(['/user/profile']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      } catch (error) {
        console.error('Error en la reserva:', error);
      }
    }
  }
}