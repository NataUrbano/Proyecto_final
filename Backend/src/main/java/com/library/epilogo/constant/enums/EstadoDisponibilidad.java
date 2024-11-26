package com.library.epilogo.constant.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor

public enum EstadoDisponibilidad {

    DISPONIBLE("Disponible", "El libro está disponible para préstamo"),
    POCAS_COPIAS("Pocas Copias", "Quedan pocas copias disponibles"),
    NO_DISPONIBLE("No Disponible", "No hay copias disponibles actualmente");

    private final String displayName;
    private final String description;

    public static EstadoDisponibilidad fromQuantity(int quantity) {
        if (quantity <= 0) {
            return NO_DISPONIBLE;
        } else if (quantity <= 3) {
            return POCAS_COPIAS;
        }
        return DISPONIBLE;
    }
}
