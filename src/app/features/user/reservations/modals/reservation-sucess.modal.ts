import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    template: `
      <div class="modal-content success-modal">
        <div class="modal-body text-center">
          <div class="success-icon mb-3">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <h2>{{ 'reservation.success.title' | translate }}</h2>
          <p>{{ 'reservation.success.message' | translate }}</p>
          <ul class="text-start">
            <li>{{ 'reservation.success.check_status' | translate }}</li>
            <li>{{ 'reservation.success.pickup_date' | translate }}</li>
            <li>{{ 'reservation.success.modify' | translate }}</li>
          </ul>
          <p class="mt-3">{{ 'reservation.success.thanks' | translate }}</p>
          <button class="btn btn-primary mt-3" (click)="modal.close()">
            {{ 'reservation.success.continue' | translate }}
          </button>
        </div>
      </div>
    `,
    styles: [`
      .success-icon {
        font-size: 3rem;
        color: #88DA62;
      }
      ul {
        margin: 1.5rem 0;
        padding-left: 1.5rem;
      }
      li {
        margin-bottom: 0.5rem;
      }
    `]
  })
  export class ReservationSuccessComponent {
    constructor(public modal: NgbModal) {}
  }