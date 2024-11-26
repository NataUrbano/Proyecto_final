package com.library.epilogo.constant.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter
@RequiredArgsConstructor

public enum Rol {

    ADMIN("Administrador", "Acceso total al sistema"),
    USUARIO("Usuario", "Acceso limitado a funcionalidades básicas");

    private final String displayName;
    private final String description;

    public List<String> getPermissions() {
        List<String> permissions = new ArrayList<>();

        permissions.add("BOOKS_READ");
        permissions.add("CATEGORIES_READ");

        if (this == ADMIN) {
            permissions.add("USERS_MANAGE");
            permissions.add("BOOKS_MANAGE");
            permissions.add("CATEGORIES_MANAGE");
            permissions.add("RESERVATIONS_MANAGE");
            permissions.add("AUDIT_READ");
        } else {
            permissions.add("RESERVATIONS_CREATE");
            permissions.add("RESERVATIONS_READ_OWN");
            permissions.add("PROFILE_MANAGE");
        }

        return Collections.unmodifiableList(permissions);
    }

    @JsonValue
    public String getName() {
        return name();
    }

    @JsonCreator
    public static Rol fromString(String role) {
        try {
            return Rol.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Rol no válido: " + role);
        }
    }
}
