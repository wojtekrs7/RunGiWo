package com.example.rungiwo.dto;

import com.example.rungiwo.domain.ContractStatus;

public record ContractResponse(
        Long id,
        Long buildingId,
        Long contractorId,
        String scope,
        ContractStatus status
) {}
