package com.example.rungiwo.domain;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "work_orders")
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Building building;

    @ManyToOne
    private ContractorCompany contractor;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private WorkOrderStatus status = WorkOrderStatus.NEW;

    private Instant createdAt = Instant.now();

    protected WorkOrder() {}

    public WorkOrder(Building building, ContractorCompany contractor,
                     String title, String description, Priority priority) {
        this.building = building;
        this.contractor = contractor;
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    public Long getId() { return id; }
    public Building getBuilding() { return building; }
    public ContractorCompany getContractor() { return contractor; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public Priority getPriority() { return priority; }
    public WorkOrderStatus getStatus() { return status; }
    public Instant getCreatedAt() { return createdAt; }

    public void setStatus(WorkOrderStatus status) {
        this.status = status;
    }
}
