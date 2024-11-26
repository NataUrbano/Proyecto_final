import { CommonModule } from "@angular/common";
import { Component, computed, input, output } from "@angular/core";
import { Reservation } from "../reservation.interface";

@Component({
    selector: 'app-reservation-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reservation-table.component.html',
    styleUrls: ['./reservation-table.component.scss']
  })
  export class ReservationTableComponent {
    reservations = input.required<Reservation[]>();
    showDevolucionReal = input(false);
    loading = input(false);
    
    cancelReservation = output<string>();
  
    protected readonly columns = computed(() => {
      const baseColumns = [
        { key: 'id_reserva', label: 'ID Reserva' },
        { key: 'id_libro', label: 'ID Libro' },
        { key: 'titulo_libro', label: 'Título' },
        { key: 'fecha_reserva', label: 'Fecha Reserva' },
        { key: 'fecha_devolucion_esperada', label: 'Fecha Devolución Esperada' },
        { key: 'estado', label: 'Estado' }
      ];
  
      if (this.showDevolucionReal()) {
        baseColumns.splice(5, 0, { 
          key: 'fecha_devolucion_real', 
          label: 'Fecha Devolución Real' 
        });
      }
  
      return baseColumns;
    });
  
    getStatusClass(status: string): string {
      return status.toLowerCase();
    }
  
    onCancelReservation(id: string): void {
      this.cancelReservation.emit(id);
    }
  }
  