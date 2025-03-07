package com.backend.api.Model;

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
    private int id;

    private int priorityStatus;
    private String dueDate;
    private String taskName;
    private String description;
    private boolean completionStatus;
    private boolean lockStatus;

    public Task() {}

    public Task(int id, int priority, String dueDate, String taskName, String description, boolean completed, boolean lockStatus) {
        this.id = id;
        this.priorityStatus = priority;
        this.dueDate = dueDate;
        this.taskName = taskName;
        this.description = description;
        this.completionStatus = completed;
        this.lockStatus = lockStatus;
    }

    public Task(String taskName, String description) {
        this.taskName = taskName;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        if (dueDate == null || dueDate.isEmpty()) {
            throw new IllegalArgumentException("Due date cannot be null");
        }
        this.dueDate = dueDate;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        if (taskName == null || taskName.isEmpty()) {
            throw new IllegalArgumentException("Task Name cannot be null");
        }
        this.taskName = taskName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description == null || description.isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null");
        }
        this.description = description;
    }

    public int getPriority() {
        return priorityStatus;
    }

    public void setPriority(int priority) {
        if (priority < 1 || priority > 5) {
            throw new IllegalArgumentException("Priority must be between 1 and 5");
        }
        this.priorityStatus = priority;
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
               "id=" + id +
               ", priority=" + priorityStatus +
               ", dueDate='" + dueDate + '\'' +
               ", taskName='" + taskName + '\'' +
               ", description='" + description + '\'' +
               ", completionStatus=" + completionStatus +
               ", lockStatus=" + lockStatus +
               '}';
    }
}
