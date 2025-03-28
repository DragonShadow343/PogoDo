package com.backend.TestClasses;

import com.backend.api.Model.Notification;
import com.backend.repo.NotificationRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("h2")
public class NotificationRepositoryTest {

    @Autowired
    private NotificationRepository notificationRepository;

    private Notification notification1;
    private Notification notification2;

    @BeforeEach
    public void setUp() {
        notification1 = new Notification("You’ve been assigned a high priority task!", 42);
        notification1.setCreatedAt(LocalDateTime.now());

        notification2 = new Notification("Another task for you.", 42);
        notification2.setCreatedAt(LocalDateTime.now().minusMinutes(10));

        notificationRepository.save(notification1);
        notificationRepository.save(notification2);
    }

    @Test
    public void testFindByRecipientIdOrderByCreatedAtDesc() {
        List<Notification> notifications = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(42);
        assertEquals(2, notifications.size());
        assertTrue(notifications.get(0).getCreatedAt().isAfter(notifications.get(1).getCreatedAt()));
    }

    @AfterEach
    public void tearDown() {
        notificationRepository.deleteAll();
    }
}
