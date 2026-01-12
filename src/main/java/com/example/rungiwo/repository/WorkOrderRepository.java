package com.example.rungiwo.repository;

import com.example.rungiwo.domain.WorkOrder;
import com.example.rungiwo.domain.WorkOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {
    List<WorkOrder> findByBuilding_Id(Long buildingId);
    List<WorkOrder> findByBuilding_IdAndStatus(Long buildingId, WorkOrderStatus status);
}
