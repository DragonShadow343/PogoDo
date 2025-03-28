package com.backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.api.Model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findByTaskTitle(String string);


}
