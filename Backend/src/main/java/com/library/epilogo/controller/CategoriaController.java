package com.library.epilogo.controller;

import com.library.epilogo.Mapper.Mapper;
import com.library.epilogo.dto.CategoriaDTO;
import com.library.epilogo.entity.CategoriaEntity;
import com.library.epilogo.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor

public class CategoriaController {

    private final CategoriaService categoriaService;
    private final Mapper mapper;

    @GetMapping
    public ResponseEntity<?> listarCategorias() {
        try {
            List<CategoriaDTO> categorias = categoriaService.listarCategorias()
                    .stream()
                    .map(mapper::toCategoriaDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(categorias);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al listar categorías: " + e.getMessage());
        }
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> crearCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        try {
            // Validación básica
            if (categoriaDTO.getNombre() == null || categoriaDTO.getNombre().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("El nombre de la categoría es requerido");
            }

            CategoriaEntity categoria = mapper.toCategoriaEntity(categoriaDTO);
            CategoriaEntity nuevaCategoria = categoriaService.crearCategoria(categoria);
            return ResponseEntity.ok(mapper.toCategoriaDTO(nuevaCategoria));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear categoría: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> actualizarCategoria(@PathVariable Long id,
                                                 @RequestBody CategoriaDTO categoriaDTO) {
        try {
            if (categoriaDTO.getNombre() == null || categoriaDTO.getNombre().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("El nombre de la categoría es requerido");
            }

            CategoriaEntity categoria = mapper.toCategoriaEntity(categoriaDTO);
            categoria.setIdCategoria(id);
            CategoriaEntity actualizada = categoriaService.actualizarCategoria(categoria);
            return ResponseEntity.ok(mapper.toCategoriaDTO(actualizada));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al actualizar categoría: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCategoria(@PathVariable Long id) {
        try {
            return categoriaService.buscarPorId(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Categoría no encontrada"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener categoría: " + e.getMessage());
        }
    }


}
