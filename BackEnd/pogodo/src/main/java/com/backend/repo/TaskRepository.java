package com.backend.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.api.Model.Task;

// This interface extends JpaRepository to automatically provide CRUD operations
public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findByTaskTitle(String string);



}
