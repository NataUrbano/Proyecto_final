package com.library.epilogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class LibroDTO {

    private Long idLibro;
    private String isbn;
    private String titulo;
    private String autor;
    private String editorial;
    private String imagenUrl;
    private Integer anioPublicacion;
    private Integer cantidadTotal;
    private Integer cantidadDisponible;
    private String estadoActual;
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaActualizacion;
    private List<CategoriaDTO> categorias;
}
