package com.library.epilogo.controller;

import com.library.epilogo.Mapper.Mapper;
import com.library.epilogo.dto.LibroDTO;
import com.library.epilogo.entity.LibroEntity;
import com.library.epilogo.exception.custom.OperacionInvalidaException;
import com.library.epilogo.exception.custom.RecursoNoEncontradoException;
import com.library.epilogo.service.LibroService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/libros")
@RequiredArgsConstructor

public class LibroController {

    private final LibroService libroService;
    private final Mapper mapper;
    private final PageableHandlerMethodArgumentResolver pageableResolver;

    @GetMapping
    public ResponseEntity<Page<LibroDTO>> buscarLibros(
            @RequestParam(required = false) String busqueda,
            Pageable pageable) {
        Page<LibroDTO> librosDTO = libroService.buscarLibros(busqueda, pageable);

        return ResponseEntity.ok(librosDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroDTO> obtenerLibro(@PathVariable Long id) {
        LibroEntity libro = libroService.buscarPorId(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Libro no encontrado con ID: " + id));
        return ResponseEntity.ok(mapper.toLibroDTO(libro));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<LibroDTO> crearLibro(@RequestBody LibroDTO libroDTO) {
        if (libroDTO.getTitulo() == null || libroDTO.getAutor() == null) {
            throw new OperacionInvalidaException("Título y autor son requeridos");
        }

        LibroEntity libro = mapper.toLibroEntity(libroDTO);
        LibroEntity creado = libroService.crearLibro(libro);
        return ResponseEntity.ok(mapper.toLibroDTO(creado));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<LibroDTO> actualizarLibro(@PathVariable Long id,
                                                    @RequestBody LibroDTO libroDTO) {
        LibroEntity libro = mapper.toLibroEntity(libroDTO);
        libro.setIdLibro(id);
        LibroEntity actualizado = libroService.actualizarLibro(libro);
        return ResponseEntity.ok(mapper.toLibroDTO(actualizado));
    }

    @PatchMapping("/{id}/disponibilidad")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> actualizarDisponibilidad(
            @PathVariable Long id,
            @RequestParam int cantidad) {
        if (cantidad < 0) {
            throw new OperacionInvalidaException("La cantidad no puede ser negativa");
        }
        libroService.actualizarDisponibilidad(id, cantidad);
        return ResponseEntity.ok().build();
    }
}
