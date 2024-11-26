package com.library.epilogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ReservaDTO {

    private Long idReserva;
    private Long idUsuario;
    private Long idLibro;
    private String estado;
    private LocalDateTime fechaReserva;
    private LocalDateTime fechaDevolucionEsperada;
}
