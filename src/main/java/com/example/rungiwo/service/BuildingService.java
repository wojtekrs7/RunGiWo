package com.example.rungiwo.service;

import com.example.rungiwo.domain.Building;
import com.example.rungiwo.dto.*;
import com.example.rungiwo.exception.NotFoundException;
import com.example.rungiwo.repository.BuildingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {

    private final BuildingRepository repo;

    public BuildingService(BuildingRepository repo) {
        this.repo = repo;
    }

    public BuildingResponse create(CreateBuildingRequest req) {
        Building saved = repo.save(new Building(req.name(), req.address()));
        return toResponse(saved);
    }

    public List<BuildingResponse> list() {
        return repo.findAll().stream().map(this::toResponse).toList();
    }

    public BuildingResponse get(Long id) {
        return toResponse(getEntity(id));
    }

    public BuildingResponse update(Long id, UpdateBuildingRequest req) {
        Building b = getEntity(id);
        b = repo.save(new Building(req.name(), req.address()));
        return toResponse(b);
    }

    public void delete(Long id) {
        Building b = getEntity(id);
        repo.delete(b);
    }

    public Building getEntity(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("Building not found: " + id));
    }

    private BuildingResponse toResponse(Building b) {
        return new BuildingResponse(b.getId(), b.getName(), b.getAddress());
    }
}
