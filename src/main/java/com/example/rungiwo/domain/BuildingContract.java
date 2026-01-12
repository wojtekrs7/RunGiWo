package com.example.rungiwo.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "building_contracts")
public class BuildingContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Building building;

    @ManyToOne
    private ContractorCompany contractor;

    private String scope;

    @Enumerated(EnumType.STRING)
    private ContractStatus status = ContractStatus.ACTIVE;

    protected BuildingContract() {}

    public BuildingContract(Building building, ContractorCompany contractor, String scope) {
        this.building = building;
        this.contractor = contractor;
        this.scope = scope;
    }

    public Long getId() { return id; }
    public Building getBuilding() { return building; }
    public ContractorCompany getContractor() { return contractor; }
    public String getScope() { return scope; }
    public ContractStatus getStatus() { return status; }
}
