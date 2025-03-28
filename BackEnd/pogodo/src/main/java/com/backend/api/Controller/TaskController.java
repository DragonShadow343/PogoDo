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

    
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Integer id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
    @PostMapping("/createtask")
    public ResponseEntity<Task> createTask(@RequestBody Task task) { 
        System.out.println("Received with username: " + task.toString());
        
        //saves task to database
        Task createdTask = taskService.saveTask(task);
        //int userId;
        //use username to retrieve userId
          //  Optional<User> userOptional = userService.getUserByUsername(username);
      //  if(userOptional.isPresent()){
       //     User user = userOptional.get();
       //     userId = user.getUserId();
      //  }else{System.out.println("User not found");}


        //TODO: Insert method that saves Userid and taskId to UserTasks - references taskService.java

        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    
    @PostMapping("/addAssignment")
    public ResponseEntity<String> addAssignment(@RequestParam String username, @RequestParam String taskTitle){
        
        if(username==null || taskTitle ==null){
            return ResponseEntity.badRequest().body("Username or taskId is missing.");
        }
        
        System.out.println("Received username: " + username);
        System.out.println("Received taskTitle: " + taskTitle);

        
        Optional<User> userOptional = userService.getUserByUsername(username);
        Optional<Task> taskOptional = taskService.getTaskByTitle(taskTitle);
       
        if(userOptional.isPresent() && taskOptional.isPresent()){
            User user = userOptional.get();
            int userId = user.getUserId();
            Task task = taskOptional.get();
            int taskId = task.getId();

            System.out.println("Received userId: " + userId);
            System.out.println("Received taskId: " + taskId);

            

            user.getTasks().add(task);
            task.getUsers().add(user);

            userService.saveUser(user);
            taskService.saveTask(task);
        }
        return ResponseEntity.status(HttpStatus.OK).body("Task assigned successfully to user.");
    }

    
    @PutMapping("/{id}")
        public ResponseEntity<Task> updateTask(@PathVariable Integer id, @RequestBody Task updatedTask) {
        Optional<Task> existingTaskOptional = taskService.getTaskById(id);
        
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();
            
    
            if (Boolean.TRUE.equals(updatedTask.getCompleted())) {
                existingTask.setCompleted(updatedTask.getCompleted());
            }
            
            Task savedTask = taskService.saveTask(existingTask);
            return ResponseEntity.ok(savedTask);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
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
