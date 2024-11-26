import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    selector: 'app-success-dialog',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
      <div class="dialog-overlay">
        <div class="dialog-content success">
          <h2>¡Felicidades! Has reservado tu libro con éxito</h2>
          <p>
            Tu libro ha sido reservado y ahora puedes encontrar los detalles en tu perfil. Desde allí podrás:
          </p>
          <ul>
            <li>Consultar el estado de tu reserva.</li>
            <li>Ver la fecha de recogida.</li>
            <li>Modificar o cancelar la reserva si es necesario.</li>
          </ul>
          <p class="success-message">
            Gracias por ser parte de Epilogo! Disfruta de tu lectura y continúa explorando nuevas historias.
          </p>
          <div class="dialog-actions">
            <button class="btn-primary" (click)="onClose()">Aceptar</button>
          </div>
        </div>
      </div>
    `,
    styleUrls: ['./dialog.component.scss']
  })
  export class SuccessDialogComponent {
    @Output() close = new EventEmitter<void>();
  
    onClose() {
      this.close.emit();
    }
  }
  