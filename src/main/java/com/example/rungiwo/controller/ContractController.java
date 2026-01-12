package com.example.rungiwo.controller;

import com.example.rungiwo.dto.AssignContractRequest;
import com.example.rungiwo.dto.ContractResponse;
import com.example.rungiwo.service.ContractService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import java.util.List;

@RestController
@RequestMapping("/buildings/{buildingId}/contracts")
public class ContractController {

    private final ContractService service;

    public ContractController(ContractService service) {
        this.service = service;
    }

    @Operation(summary = "Assign subcontractor to building (create contract)")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContractResponse assign(@PathVariable Long buildingId,
                                   @Valid @RequestBody AssignContractRequest req) {
        return service.assign(buildingId, req);
    }

    @Operation(summary = "Get contracts for building")
    @GetMapping
    public List<ContractResponse> list(@PathVariable Long buildingId) {
        return service.listForBuilding(buildingId);
    }

}
