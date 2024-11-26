package com.library.epilogo.controller;

import com.library.epilogo.Mapper.Mapper;
import com.library.epilogo.constant.enums.EstadoReserva;
import com.library.epilogo.dto.ReservaDTO;
import com.library.epilogo.entity.ReservaEntity;
import com.library.epilogo.exception.custom.OperacionInvalidaException;
import com.library.epilogo.exception.custom.SeguridadException;
import com.library.epilogo.service.ReservaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor

public class ReservaController {

    private final ReservaService reservaService;
    private final Mapper mapper;

    @PostMapping
    @PreAuthorize("hasAnyAuthority('CLIENTE', 'ADMIN')")
    public ResponseEntity<ReservaDTO> crearReserva(
            @RequestBody ReservaDTO reservaDTO,
            Authentication auth) {

        if (!auth.getAuthorities().contains("ADMIN") &&
                !reservaDTO.getIdUsuario().toString().equals(auth.getName())) {
            throw new SeguridadException("No tiene permiso para crear reservas para este usuario");
        }

        if (reservaDTO.getIdLibro() == null || reservaDTO.getIdUsuario() == null) {
            throw new OperacionInvalidaException("ID de libro y usuario son requeridos");
        }

        ReservaEntity reserva = reservaService.crearReserva(
                reservaDTO.getIdLibro(),
                reservaDTO.getIdUsuario(),
                reservaDTO.getFechaDevolucionEsperada()
        );

        return ResponseEntity.ok(mapper.toReservaDTO(reserva));
    }

    @GetMapping("/usuario/{idUsuario}")
    @PreAuthorize("hasAuthority('ADMIN') or #idUsuario == authentication.principal.id")
    public ResponseEntity<List<ReservaDTO>> listarReservasPorUsuario(@PathVariable Long idUsuario) {
        List<ReservaDTO> reservas = reservaService.listarReservasPorUsuario(idUsuario)
                .stream()
                .map(mapper::toReservaDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservas);
    }

    @PatchMapping("/{id}/estado")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ReservaDTO> actualizarEstadoReserva(
            @PathVariable Long id,
            @RequestParam EstadoReserva estado) {

        if (estado == null || estado.trim().isEmpty()) {
            throw new OperacionInvalidaException("El estado es requerido");
        }

        ReservaEntity reserva = reservaService.actualizarEstadoReserva(id, estado);
        return ResponseEntity.ok(mapper.toReservaDTO(reserva));
    }

    @GetMapping("/vencidas")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<ReservaDTO>> listarReservasVencidas() {
        List<ReservaDTO> reservas = reservaService.listarReservasVencidas()
                .stream()
                .map(mapper::toReservaDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(reservas);
    }
}
