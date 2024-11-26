package com.library.epilogo.constant.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@RequiredArgsConstructor

public enum EstadoReserva {

    PENDIENTE("Pendiente", "Reserva registrada, pendiente de aprobación"),
    ACTIVA("Activa", "Reserva aprobada y en curso"),
    COMPLETADA("Completada", "Reserva finalizada con devolución del libro"),
    CANCELADA("Cancelada", "Reserva cancelada antes de completarse"),
    VENCIDA("Vencida", "Reserva no devuelta en el plazo establecido");

    private final String displayName;
    private final String description;
}
