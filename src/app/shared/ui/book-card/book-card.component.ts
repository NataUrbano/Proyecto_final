import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-book-card',
    template: `
      <div class="book-card" [class.available]="book.isAvailable">
        <div class="book-cover">
          <img [src]="book.coverUrl" [alt]="book.title">
          <div class="availability-badge">
            {{ book.isAvailable ? ('book.available' | translate) : ('book.unavailable' | translate) }}
          </div>
        </div>
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p class="author">{{ book.author }}</p>
          <div class="book-meta">
            <span class="genre">{{ book.genre }}</span>
            <span class="year">{{ book.year }}</span>
          </div>
          <button 
            class="reserve-btn" 
            [disabled]="!book.isAvailable"
            (click)="onReserve.emit(book)">
            {{ 'book.reserve' | translate }}
          </button>
        </div>
      </div>
    `,
    styles: [`
      .book-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        position: relative;
      }
  
      .book-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.15);
      }
  
      .book-cover {
        position: relative;
        aspect-ratio: 2/3;
      }
  
      .book-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      .availability-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
        background: #88DA62;
        color: white;
      }
  
      .book-info {
        padding: 1.5rem;
      }
  
      .book-info h3 {
        margin: 0;
        font-size: 1.25rem;
        color: #333;
        margin-bottom: 0.5rem;
      }
  
      .author {
        color: #666;
        margin-bottom: 1rem;
      }
  
      .book-meta {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: #888;
      }
  
      .reserve-btn {
        width: 100%;
        padding: 0.75rem;
        border: none;
        border-radius: 6px;
        background: #6B87A5;
        color: white;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.3s ease;
      }
  
      .reserve-btn:hover:not(:disabled) {
        background: #556d89;
      }
  
      .reserve-btn:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    `]
  })
  export class BookCardComponent {
    @Input() book!: any;
    @Output() onReserve = new EventEmitter<any>();
  }