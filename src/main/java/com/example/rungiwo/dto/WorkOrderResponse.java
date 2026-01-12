package com.example.rungiwo.dto;

import com.example.rungiwo.domain.Priority;
import com.example.rungiwo.domain.WorkOrderStatus;

import java.time.Instant;

public record WorkOrderResponse(
        Long id,
        Long buildingId,
        Long contractorId,
        String title,
        String description,
        Priority priority,
        WorkOrderStatus status,
        Instant createdAt
) {}
