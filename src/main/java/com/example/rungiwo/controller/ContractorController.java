package com.example.rungiwo.controller;

import com.example.rungiwo.dto.*;
import com.example.rungiwo.service.ContractorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/contractors")
public class ContractorController {

    private final ContractorService service;

    public ContractorController(ContractorService service) {
        this.service = service;
    }

    @Operation(summary = "Create subcontractor company")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContractorResponse create(@Valid @RequestBody CreateContractorRequest req) {
        return service.create(req);
    }

    @Operation(summary = "Get all subcontractor companies")
    @GetMapping
    public List<ContractorResponse> list() {
        return service.list();
    }

    @Operation(summary = "Get subcontractor company by ID")
    @GetMapping("/{id}")
    public ContractorResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    @Operation(summary = "Delete subcontractor company")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
