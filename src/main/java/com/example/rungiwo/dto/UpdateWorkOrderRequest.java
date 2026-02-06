package com.example.rungiwo.dto;

import com.example.rungiwo.domain.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateWorkOrderRequest(
        @NotNull Long contractorId,
        @NotBlank String scope,
        @NotBlank String title,
        String description,
        @NotNull Priority priority
) {}
