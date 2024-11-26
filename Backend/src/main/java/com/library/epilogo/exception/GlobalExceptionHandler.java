package com.library.epilogo.exception;

import com.library.epilogo.exception.custom.OperacionInvalidaException;
import com.library.epilogo.exception.custom.RecursoNoEncontradoException;
import com.library.epilogo.exception.custom.SeguridadException;
import com.library.epilogo.exception.model.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<ErrorResponse> manejarRecursoNoEncontrado(
            RecursoNoEncontradoException ex,
            HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.of(
                "Recurso no encontrado",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OperacionInvalidaException.class)
    public ResponseEntity<ErrorResponse> manejarOperacionInvalida(
            OperacionInvalidaException ex,
            HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.of(
                "Operación inválida",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SeguridadException.class)
    public ResponseEntity<ErrorResponse> manejarErrorSeguridad(
            SeguridadException ex,
            HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.of(
                "Error de seguridad",
                ex.getMessage(),
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> manejarAccesoDenegado(
            AccessDeniedException ex,
            HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.of(
                "Acceso denegado",
                "No tiene permisos para realizar esta operación",
                request.getRequestURI()
        );
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> manejarExcepcionGeneral(
            Exception ex,
            HttpServletRequest request) {

        ErrorResponse error = ErrorResponse.of(
                "Error interno del servidor",
                "Ha ocurrido un error inesperado. Por favor, inténtelo más tarde",
                request.getRequestURI()
        );
        // Aquí podrías agregar logging del error real
        System.err.println("Error no manejado: " + ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

