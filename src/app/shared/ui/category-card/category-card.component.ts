import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-category-card',
    template: `
      <div class="category-card" (click)="onClick.emit(category)">
        <div class="category-image">
          <img [src]="category.imageUrl" [alt]="category.name">
        </div>
        <div class="category-overlay">
          <h3>{{ category.name }}</h3>
          <p>{{ category.bookCount }} {{ 'category.books' | translate }}</p>
        </div>
      </div>
    `,
    styles: [`
      .category-card {
        position: relative;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        aspect-ratio: 16/9;
        transition: all 0.3s ease;
      }
  
      .category-card:hover {
        transform: scale(1.05);
        box-shadow: 0 12px 24px rgba(0,0,0,0.2);
      }
  
      .category-image {
        width: 100%;
        height: 100%;
      }
  
      .category-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  
      .category-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.5rem;
        color: white;
        transition: background 0.3s ease;
      }
  
      .category-card:hover .category-overlay {
        background: linear-gradient(to top, rgba(107,135,165,0.9), transparent);
      }
  
      .category-overlay h3 {
        margin: 0;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }
  
      .category-overlay p {
        margin: 0;
        opacity: 0.9;
      }
    `]
  })
  export class CategoryCardComponent {
    @Input() category!: any;
    @Output() onClick = new EventEmitter<any>();
  }