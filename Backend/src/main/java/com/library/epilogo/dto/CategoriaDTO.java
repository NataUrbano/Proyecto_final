package com.library.epilogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class CategoriaDTO {

    private Long idCategoria;
    private String nombre;
    private String descripcion;

}
