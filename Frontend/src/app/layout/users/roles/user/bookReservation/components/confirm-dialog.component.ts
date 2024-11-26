import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
      <div class="dialog-overlay">
        <div class="dialog-content">
          <h2>¿Estas seguro que deseas reservar este libro?</h2>
          <div class="dialog-actions">
            <button class="btn-primary" (click)="onConfirm()">Acepto</button>
            <button class="btn-secondary" (click)="onCancel()">no acepto</button>
          </div>
        </div>
      </div>
    `,
    styleUrls: ['./dialog.component.scss']
  })
  export class ConfirmDialogComponent {
    @Output() confirm = new EventEmitter<boolean>();
  
    onConfirm() {
      this.confirm.emit(true);
    }
  
    onCancel() {
      this.confirm.emit(false);
    }
  }
  