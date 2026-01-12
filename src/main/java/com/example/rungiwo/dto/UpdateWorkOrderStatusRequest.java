package com.example.rungiwo.dto;

import com.example.rungiwo.domain.WorkOrderStatus;
import jakarta.validation.constraints.NotNull;

public record UpdateWorkOrderStatusRequest(
        @NotNull WorkOrderStatus status
) {}
