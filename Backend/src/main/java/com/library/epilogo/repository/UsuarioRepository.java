package com.library.epilogo.repository;

import com.library.epilogo.entity.UsuarioEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioEntity, Long> {

    Optional<UsuarioEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM UsuarioEntity u WHERE u.email = :email AND u.activo = true")
    Optional<UsuarioEntity> findActiveByEmail(@Param("email") String email);

    @Query("SELECT u FROM UsuarioEntity u WHERE u.email LIKE %:email% AND u.activo = true")
    Page<UsuarioEntity> findActiveByEmailContaining(@Param("email") String email, Pageable pageable);

}
