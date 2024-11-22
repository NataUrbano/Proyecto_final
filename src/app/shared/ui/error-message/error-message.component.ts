import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-error-message',
    template: `
      <div class="error-container">
        <i class="bi bi-exclamation-circle"></i>
        <h3>{{ title | translate }}</h3>
        <p>{{ message | translate }}</p>
        <button *ngIf="showRetry" (click)="onRetry.emit()">
          {{ 'error.retry' | translate }}
        </button>
      </div>
    `,
    styles: [`
      .error-container {
        text-align: center;
        padding: 2rem;
        max-width: 400px;
        margin: 0 auto;
      }
  
      i {
        font-size: 3rem;
        color: #dc3545;
        margin-bottom: 1rem;
      }
  
      h3 {
        color: #333;
        margin-bottom: 0.5rem;
      }
  
      p {
        color: #666;
        margin-bottom: 1.5rem;
      }
  
      button {
        padding: 0.75rem 1.5rem;
        background: #6B87A5;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
    `]
  })
  export class ErrorMessageComponent {
    @Input() title = 'error.default_title';
    @Input() message = 'error.default_message';
    @Input() showRetry = false;
    @Output() onRetry = new EventEmitter<void>();
  }