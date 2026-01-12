package com.example.rungiwo.service;

import com.example.rungiwo.domain.*;
import com.example.rungiwo.dto.AssignContractRequest;
import com.example.rungiwo.dto.ContractResponse;
import com.example.rungiwo.exception.BadRequestException;
import com.example.rungiwo.exception.NotFoundException;
import com.example.rungiwo.repository.ContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    private final ContractRepository repo;
    private final BuildingService buildingService;
    private final ContractorService contractorService;

    public ContractService(ContractRepository repo,
                           BuildingService buildingService,
                           ContractorService contractorService) {
        this.repo = repo;
        this.buildingService = buildingService;
        this.contractorService = contractorService;
    }

    public ContractResponse assign(Long buildingId, AssignContractRequest req) {
        Building building = buildingService.getEntity(buildingId);
        ContractorCompany contractor = contractorService.getEntity(req.contractorId());

        if (repo.existsByBuilding_IdAndScopeAndStatus(buildingId, req.scope(), ContractStatus.ACTIVE)) {
            throw new BadRequestException("Active contract for scope '" + req.scope() + "' already exists in building " + buildingId);
        }

        BuildingContract saved = repo.save(new BuildingContract(building, contractor, req.scope()));
        return toResponse(saved);
    }

    public List<ContractResponse> listForBuilding(Long buildingId) {
        buildingService.getEntity(buildingId);
        return repo.findByBuilding_Id(buildingId).stream().map(this::toResponse).toList();
    }

    public void requireActiveContract(Long buildingId, Long contractorId, String scope) {
        repo.findByBuilding_IdAndContractor_IdAndScopeAndStatus(buildingId, contractorId, scope, ContractStatus.ACTIVE)
                .orElseThrow(() -> new NotFoundException("No ACTIVE contract for building=" + buildingId +
                        ", contractor=" + contractorId + ", scope=" + scope));
    }

    private ContractResponse toResponse(BuildingContract c) {
        return new ContractResponse(
                c.getId(),
                c.getBuilding().getId(),
                c.getContractor().getId(),
                c.getScope(),
                c.getStatus()
        );
    }
}
