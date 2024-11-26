package com.library.epilogo.repository;

import com.library.epilogo.constant.enums.EstadoReserva;
import com.library.epilogo.entity.ReservaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository

public interface ReservaRepository extends JpaRepository<ReservaEntity, Long> {

    List<ReservaEntity> findByUsuarioIdUsuario(Long idUsuario);

    List<ReservaEntity> findByEstado(EstadoReserva estado);

    @Query("SELECT r FROM ReservaEntity r WHERE r.usuario.idUsuario = :idUsuario AND r.estado IN (:estadoPendiente, :estadoActiva)")
    List<ReservaEntity> findActiveReservasByUsuario(@Param("idUsuario") Long idUsuario,
                                                    @Param("estadoPendiente") EstadoReserva estadoPendiente,
                                                    @Param("estadoActiva") EstadoReserva estadoActiva);

    @Query("SELECT r FROM ReservaEntity r WHERE r.fechaDevolucionEsperada < :fecha AND r.estado = 'ACTIVA'")
    List<ReservaEntity> findOverdueReservas(@Param("fecha") LocalDateTime fecha);

    @Query("SELECT COUNT(r) FROM ReservaEntity r WHERE r.libro.idLibro = :idLibro AND r.estado IN (:estadoPendiente, :estadoActiva)")
    List<ReservaEntity> findActiveReservasByLibro(@Param("idLibro") Long idLibro,
                                   @Param("estadoPendiente") EstadoReserva estadoPendiente,
                                   @Param("estadoActiva") EstadoReserva estadoActiva);

}
