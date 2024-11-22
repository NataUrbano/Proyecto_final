// features/books/pages/book-detail/book-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@core/services/book.service';

enum BookAvailability {
  AVAILABLE = 'DISPONIBLE',
  LOW_STOCK = 'POCAS COPIAS DISPONIBLES',
  OUT_OF_STOCK = 'NO HAY COPIAS DISPONIBLES'
}

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: any = {};
  isLoading = true;
  reservationInProgress = false;
  BookAvailability = BookAvailability;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit() {
    const bookId = this.route.snapshot.params['id'];
    this.loadBookDetails(bookId);
  }

  loadBookDetails(id: string) {
    this.isLoading = true;
    this.bookService.getBookDetails(id).subscribe({
      next: (book) => {
        this.book = book;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading book:', error);
        this.isLoading = false;
      }
    });
  }

  getAvailabilityStatus(): BookAvailability {
    if (this.book.copiesAvailable === 0) {
      return BookAvailability.OUT_OF_STOCK;
    }
    if (this.book.copiesAvailable <= this.book.totalCopies * 0.2) {
      return BookAvailability.LOW_STOCK;
    }
    return BookAvailability.AVAILABLE;
  }

  getAvailabilityColor(): string {
    const status = this.getAvailabilityStatus();
    switch (status) {
      case BookAvailability.AVAILABLE:
        return '#88DA62'; // Verde
      case BookAvailability.LOW_STOCK:
        return '#FCAF3B'; // Amarillo
      case BookAvailability.OUT_OF_STOCK:
        return '#F04C4C'; // Rojo
      default:
        return '#666666';
    }
  }

  async onReserve() {
    if (!this.book.id || this.reservationInProgress) return;

    this.reservationInProgress = true;
    try {
      await this.bookService.reserveBook(this.book.id).toPromise();
      this.router.navigate(['/user/reservations']);
    } catch (error) {
      console.error('Error reserving book:', error);
    } finally {
      this.reservationInProgress = false;
    }
  }
}