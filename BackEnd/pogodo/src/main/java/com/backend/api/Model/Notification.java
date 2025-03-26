package com.backend.api.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String content;
    private LocalDateTime createdAt;

    
    private Integer recipientId;

    
    public Notification() {}


    public Notification(String content, Integer recipientId) {
        this.content = content;
        this.recipientId = recipientId;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }

    public Integer getRecipientId() { return recipientId; }
    public void setRecipientId(Integer recipientId) { this.recipientId = recipientId; }

    @Override
    public String toString() {
        return "Notification [id=" + id + ", content=" + content + 
               ", createdAt=" + createdAt + ", recipientId=" + recipientId + "]";
    }
}
