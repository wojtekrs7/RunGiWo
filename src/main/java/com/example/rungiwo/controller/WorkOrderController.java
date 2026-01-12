package com.example.rungiwo.controller;

import com.example.rungiwo.domain.WorkOrderStatus;
import com.example.rungiwo.dto.CreateWorkOrderRequest;
import com.example.rungiwo.dto.UpdateWorkOrderStatusRequest;
import com.example.rungiwo.dto.WorkOrderResponse;
import com.example.rungiwo.service.WorkOrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.swagger.v3.oas.annotations.Operation;


@RestController
public class WorkOrderController {

    private final WorkOrderService service;

    public WorkOrderController(WorkOrderService service) {
        this.service = service;
    }

    @Operation(summary = "Create work order for building")
    @PostMapping("/buildings/{buildingId}/work-orders")
    @ResponseStatus(HttpStatus.CREATED)
    public WorkOrderResponse create(@PathVariable Long buildingId,
                                    @Valid @RequestBody CreateWorkOrderRequest req) {
        return service.create(buildingId, req);
    }

    @Operation(summary = "Get work orders for building")
    @GetMapping("/buildings/{buildingId}/work-orders")
    public List<WorkOrderResponse> list(@PathVariable Long buildingId,
                                        @RequestParam(required = false) WorkOrderStatus status) {
        return service.listForBuilding(buildingId, status);
    }

    @Operation(summary = "Get work order by ID")
    @GetMapping("/work-orders/{id}")
    public WorkOrderResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    @Operation(summary = "Update work order status")
    @PatchMapping("/work-orders/{id}/status")
    public WorkOrderResponse updateStatus(@PathVariable Long id,
                                          @Valid @RequestBody UpdateWorkOrderStatusRequest req) {
        return service.updateStatus(id, req);
    }


}
