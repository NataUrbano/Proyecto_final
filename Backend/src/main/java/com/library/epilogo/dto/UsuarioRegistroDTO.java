package com.library.epilogo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UsuarioRegistroDTO {

    private String nombre;
    private String email;
    private String password;
}
