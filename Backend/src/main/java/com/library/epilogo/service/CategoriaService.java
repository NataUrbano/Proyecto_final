package com.library.epilogo.service;

import com.library.epilogo.entity.CategoriaEntity;
import com.library.epilogo.exception.custom.OperacionInvalidaException;
import com.library.epilogo.exception.custom.RecursoNoEncontradoException;
import com.library.epilogo.repository.CategoriaRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Transactional
    public CategoriaEntity crearCategoria(CategoriaEntity categoria) {
        if (categoria.getNombre() == null || categoria.getNombre().trim().isEmpty()) {
            throw new OperacionInvalidaException("El nombre de la categoría es requerido");
        }

        if (categoriaRepository.existsByNombre(categoria.getNombre().trim())) {
            throw new OperacionInvalidaException("Ya existe una categoría con ese nombre");
        }

        categoria.setNombre(categoria.getNombre().trim());
        if (categoria.getDescripcion() != null) {
            categoria.setDescripcion(categoria.getDescripcion().trim());
        }

        return categoriaRepository.save(categoria);
    }

    @Transactional(readOnly = true)
    public Optional<CategoriaEntity> buscarPorId(Integer id) {
        if (id == null) {
            throw new OperacionInvalidaException("El ID de la categoría es requerido");
        }
        return categoriaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<CategoriaEntity> listarCategorias() {
        return categoriaRepository.findAllByOrderByNombreAsc();
    }

    @Transactional(readOnly = true)
    public Optional<CategoriaEntity> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            throw new OperacionInvalidaException("El nombre de la categoría es requerido");
        }
        return categoriaRepository.findByNombre(nombre.trim());
    }

    @Transactional
    public CategoriaEntity actualizarCategoria(CategoriaEntity categoria) {
        if (categoria.getIdCategoria() == null) {
            throw new OperacionInvalidaException("El ID de la categoría es requerido");
        }

        CategoriaEntity categoriaExistente = categoriaRepository.findById((Int) categoria.getIdCategoria())
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "No se encontró la categoría con ID: " + categoria.getIdCategoria()));

        if (categoria.getNombre() != null && !categoria.getNombre().equals(categoriaExistente.getNombre())) {
            if (categoriaRepository.existsByNombre(categoria.getNombre().trim())) {
                throw new OperacionInvalidaException("Ya existe una categoría con ese nombre");
            }
            categoriaExistente.setNombre(categoria.getNombre().trim());
        }

        if (categoria.getDescripcion() != null) {
            categoriaExistente.setDescripcion(categoria.getDescripcion().trim());
        }

        return categoriaRepository.save(categoriaExistente);
    }

    @Transactional
    public void eliminarCategoria(Integer id) {
        if (id == null) {
            throw new OperacionInvalidaException("El ID de la categoría es requerido");
        }

        CategoriaEntity categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "No se encontró la categoría con ID: " + id));

        categoriaRepository.delete(categoria);
    }
}
