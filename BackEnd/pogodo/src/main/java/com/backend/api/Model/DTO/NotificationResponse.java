package com.backend.api.Model.DTO;

import java.time.LocalDateTime;

public class NotificationResponse {
    private String content;
    private LocalDateTime timestamp;
    private String taskTitle;
    private int priorityStatus;

    public NotificationResponse(String content, LocalDateTime timestamp, String taskTitle, int priorityStatus) {
        this.content = content;
        this.timestamp = timestamp;
        this.taskTitle = taskTitle;
        this.priorityStatus = priorityStatus;
    }

    // Getters and setters...
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getTaskTitle() { return taskTitle; }
    public void setTaskTitle(String taskTitle) { this.taskTitle = taskTitle; }

    public int getPriorityStatus() { return priorityStatus; }
    public void setPriorityStatus(int priorityStatus) { this.priorityStatus = priorityStatus; }
}
