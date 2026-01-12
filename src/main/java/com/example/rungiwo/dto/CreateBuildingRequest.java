package com.example.rungiwo.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateBuildingRequest(
        @NotBlank String name,
        @NotBlank String address
) {}
