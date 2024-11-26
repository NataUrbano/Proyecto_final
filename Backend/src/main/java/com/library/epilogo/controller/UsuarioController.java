package com.library.epilogo.controller;

import com.library.epilogo.Mapper.Mapper;
import com.library.epilogo.dto.UsuarioDTO;
import com.library.epilogo.dto.UsuarioRegistroDTO;
import com.library.epilogo.entity.UsuarioEntity;
import com.library.epilogo.exception.custom.OperacionInvalidaException;
import com.library.epilogo.exception.custom.RecursoNoEncontradoException;
import com.library.epilogo.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor

public class UsuarioController {

    private final UsuarioService usuarioService;
    private final Mapper mapper;

    @PostMapping("/registro")
    public ResponseEntity<UsuarioDTO> registrarUsuario(@RequestBody UsuarioRegistroDTO registroDTO) {
        if (registroDTO.getEmail() == null || registroDTO.getPassword() == null) {
            throw new OperacionInvalidaException("Email y contraseña son requeridos");
        }

        UsuarioEntity usuario = mapper.toUsuarioEntity(registroDTO);
        UsuarioEntity usuarioGuardado = usuarioService.registrarUsuario(usuario);
        return ResponseEntity.ok(mapper.toUsuarioDTO(usuarioGuardado));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<UsuarioDTO> buscarUsuario(@PathVariable Long id) {
        UsuarioEntity usuario = usuarioService.buscarPorId(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con ID: " + id));
        return ResponseEntity.ok(mapper.toUsuarioDTO(usuario));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == authentication.principal.id")
    public ResponseEntity<UsuarioDTO> actualizarUsuario(@PathVariable Long id,
                                                        @RequestBody UsuarioRegistroDTO usuarioDTO) {
        if (usuarioDTO.getEmail() == null) {
            throw new OperacionInvalidaException("El email es requerido");
        }

        UsuarioEntity usuario = mapper.toUsuarioEntity(usuarioDTO);
        usuario.setIdUsuario(id);
        UsuarioEntity actualizado = usuarioService.actualizarUsuario(usuario);
        return ResponseEntity.ok(mapper.toUsuarioDTO(actualizado));
    }

    @PatchMapping("/{id}/desactivar")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> desactivarUsuario(@PathVariable Long id) {
        usuarioService.desactivarUsuario(id);
        return ResponseEntity.ok().build();
    }
}
