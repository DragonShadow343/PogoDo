package com.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.api.Model.Task;

// This interface extends JpaRepository to automatically provide CRUD operations
public interface TaskRepository extends JpaRepository<Task, Integer> {
    // You can add custom query methods here if necessary (e.g., find by priority, task name, etc.)
}
