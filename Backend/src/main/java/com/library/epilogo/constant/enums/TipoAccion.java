package com.library.epilogo.constant.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor

public enum TipoAccion {

    INSERCION("Inserción", "Creación de nuevo registro"),
    ACTUALIZACION("Actualización", "Modificación de registro existente"),
    ELIMINACION("Eliminación", "Eliminación de registro");

    private final String displayName;
    private final String description;

    public static TipoAccion fromTriggerOperation(String triggerOp) {
        return switch (triggerOp.toUpperCase()) {
            case "INSERT" -> INSERCION;
            case "UPDATE" -> ACTUALIZACION;
            case "DELETE" -> ELIMINACION;
            default -> throw new IllegalArgumentException("Operación de trigger no válida: " + triggerOp);
        };
    }
}

