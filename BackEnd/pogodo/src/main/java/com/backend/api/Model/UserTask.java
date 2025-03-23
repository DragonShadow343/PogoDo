package com.backend.api.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "UserTasks")
public class UserTask {

    @EmbeddedId
    private UserTaskId id;

    public UserTask() {}

    public UserTask(UserTaskId id) {
        this.id = id;
    }

    public UserTaskId getId() {
        return id;
    }

    public void setId(UserTaskId id) {
        this.id = id;
    }
}
