package com.example.rungiwo.dto;

import jakarta.validation.constraints.NotBlank;

public record UpdateContractorRequest(
        @NotBlank String name,
        @NotBlank String nip,
        @NotBlank String email,
        @NotBlank String phone
) {}
