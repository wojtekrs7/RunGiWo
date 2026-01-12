package com.example.rungiwo.service;

import com.example.rungiwo.domain.WorkOrder;

public interface NotificationService {
    void notifyWorkOrderCreated(WorkOrder workOrder);
}
