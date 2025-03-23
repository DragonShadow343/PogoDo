package com.backend.api.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserTaskId implements Serializable {

    @Column(name = "taskId")
    private Integer taskId;

    @Column(name = "userId")
    private Integer userId;

    public UserTaskId() {}

    public UserTaskId(Integer taskId, Integer userId) {
        this.taskId = taskId;
        this.userId = userId;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserTaskId)) return false;
        UserTaskId that = (UserTaskId) o;
        return Objects.equals(taskId, that.taskId) &&
               Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(taskId, userId);
    }
}
