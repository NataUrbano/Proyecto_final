package com.library.epilogo.entity;

import com.library.epilogo.constant.enums.EstadoDisponibilidad;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "libros")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class LibroEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_libro")
    private Long idLibro;

    @Column(nullable = false, unique = true, length = 13)
    private String isbn;

    @Column(nullable = false, length = 200)
    private String titulo;

    @Column(nullable = false, length = 100)
    private String autor;

    @Column(length = 100)
    private String editorial;

    @Column(name = "imagen_url", length = 500)
    private String imagenUrl;

    @Column(name = "anio_publicacion")
    private Integer anioPublicacion;

    @Column(name = "cantidad_total", nullable = false)
    private Integer cantidadTotal = 1;

    @Column(name = "cantidad_disponible", nullable = false)
    private Integer cantidadDisponible = 1;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_actual", nullable = false)
    private EstadoDisponibilidad estadoActual = EstadoDisponibilidad.DISPONIBLE;

    @CreationTimestamp
    @Column(name = "fecha_registro")
    private LocalDateTime fechaRegistro;

    @UpdateTimestamp
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "libro_categoria",
            joinColumns = @JoinColumn(name = "id_libro"),
            inverseJoinColumns = @JoinColumn(name = "id_categoria")
    )
    private List<CategoriaEntity> categorias;

    @OneToMany(mappedBy = "libro")
    private List<ReservaEntity> reservas;
}
