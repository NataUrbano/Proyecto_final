package com.library.epilogo.repository;

import com.library.epilogo.constant.enums.EstadoDisponibilidad;
import com.library.epilogo.entity.LibroEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository

public interface LibroRepository extends JpaRepository<LibroEntity, Long> {

    Optional<LibroEntity> findByIsbn(String isbn);

    List<LibroEntity> findByEstadoActual(EstadoDisponibilidad estadoActual);

    @Query("SELECT l FROM LibroEntity l WHERE " +
            "LOWER(l.titulo) LIKE LOWER(CONCAT('%', :busqueda, '%')) OR " +
            "LOWER(l.autor) LIKE LOWER(CONCAT('%', :busqueda, '%'))")
    Page<LibroEntity> buscarPorTituloOAutor(@Param("busqueda") String busqueda, Pageable pageable);

    @Query("SELECT l FROM LibroEntity l WHERE l.cantidadDisponible > 0")
    List<LibroEntity> findAvailableBooks();

    List<LibroEntity> findByAutorOrderByTituloAsc(String autor);

    Optional<LibroEntity> findById(Long idLibro);
}
