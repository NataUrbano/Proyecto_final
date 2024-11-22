import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@core/services/book.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery = '';
  searchResults: any[] = [];
  isLoading = false;
  private searchSubject = new Subject<string>();
  
  // Filtros
  filters = {
    genre: '',
    availability: 'all'
  };

  // Ordenamiento
  sortOptions = [
    { value: 'relevance', label: 'search.sort.relevance' },
    { value: 'title', label: 'search.sort.title' },
    { value: 'author', label: 'search.sort.author' }
  ];
  currentSort = 'relevance';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.performSearch(this.searchQuery);
      }
    });
  }

  onSearchInput(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
      queryParamsHandling: 'merge'
    });
    this.searchSubject.next(query);
  }

  performSearch(query: string) {
    if (!query.trim()) return;

    this.isLoading = true;
    this.bookService.searchBooks({
      query,
      ...this.filters,
      sort: this.currentSort
    }).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilter() {
    this.performSearch(this.searchQuery);
  }

  updateSort(sort: string) {
    this.currentSort = sort;
    this.performSearch(this.searchQuery);
  }

  navigateToBookDetail(bookId: string) {
    this.router.navigate(['/user/book', bookId]);
  }
}