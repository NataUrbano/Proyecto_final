import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-header',
    template: `
      <header class="header">
        <button class="menu-btn" (click)="toggleSidebar()">
          <i class="bi bi-list"></i>
        </button>
        <div class="logo">
          <img src="assets/images/logo.svg" alt="Epilogo">
          <span>Epilogo</span>
        </div>
        <div class="search-container" [class.expanded]="isSearchExpanded">
          <button class="search-toggle" (click)="toggleSearch()">
            <i class="bi bi-search"></i>
          </button>
          <div class="search-box">
            <input 
              type="search" 
              [placeholder]="'header.search' | translate"
              [(ngModel)]="searchQuery"
              (keyup.enter)="searchBooks()"
            >
            <button (click)="searchBooks()">
              {{ 'header.search_button' | translate }}
            </button>
          </div>
        </div>
      </header>
    `,
    styles: [`
      .header {
        background-color: #C5D5BA;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }
  
      .search-container {
        margin-left: auto;
        position: relative;
      }
  
      .search-box {
        position: absolute;
        right: 0;
        top: 100%;
        background: white;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        display: none;
        width: 300px;
      }
  
      .search-container.expanded .search-box {
        display: block;
      }
  
      .search-box input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
        margin-bottom: 0.5rem;
      }
  
      .search-box button {
        width: 100%;
        padding: 0.5rem;
        background: #6B87A5;
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
      }
    `]
  })
  export class HeaderComponent {
    @Input() showSearch = true;
    @Output() sidebarToggle = new EventEmitter<void>();
    @Output() search = new EventEmitter<string>();
  
    isSearchExpanded = false;
    searchQuery = '';
  
    toggleSearch() {
      this.isSearchExpanded = !this.isSearchExpanded;
    }
  
    toggleSidebar() {
      this.sidebarToggle.emit();
    }
  
    searchBooks() {
      if (this.searchQuery.trim()) {
        this.search.emit(this.searchQuery);
        this.isSearchExpanded = false;
      }
    }
  }