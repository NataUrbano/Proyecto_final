export interface Reservation {
    id_reserva: string;
    id_libro: string;
    titulo_libro: string;
    fecha_reserva: Date;
    fecha_devolucion_esperada: Date;
    fecha_devolucion_real?: Date;
    estado: ReservationStatus;
  }
  
  export type ReservationStatus = 'ACTIVA' | 'VENCIDA' | 'CANCELADA' | 'COMPLETADA';