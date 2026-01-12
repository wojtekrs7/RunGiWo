package com.example.rungiwo.service;

import com.example.rungiwo.domain.WorkOrder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
public class MockNotificationService implements NotificationService {

    @Override
    public void notifyWorkOrderCreated(WorkOrder workOrder) {
        System.out.println("[DEV] Work order created: " + workOrder.getTitle());
    }
}
