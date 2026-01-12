package com.example.rungiwo.repository;

import com.example.rungiwo.domain.BuildingContract;
import com.example.rungiwo.domain.ContractStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<BuildingContract, Long> {
    List<BuildingContract> findByBuilding_Id(Long buildingId);

    Optional<BuildingContract> findByBuilding_IdAndContractor_IdAndScopeAndStatus(
            Long buildingId, Long contractorId, String scope, ContractStatus status
    );

    boolean existsByBuilding_IdAndScopeAndStatus(Long buildingId, String scope, ContractStatus status);
}
