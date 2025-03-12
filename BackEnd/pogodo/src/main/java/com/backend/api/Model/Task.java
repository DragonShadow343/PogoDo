package com.backend.api.Model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskId;
    @Column(nullable = false)
    private int priorityStatus;
    private LocalDate dueDate;
    private String taskTitle;
    private String taskDescription;
    private boolean completionStatus;
    private boolean lockStatus;

    public Task() {}

    public Task(int taskId, int priorityStatus, LocalDate dueDate, String taskTitle, String description, boolean completed, boolean lockStatus) {
        this.taskId = taskId;
        this.priorityStatus = priorityStatus;
        this.dueDate = dueDate;
        this.taskTitle = taskTitle;
        this.taskDescription = description;
        this.completionStatus = completed;
        this.lockStatus = lockStatus;
    }

    public Task(String taskTitle, String taskDescription) {
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
    }

    public int getId() {
        return taskId;
    }

    public void setId(int taskId) {
        this.taskId = taskId;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        String dateString = dueDate.toString();
        if (dateString == null || dateString.isEmpty()) {
            throw new IllegalArgumentException("Due date cannot be null");
        }
        this.dueDate = dueDate;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        if (taskTitle == null || taskTitle.isEmpty()) {
            throw new IllegalArgumentException("Task Title cannot be null");
        }
        this.taskTitle = taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        if (taskDescription == null || taskDescription.isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null");
        }
        this.taskDescription = taskDescription;
    }

    public int getPriority() {
        return priorityStatus;
    }

    public void setPriority(int priorityStatus) {
        if (priorityStatus < 1 || priorityStatus > 5) {
            throw new IllegalArgumentException("Priority must be between 1 and 5");
        }
        this.priorityStatus = priorityStatus;
    }

    public boolean getCompleted() {
        return completionStatus;
    }

    public void setCompleted(boolean completed) {
        this.completionStatus = completed;
    }

    public void setLockStatus(boolean lockStatus) {
        this.lockStatus = lockStatus;
    }

    public boolean getLockStatus() {
        return lockStatus;
    }

    @Override
    public String toString() {
        return "Task{" +
               "id=" + taskId +
               ", priority=" + priorityStatus +
               ", dueDate='" + dueDate + '\'' +
               ", taskTitle='" + taskTitle + '\'' +
               ", description='" + taskDescription + '\'' +
               ", completionStatus=" + completionStatus +
               ", lockStatus=" + lockStatus +
               '}';
    }
}
