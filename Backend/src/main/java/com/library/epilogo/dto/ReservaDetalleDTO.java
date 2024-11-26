package com.library.epilogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ReservaDetalleDTO {

    private Long idReserva;
    private UsuarioDTO usuario;
    private LibroDTO libro;
    private String estado;
    private LocalDateTime fechaReserva;
    private LocalDateTime fechaDevolucionEsperada;
    private LocalDateTime fechaDevolucionReal;
    private LocalDateTime fechaActualizacion;
}
