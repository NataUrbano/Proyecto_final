package com.library.epilogo.service;

import com.library.epilogo.dto.LibroDTO;
import com.library.epilogo.entity.LibroEntity;
import com.library.epilogo.repository.LibroRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class LibroService {

    private final LibroRepository libroRepository;
    private final CustomAuditService auditService;

    @Transactional
    public LibroEntity crearLibro(LibroEntity libro) {
        if (libroRepository.findByIsbn(libro.getIsbn()).isPresent()) {
            throw new RuntimeException("El ISBN ya está registrado");
        }

        LibroEntity libroGuardado = libroRepository.save(libro);
        auditService.registrarAuditoria("libros", libroGuardado.getIdLibro(), "INSERCION",
                null, libroGuardado);
        return libroGuardado;
    }

    @Transactional(readOnly = true)
    public Optional<LibroEntity> buscarPorId(Long id) {
        return libroRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Page<LibroDTO> buscarLibros(String busqueda, Pageable pageable) {
        Page<LibroEntity> libros = libroRepository.buscarPorTituloOAutor(
                busqueda != null ? busqueda : "", pageable);

        return libros.map(mapper::toLibroDTO);
    }


    @Transactional(readOnly = true)
    public Page<LibroEntity> buscarPorTituloOAutor(String busqueda, Pageable pageable) {
        return libroRepository.buscarPorTituloOAutor(busqueda, pageable);
    }

    @Transactional(readOnly = true)
    public List<LibroEntity> listarLibrosDisponibles() {
        return libroRepository.findAvailableBooks();
    }

    @Transactional
    public LibroEntity actualizarLibro(LibroEntity libro) {
        Optional<LibroEntity> libroExistente = libroRepository.findById(libro.getIdLibro());
        if (libroExistente.isEmpty()) {
            throw new RuntimeException("Libro no encontrado");
        }

        LibroEntity libroAntes = libroExistente.get();
        LibroEntity libroActualizado = libroRepository.save(libro);
        auditService.registrarAuditoria("libros", libroActualizado.getIdLibro(),
                "ACTUALIZACION", libroAntes, libroActualizado);
        return libroActualizado;
    }

    @Transactional
    public void actualizarDisponibilidad(Long idLibro, int cantidadDisponible) {
        Optional<LibroEntity> libroOpt = libroRepository.findById(idLibro);
        if (libroOpt.isPresent()) {
            LibroEntity libro = libroOpt.get();
            LibroEntity libroAntes = new LibroEntity();
            libroAntes.setIdLibro(libro.getIdLibro());
            libroAntes.setCantidadDisponible(libro.getCantidadDisponible());
            libroAntes.setEstadoActual(libro.getEstadoActual());

            libro.setCantidadDisponible(cantidadDisponible);
            LibroEntity libroActualizado = libroRepository.save(libro);

            auditService.registrarAuditoria("libros", idLibro, "ACTUALIZACION",
                    libroAntes, libroActualizado);
        }
    }
}
