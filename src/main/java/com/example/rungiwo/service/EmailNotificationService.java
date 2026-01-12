package com.example.rungiwo.service;

import com.example.rungiwo.domain.WorkOrder;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("prod")
public class EmailNotificationService implements NotificationService {

    @Override
    public void notifyWorkOrderCreated(WorkOrder workOrder) {
        System.out.println("[EMAIL] Sending notification for: " + workOrder.getTitle());
    }
}
