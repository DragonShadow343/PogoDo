package com.backend.api.Model.DTO;

public class NotificationRequest {
    private String taskTitle;
    private int priorityStatus;
    private Long taskId;
    private Integer recipientId;

    // Getters and setters
    public String getTaskTitle() {
        return taskTitle;
    }
    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }
    
    public int getPriorityStatus() {
        return priorityStatus;
    }
    public void setPriorityStatus(int priorityStatus) {
        this.priorityStatus = priorityStatus;
    }
    
    public Long getTaskId() {
        return taskId;
    }
    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
    
    public Integer getRecipientId() {
        return recipientId;
    }
    public void setRecipientId(Integer recipientId) {
        this.recipientId = recipientId;
    }
}
