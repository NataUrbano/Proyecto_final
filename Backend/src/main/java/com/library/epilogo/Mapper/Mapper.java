package com.library.epilogo.Mapper;

import com.library.epilogo.dto.*;
import com.library.epilogo.entity.CategoriaEntity;
import com.library.epilogo.entity.LibroEntity;
import com.library.epilogo.entity.ReservaEntity;
import com.library.epilogo.entity.UsuarioEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component

public class Mapper {

    public UsuarioDTO toUsuarioDTO(UsuarioEntity entity) {
        if (entity == null) return null;

        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setEmail(entity.getEmail());
        dto.setRol(entity.getRol());
        dto.setActivo(entity.isActivo());
        return dto;
    }

    public UsuarioEntity toUsuarioEntity(UsuarioRegistroDTO dto) {
        if (dto == null) return null;

        UsuarioEntity entity = new UsuarioEntity();
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        entity.setPassword(dto.getPassword());
        entity.setRol("CLIENTE"); // Rol por defecto
        entity.setActivo(true);
        return entity;
    }

    public LibroDTO toLibroDTO(LibroEntity entity) {
        if (entity == null) return null;

        LibroDTO dto = new LibroDTO();
        dto.setIdLibro(entity.getIdLibro());
        dto.setIsbn(entity.getIsbn());
        dto.setTitulo(entity.getTitulo());
        dto.setAutor(entity.getAutor());
        dto.setEditorial(entity.getEditorial());
        dto.setImagenUrl(entity.getImagenUrl());
        dto.setAnioPublicacion(entity.getAnioPublicacion());
        dto.setCantidadTotal(entity.getCantidadTotal());
        dto.setCantidadDisponible(entity.getCantidadDisponible());
        dto.setEstadoActual(entity.getEstadoActual());

        if (entity.getCategorias() != null) {
            dto.setCategorias(entity.getCategorias().stream()
                    .map(this::toCategoriaDTO)
                    .collect(Collectors.toList()));
        } else {
            dto.setCategorias(new ArrayList<>());
        }

        return dto;
    }

    public LibroEntity toLibroEntity(LibroDTO dto) {
        if (dto == null) return null;

        LibroEntity entity = new LibroEntity();
        entity.setIsbn(dto.getIsbn());
        entity.setTitulo(dto.getTitulo());
        entity.setAutor(dto.getAutor());
        entity.setEditorial(dto.getEditorial());
        entity.setImagenUrl(dto.getImagenUrl());
        entity.setAnioPublicacion(dto.getAnioPublicacion());
        entity.setCantidadTotal(dto.getCantidadTotal());
        entity.setCantidadDisponible(dto.getCantidadDisponible());
        entity.setEstadoActual(dto.getEstadoActual());
        return entity;
    }

    public CategoriaDTO toCategoriaDTO(CategoriaEntity entity) {
        if (entity == null) return null;

        CategoriaDTO dto = new CategoriaDTO();
        dto.setIdCategoria(entity.getIdCategoria());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }

    public CategoriaEntity toCategoriaEntity(CategoriaDTO dto) {
        if (dto == null) return null;

        CategoriaEntity entity = new CategoriaEntity();
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        return entity;
    }

    public ReservaDTO toReservaDTO(ReservaEntity entity) {
        if (entity == null) return null;

        ReservaDTO dto = new ReservaDTO();
        dto.setIdReserva(entity.getIdReserva());

        if (entity.getUsuario() != null) {
            dto.setIdUsuario(entity.getUsuario().getId());
        }

        if (entity.getLibro() != null) {
            dto.setIdLibro(entity.getLibro().getIdLibro());
        }

        dto.setEstado(entity.getEstado());
        dto.setFechaReserva(entity.getFechaReserva());
        dto.setFechaDevolucionEsperada(entity.getFechaDevolucionEsperada());
        return dto;
    }
}
