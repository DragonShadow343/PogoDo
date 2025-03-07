package com.backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.api.Model.Task;

// This interface extends JpaRepository to automatically provide CRUD operations
public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findByTaskName(String string);
    // You can add custom query methods here if necessary (e.g., find by priority, task name, etc.)

    @Query("SELECT t FROM Task t WHERE t.dueDate = :date AND t.priorityStatus = :priority")
List<Task> findTasksByDateAndPriority(@Param("date") String date, @Param("priority") Integer priority);



}
