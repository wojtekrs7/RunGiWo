package com.example.rungiwo.service;

import com.example.rungiwo.domain.*;
import com.example.rungiwo.dto.CreateWorkOrderRequest;
import com.example.rungiwo.dto.UpdateWorkOrderRequest;
import com.example.rungiwo.dto.UpdateWorkOrderStatusRequest;
import com.example.rungiwo.dto.WorkOrderResponse;
import com.example.rungiwo.exception.NotFoundException;
import com.example.rungiwo.repository.WorkOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkOrderService {

    private final WorkOrderRepository repo;
    private final BuildingService buildingService;
    private final ContractorService contractorService;
    private final ContractService contractService;
    private final NotificationService notificationService;

    public WorkOrderService(WorkOrderRepository repo,
                            BuildingService buildingService,
                            ContractorService contractorService,
                            ContractService contractService,
                            NotificationService notificationService) {
        this.repo = repo;
        this.buildingService = buildingService;
        this.contractorService = contractorService;
        this.contractService = contractService;
        this.notificationService = notificationService;
    }

    public WorkOrderResponse create(Long buildingId, CreateWorkOrderRequest req) {
        Building building = buildingService.getEntity(buildingId);
        ContractorCompany contractor = contractorService.getEntity(req.contractorId());

//        contractService.requireActiveContract(buildingId, req.contractorId(), req.scope());

        WorkOrder saved = repo.save(
                new WorkOrder(building, contractor, req.title(), req.description(), req.priority())
        );
        notificationService.notifyWorkOrderCreated(saved);

        return toResponse(saved);
    }

    public WorkOrderResponse get(Long id) {
        return toResponse(getEntity(id));
    }

    public List<WorkOrderResponse> listForBuilding(Long buildingId, WorkOrderStatus status) {
        buildingService.getEntity(buildingId);

        List<WorkOrder> list = (status == null)
                ? repo.findByBuilding_Id(buildingId)
                : repo.findByBuilding_IdAndStatus(buildingId, status);

        return list.stream().map(this::toResponse).toList();
    }

    public WorkOrderResponse updateStatus(Long id, UpdateWorkOrderStatusRequest req) {
        WorkOrder wo = getEntity(id);
        wo.setStatus(req.status());
        WorkOrder saved = repo.save(wo);
        return toResponse(saved);
    }

    public WorkOrderResponse update(Long id, UpdateWorkOrderRequest req) {
        WorkOrder wo = getEntity(id);

        Long buildingId = wo.getBuilding().getId();
        ContractorCompany contractor = contractorService.getEntity(req.contractorId());

//        contractService.requireActiveContract(buildingId, req.contractorId(), req.scope());

        wo.setContractor(contractor);
        wo.setTitle(req.title());
        wo.setDescription(req.description());
        wo.setPriority(req.priority());

        WorkOrder saved = repo.save(wo);
        return toResponse(saved);
    }

    public void delete(Long id) {
        repo.delete(getEntity(id));
    }

    private WorkOrder getEntity(Long id) {
        return repo.findById(id).orElseThrow(() -> new NotFoundException("WorkOrder not found: " + id));
    }

    private WorkOrderResponse toResponse(WorkOrder wo) {
        return new WorkOrderResponse(
                wo.getId(),
                wo.getBuilding().getId(),
                wo.getContractor().getId(),
                wo.getTitle(),
                wo.getDescription(),
                wo.getPriority(),
                wo.getStatus(),
                wo.getCreatedAt()
        );
    }
}
