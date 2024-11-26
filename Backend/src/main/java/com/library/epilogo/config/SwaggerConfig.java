package com.library.epilogo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)

public class SwaggerConfig {

    @OpenAp
    @Bean
    public OpenAPI epilogoAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API de Epílogo - Sistema de Biblioteca")
                        .description("API REST para la gestión de biblioteca y reserva de libros")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Tu Nombre")
                                .email("tu@email.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("http://www.apache.org/licenses/LICENSE-2.0.html")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
