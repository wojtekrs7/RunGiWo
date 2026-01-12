package com.example.rungiwo.dto;

import com.example.rungiwo.domain.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateWorkOrderRequest(
        @NotNull Long contractorId,
        @NotBlank String title,
        @NotBlank String description,
        @NotNull Priority priority,
        @NotBlank String scope
) {}
