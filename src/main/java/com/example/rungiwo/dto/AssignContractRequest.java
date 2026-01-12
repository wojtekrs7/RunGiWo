package com.example.rungiwo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AssignContractRequest(
        @NotNull Long contractorId,
        @NotBlank String scope
) {}
