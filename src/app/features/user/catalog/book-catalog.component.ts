// features/user/pages/catalog/book-catalog.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@core/services/book.service';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-book-catalog',
  templateUrl: './book-catalog.component.html',
  styleUrls: ['./book-catalog.component.css']
})
export class BookCatalogComponent implements OnInit {
  categoryId: string = '';
  categoryName: string = '';
  books: any[] = [];
  isLoading = true;
  currentPage = 1;
  itemsPerPage = 12;
  totalBooks = 0;
  bannerImage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.loadCategory();
      this.loadBooks();
    });
  }

  loadCategory() {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category) => {
        this.categoryName = category.name;
        this.bannerImage = category.bannerImage;
      },
      error: (error) => console.error('Error loading category:', error)
    });
  }

  loadBooks() {
    this.isLoading = true;
    this.bookService.getBooksByCategory(this.categoryId, {
      page: this.currentPage,
      limit: this.itemsPerPage
    }).subscribe({
      next: (response) => {
        this.books = response.books;
        this.totalBooks = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadBooks();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToBookDetail(bookId: string) {
    this.router.navigate(['/user/book', bookId]);
  }
}