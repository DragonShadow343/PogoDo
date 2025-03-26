package com.backend.api.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.backend.service.NotificationService;
import com.backend.api.Model.Notification;

@RestController
@RequestMapping("/Notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // GET endpoint to fetch notifications for a specific user
    @GetMapping("/{userId}")
    public List<Notification> getNotifications(@PathVariable Integer userId) {
        return notificationService.getNotificationsByRecipient(userId);
    }

    // DELETE endpoint to remove a notification for a specific user
    @DeleteMapping("/{userId}/{notificationId}")
    public void deleteNotification(@PathVariable Integer userId, @PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId, userId);
    }
}
