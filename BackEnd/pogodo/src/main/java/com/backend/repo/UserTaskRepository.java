package com.backend.repo;

import com.backend.api.Model.UserTask;
import com.backend.api.Model.UserTaskId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTaskRepository extends JpaRepository<UserTask, UserTaskId> {

    List<UserTask> findByIdTaskId(Integer taskId);

    // Custom deletion method for bulk removal
    void deleteByIdTaskIdAndIdUserId(Integer taskId, Integer userId);

    // Custom query to find all tasks assigned to a user
    List<UserTask> findByIdUserId(Integer userId);
}