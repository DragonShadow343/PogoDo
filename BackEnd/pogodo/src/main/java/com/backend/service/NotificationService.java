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

    public void sendNotification(String taskTitle, int priorityStatus, Long taskId, Integer recipientId) {
        System.out.println("Sending notification for task '" + taskTitle + "' (ID: " + taskId +
                ") with priority " + priorityStatus + " to recipient " + recipientId);

        String priorityText = convertPriorityToText(priorityStatus);
        String messageContent = "You’ve been assigned a new " + priorityText + " priority task, " + taskTitle + "!";

        // Save to database
        Notification notification = new Notification(messageContent, recipientId);
        notificationRepository.save(notification);

        // Build full response for WebSocket broadcast
        NotificationResponse response = new NotificationResponse(
                notification.getId(),
                messageContent,
                notification.getCreatedAt(),
                taskTitle,
                taskId,
                recipientId
        );

        // Send to WebSocket topic
        messagingTemplate.convertAndSend("/topic/notifications", response);
    }

    private String convertPriorityToText(int priorityStatus) {
        return switch (priorityStatus) {
            case 1 -> "low";
            case 2 -> "medium";
            case 3 -> "high";
            default -> "unknown";
        };
    }

    public List<Notification> getNotificationsByRecipient(Integer recipientId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(recipientId);
    }

    public void deleteNotification(Long notificationId, Integer recipientId) {
        notificationRepository.deleteById(notificationId);
    }
}
