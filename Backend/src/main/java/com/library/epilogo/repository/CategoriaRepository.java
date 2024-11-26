package com.library.epilogo.repository;

import com.library.epilogo.entity.CategoriaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<CategoriaEntity, Integer> {

    Optional<CategoriaEntity> findByNombre(String nombre);

    boolean existsByNombre(String nombre);

    List<CategoriaEntity> findAllByOrderByNombreAsc();
}
