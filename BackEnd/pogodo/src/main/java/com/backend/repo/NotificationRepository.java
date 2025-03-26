package com.backend.repo;

import com.backend.api.Model.Notification;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // New method to find notifications by recipient id
    List<Notification> findByRecipientIdOrderByCreatedAtDesc(Integer recipientId);
}
