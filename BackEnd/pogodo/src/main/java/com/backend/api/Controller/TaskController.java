package com.backend.api.Controller;

import com.backend.api.Model.Task;
import com.backend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/Tasks")
public class TaskController {

    private final TaskService taskService;

    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Integer id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Create a new task
    @PostMapping("/createtask")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        System.out.println("Received with Priority Status: " + task.toString());
        Task createdTask = taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    // Update an existing task
    @PutMapping("/{id}")
        public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task updatedTask) {
        Optional<Task> existingTaskOptional = taskService.getTaskById(id);
        
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();
            
            // ✅ Preserve other fields, only update completed
            if (Boolean.TRUE.equals(updatedTask.getCompleted())) {
                existingTask.setCompleted(updatedTask.getCompleted());
            }
            
            Task savedTask = taskService.saveTask(existingTask);
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        Optional<Task> existingTask = taskService.getTaskById(id);
        if (existingTask.isPresent()) {
            taskService.deleteTask(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Expects a JSON payload with an array of user IDs, e.g.: [1, 2, 3]
    @PostMapping("/{id}/assign")
    public ResponseEntity<?> assignUsersToTask(@PathVariable Integer id, @RequestBody List<Integer> userIds) {
        try {
            taskService.updateTaskAssignments(id, userIds);
            return ResponseEntity.ok(Map.of("status", "success", "taskId", id, "assignedUsers", userIds));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/filtered")
    public ResponseEntity<?> getTasksForUser(@RequestParam("userId") Integer userId) {
        try {
            List<Task> tasks = taskService.getTasksForUser(userId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

}
