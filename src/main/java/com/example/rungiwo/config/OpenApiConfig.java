package com.example.rungiwo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "RunGiWo API",
                version = "1.0",
                description = "API do zarządzania budynkami, firmami podwykonawczymi, kontraktami i zleceniami."
        )
)
public class OpenApiConfig {
}
