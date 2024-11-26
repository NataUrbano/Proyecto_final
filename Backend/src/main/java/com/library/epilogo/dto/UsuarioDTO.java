package com.library.epilogo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UsuarioDTO {

    private Long id;
    private String nombre;
    private String email;
    private String rol;
    private boolean activo;
}
