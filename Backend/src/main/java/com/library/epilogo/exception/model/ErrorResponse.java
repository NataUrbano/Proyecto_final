package com.library.epilogo.exception.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ErrorResponse {
    private LocalDateTime timestamp;
    private String mensaje;
    private String detalles;
    private String path;

    public static ErrorResponse of(String mensaje, String detalles, String path) {
        return new ErrorResponse(LocalDateTime.now(), mensaje, detalles, path);
    }
}