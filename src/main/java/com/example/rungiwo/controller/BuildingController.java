package com.example.rungiwo.controller;

import com.example.rungiwo.dto.*;
import com.example.rungiwo.service.BuildingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;

import java.util.List;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

    private final BuildingService service;

    public BuildingController(BuildingService service) {
        this.service = service;
    }

    @Operation(summary = "Create a new building")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BuildingResponse create(@Valid @RequestBody CreateBuildingRequest req) {
        return service.create(req);
    }

    @Operation(summary = "Get all buildings")
    @GetMapping
    public List<BuildingResponse> list() {
        return service.list();
    }

    @Operation(summary = "Get building by ID")
    @GetMapping("/{id}")
    public BuildingResponse get(@PathVariable Long id) {
        return service.get(id);
    }

    @Operation(summary = "Update building")
    @PutMapping("/{id}")
    public BuildingResponse update(@PathVariable Long id,
                                   @Valid @RequestBody UpdateBuildingRequest req) {
        return service.update(id, req);
    }

    @Operation(summary = "Delete building")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
