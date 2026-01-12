package com.example.rungiwo.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateBuildingRequest(
        @NotBlank String name,
        @NotBlank String address
) {}