import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-loading-spinner',
    template: `
      <div class="spinner-container">
        <div class="spinner"></div>
        <p *ngIf="message">{{ message | translate }}</p>
      </div>
    `,
    styles: [`
      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }
  
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #6B87A5;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
  
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  
      p {
        margin-top: 1rem;
        color: #666;
      }
    `]
  })
  export class LoadingSpinnerComponent {
    @Input() message?: string;
  }