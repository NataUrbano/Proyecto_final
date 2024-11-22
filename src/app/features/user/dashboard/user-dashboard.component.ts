// features/user/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';
import { CategoryService } from '@core/services/category.service';
import { BookService } from '@core/services/book.service';
import { TranslateService } from '@ngx-translate/core';

interface Category {
  id: number;
  name: string;
  image: string;
  bookCount: number;
}

interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  available: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = false;
  userName = '';
  searchQuery = '';
  categories: Category[] = [];
  recentBooks: Book[] = [];
  isLoading = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private categoryService: CategoryService,
    private bookService: BookService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.loadUserInfo();
    this.loadCategories();
    this.loadRecentBooks();
  }

  loadUserInfo() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.userName = `${user.firstName} ${user.lastName}`;
      },
      error: (error) => {
        console.error('Error loading user info:', error);
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.isLoading = false;
      }
    });
  }

  loadRecentBooks() {
    this.bookService.getRecentBooks().subscribe({
      next: (books) => {
        this.recentBooks = books;
      },
      error: (error) => {
        console.error('Error loading recent books:', error);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/user/search'], {
        queryParams: { q: this.searchQuery }
      });
    }
  }

  navigateToCategory(category: Category) {
    this.router.navigate(['/user/category', category.id]);
  }

  reserveBook(book: Book) {
    if (book.available) {
      this.router.navigate(['/user/book', book.id, 'reserve']);
    }
  }

  // Método para manejar errores de carga de imágenes
  handleImageError(event: any, type: 'category' | 'book') {
    event.target.src = type === 'category' 
      ? 'assets/images/placeholder-category.jpg'
      : 'assets/images/placeholder-book.jpg';
  }
}