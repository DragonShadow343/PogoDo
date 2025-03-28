package com.backend.api.Model.DTO;

import java.time.LocalDateTime;

public class NotificationResponse {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private String taskTitle;
    private Long taskId;
    private Integer recipientId;

    public NotificationResponse(Long id, String content, LocalDateTime createdAt,
                                String taskTitle, Long taskId, Integer recipientId) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.taskTitle = taskTitle;
        this.taskId = taskId;
        this.recipientId = recipientId;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getTaskTitle() { return taskTitle; }
    public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }

    public Long getTaskId() { return taskId; }
    public void setTaskId(Long taskId) { this.taskId = taskId; }

    public Integer getRecipientId() { return recipientId; }
    public void setRecipientId(Integer recipientId) { this.recipientId = recipientId; }
}
