import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    template: `
      <div class="modal-content confirm-modal">
        <div class="modal-body text-center">
          <h2>{{ 'reservation.confirm.title' | translate }}</h2>
          <div class="mt-4 d-flex justify-content-center gap-3">
            <button class="btn btn-secondary" (click)="modal.dismiss('cancel')">
              {{ 'reservation.confirm.cancel' | translate }}
            </button>
            <button class="btn btn-primary" (click)="modal.close('confirm')">
              {{ 'reservation.confirm.accept' | translate }}
            </button>
          </div>
        </div>
      </div>
    `
  })
  export class ReservationConfirmComponent {
    constructor(public modal: NgbModal) {}
  }