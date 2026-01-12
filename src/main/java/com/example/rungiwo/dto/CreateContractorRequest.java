package com.example.rungiwo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateContractorRequest(
        @NotBlank String name,
        String nip,
        @Email String email,
        String phone
) {}
