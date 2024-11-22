import { Component, OnInit } from '@angular/core';
import { BookService } from '@core/services/book.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookFormModalComponent } from './modals/book-form.modal';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css']
})
export class ManageBooksComponent implements OnInit {
  books: any[] = [];
  searchTerm = '';
  selectedCategory = 'all';
  isLoading = true;

  constructor(
    private bookService: BookService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  openBookModal(book?: any) {
    const modalRef = this.modalService.open(BookFormModalComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.book = book;

    modalRef.result.then((result) => {
      if (result) {
        if (book) {
          this.updateBook(book.id, result);
        } else {
          this.createBook(result);
        }
      }
    });
  }

  createBook(bookData: any) {
    this.bookService.createBook(bookData).subscribe({
      next: () => this.loadBooks()
    });
  }

  updateBook(id: number, bookData: any) {
    this.bookService.updateBook(id, bookData).subscribe({
      next: () => this.loadBooks()
    });
  }

  deleteBook(id: number) {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks()
      });
    }
  }

  get filteredBooks() {
    return this.books.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || 
        book.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}