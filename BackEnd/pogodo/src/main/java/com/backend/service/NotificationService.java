package com.backend.service;

import com.backend.repo.NotificationRepository;
import com.backend.api.Model.Notification;
import com.backend.api.Model.DTO.NotificationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(NotificationRepository notificationRepository, 
                               SimpMessagingTemplate messagingTemplate) {
        this.notificationRepository = notificationRepository;
        this.messagingTemplate = messagingTemplate;
    }

    // Updated sendNotification with logging
    public void sendNotification(String taskTitle, int priorityStatus, Long taskId, Integer recipientId) {
        // Logging to confirm the method is called with the correct parameters
        System.out.println("Sending notification for task '" + taskTitle + "' (ID: " + taskId 
                           + ") with priority " + priorityStatus + " to recipient " + recipientId);

        String priorityText = convertPriorityToText(priorityStatus);
        String messageContent = "You’ve been assigned a new " +priorityText + " priority task, " + taskTitle + "!";

        
        // Create and persist the notification with recipientId
        Notification notification = new Notification(messageContent, recipientId);
        notificationRepository.save(notification);
        
        // Build response DTO (if needed on WebSocket side)
        NotificationResponse response = new NotificationResponse(
            messageContent,
            notification.getCreatedAt(),
            taskTitle,
            priorityStatus
        );
        messagingTemplate.convertAndSend("/topic/notifications", response);
    }

    private String convertPriorityToText(int priorityStatus) {
        switch (priorityStatus) {
            case 1: return "low";
            case 2: return "medium";
            case 3: return "high";
            default: return "unknown";
        }
    }

    // Retrieve notifications for a specific user
    public List<Notification> getNotificationsByRecipient(Integer recipientId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(recipientId);
    }

    // Delete a notification (could add recipient check if needed)
    public void deleteNotification(Long notificationId, Integer recipientId) {
        notificationRepository.deleteById(notificationId);
    }
}
