package com.library.epilogo.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class CustomAuditService {

    @PersistenceContext
    private EntityManager entityManager;
    private final ObjectMapper objectMapper;

    @Transactional
    public void registrarAuditoria(String tableName, Long entityId, String action,
                                   Object oldData, Object newData) {
        try {

            Long usuarioResponsableId = obtenerUsuarioActualId();

            String oldDataJson = oldData != null ? objectMapper.writeValueAsString(oldData) : null;
            String newDataJson = newData != null ? objectMapper.writeValueAsString(newData) : null;

            String sql = String.format("""
                INSERT INTO auditoria_%s 
                (id_%s, accion, usuario_responsable, datos_anteriores, datos_nuevos, fecha) 
                VALUES 
                (?1, ?2::tipo_accion, ?3, ?4::jsonb, ?5::jsonb, CURRENT_TIMESTAMP)""",
                    tableName, tableName.substring(0, tableName.length() - 1));

            entityManager.createNativeQuery(sql)
                    .setParameter(1, entityId)
                    .setParameter(2, action)
                    .setParameter(3, usuarioResponsableId)
                    .setParameter(4, oldDataJson)
                    .setParameter(5, newDataJson)
                    .executeUpdate();

        } catch (Exception e) {
            System.err.println("Error al registrar auditoría: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private Long obtenerUsuarioActualId() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                return Long.parseLong(auth.getName());
            }
        } catch (Exception e) {
            System.err.println("Error al obtener usuario actual: " + e.getMessage());
        }
        return null;
    }

    private String limpiarNombreTabla(String tableName) {
        return tableName.endsWith("s") ? tableName.substring(0, tableName.length() - 1) : tableName;
    }
}
