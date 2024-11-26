package com.library.epilogo.service;

import com.library.epilogo.constant.enums.EstadoReserva;
import com.library.epilogo.entity.LibroEntity;
import com.library.epilogo.entity.ReservaEntity;
import com.library.epilogo.repository.LibroRepository;
import com.library.epilogo.repository.ReservaRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class ReservaService {

    private final ReservaRepository reservaRepository;
    private final LibroRepository libroRepository;
    private final CustomAuditService auditService;

    @Transactional
    public ReservaEntity crearReserva(ReservaEntity reserva) {
        Optional<LibroEntity> libro = libroRepository.findById(reserva.getLibro().getIdLibro());
        if (libro.isEmpty() || libro.get().getCantidadDisponible() <= 0) {
            throw new RuntimeException("El libro no está disponible para reserva");
        }

        List<ReservaEntity> reservasActivas = reservaRepository.findActiveReservasByLibro(reserva.getLibro().getIdLibro(), EstadoReserva.PENDIENTE, EstadoReserva.ACTIVA);
        if (!reservasActivas.isEmpty()) {
            throw new RuntimeException("Ya tienes una reserva activa para este libro");
        }

        reserva.setEstado(EstadoReserva.PENDIENTE);
        reserva.setFechaDevolucionEsperada(LocalDateTime.now().plusDays(14));

        ReservaEntity reservaGuardada = reservaRepository.save(reserva);
        auditService.registrarAuditoria("reservas", reservaGuardada.getIdReserva(),
                "INSERCION", null, reservaGuardada);
        return reservaGuardada;
    }

    @Transactional
    public ReservaEntity actualizarEstadoReserva(Long idReserva, EstadoReserva nuevoEstado) {
        Optional<ReservaEntity> reservaOpt = reservaRepository.findById(idReserva);
        if (reservaOpt.isEmpty()) {
            throw new RuntimeException("Reserva no encontrada");
        }

        ReservaEntity reserva = reservaOpt.get();
        ReservaEntity reservaAntes = new ReservaEntity();
        reservaAntes.setIdReserva(reserva.getIdReserva());
        reservaAntes.setEstado(reserva.getEstado());

        reserva.setEstado(nuevoEstado);
        if (nuevoEstado == EstadoReserva.COMPLETADA) {
            reserva.setFechaDevolucionReal(LocalDateTime.now());
        }

        ReservaEntity reservaActualizada = reservaRepository.save(reserva);
        auditService.registrarAuditoria("reservas", idReserva, "ACTUALIZACION",
                reservaAntes, reservaActualizada);
        return reservaActualizada;
    }

    @Transactional(readOnly = true)
    public List<ReservaEntity> listarReservasVencidas() {
        return reservaRepository.findOverdueReservas(LocalDateTime.now());
    }

    @Transactional(readOnly = true)
    public List<ReservaEntity> listarReservasPorUsuario(Long idUsuario) {
        return reservaRepository.findByUsuarioIdUsuario(idUsuario);
    }
}
