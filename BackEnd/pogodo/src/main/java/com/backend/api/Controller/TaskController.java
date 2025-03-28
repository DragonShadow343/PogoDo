package com.backend.api.Controller;

import com.backend.api.Model.Task;
import com.backend.api.Model.User;
import com.backend.service.TaskService;
import com.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private UserService userService;

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
        return task.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Create a new task
    @PostMapping("/createtask")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        System.out.println("Received with taskTitle: " + task.toString());
        Task createdTask = taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    // Add userId and taskId to UserTasks table
    @PostMapping("/addAssignment")
    public ResponseEntity<String> addAssignment(@RequestParam String username, @RequestParam String taskTitle) {
        if (username == null || taskTitle == null) {
            return ResponseEntity.badRequest().body("Username or taskTitle is missing.");
        }

        Optional<User> userOptional = userService.getUserByUsername(username);
        Optional<Task> taskOptional = taskService.getTaskByTitle(taskTitle);

        if (userOptional.isPresent() && taskOptional.isPresent()) {
            User user = userOptional.get();
            Task task = taskOptional.get();

            user.getTasks().add(task);
            task.getUsers().add(user);

            userService.updateUser(user);  // ✅ Safe update
            taskService.saveTask(task);

            return ResponseEntity.status(HttpStatus.OK).body("Task assigned successfully to user.");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Task not found.");
    }

    // Update an existing task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task updatedTask) {
        Optional<Task> existingTaskOptional = taskService.getTaskById(id);

        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();

            if (updatedTask.getCompleted() != existingTask.getCompleted()) {
                existingTask.setCompleted(updatedTask.getCompleted());
            }

            Task savedTask = taskService.saveTask(existingTask);
            return ResponseEntity.ok(savedTask);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Toggle Completion Status
    @PutMapping("/{id}/toggleComplete")
    public ResponseEntity<Task> toggleComplete(@PathVariable Integer id) {
        Optional<Task> optionalTask = taskService.getTaskById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Task task = optionalTask.get();
        task.setCompleted(!task.getCompleted());
        Task updatedTask = taskService.saveTask(task);
        return ResponseEntity.ok(updatedTask);
    }

    // Toggle Lock Status
    @PutMapping("/{id}/toggleLock")
    public ResponseEntity<Task> toggleLock(@PathVariable Integer id) {
        Optional<Task> optionalTask = taskService.getTaskById(id);
        if (optionalTask.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Task task = optionalTask.get();
        task.setLockStatus(!task.getLockStatus());
        Task updatedTask = taskService.saveTask(task);
        return ResponseEntity.ok(updatedTask);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        Optional<Task> existingTask = taskService.getTaskById(id);
        if (existingTask.isPresent()) {
            taskService.deleteTask(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    // Assign users to a task
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

    // Filtered tasks for logged-in user
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
