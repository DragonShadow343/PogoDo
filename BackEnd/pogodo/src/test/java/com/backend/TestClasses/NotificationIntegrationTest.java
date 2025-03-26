package com.backend.TestClasses;

import com.backend.api.Model.Notification;
import com.backend.repo.NotificationRepository;
import com.backend.service.NotificationService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("h2")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class NotificationIntegrationTest {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private NotificationService notificationService;

    private static final int RECIPIENT_ID = 42;
    private static final String TASK_TITLE = "Integration Test Task";
    private static final int PRIORITY = 3;
    private static final long TASK_ID = 101;

    @BeforeEach
    public void setup() {
        notificationRepository.deleteAll(); // Clean before each test
    }

    @Test
    public void testSendNotificationAndPersistence() {
        notificationService.sendNotification(TASK_TITLE, PRIORITY, TASK_ID, RECIPIENT_ID);
        List<Notification> notifications = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(RECIPIENT_ID);

        assertEquals(1, notifications.size());
        Notification n = notifications.get(0);
        assertEquals(RECIPIENT_ID, n.getRecipientId());
        assertTrue(n.getContent().contains("assigned"));
        assertNotNull(n.getCreatedAt());
    }

    @Test
    public void testMultipleNotificationsOrdering() {
        notificationService.sendNotification("First", 1, 1L, RECIPIENT_ID);
        notificationService.sendNotification("Second", 2, 2L, RECIPIENT_ID);
        notificationService.sendNotification("Third", 3, 3L, RECIPIENT_ID);

        List<Notification> notifications = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(RECIPIENT_ID);
        assertEquals(3, notifications.size());
        assertTrue(notifications.get(0).getContent().contains("Third"));
        assertTrue(notifications.get(1).getContent().contains("Second"));
        assertTrue(notifications.get(2).getContent().contains("First"));
    }

    @Test
    public void testDeleteNotification() {
        notificationService.sendNotification("ToDelete", PRIORITY, TASK_ID, RECIPIENT_ID);
        Notification n = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(RECIPIENT_ID).get(0);

        notificationService.deleteNotification(n.getId(), RECIPIENT_ID);
        Optional<Notification> deleted = notificationRepository.findById(n.getId());

        assertFalse(deleted.isPresent());
    }

    @Test
    public void testNoNotificationsForUnknownUser() {
        List<Notification> notifications = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(999);
        assertTrue(notifications.isEmpty());
    }
}
