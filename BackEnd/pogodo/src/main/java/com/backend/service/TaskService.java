package com.backend.service;

import com.backend.api.Model.Task;
import com.backend.api.Model.User;
import com.backend.api.Model.UserTask;
import com.backend.api.Model.UserTaskId;
import com.backend.repo.TaskRepository;
import com.backend.repo.UserTaskRepository;
import com.backend.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class TaskService {

    
    private TaskRepository taskRepository;
    private final UserTaskRepository userTaskRepository;
    private final UserService userService;
    
    @Autowired
    public TaskService(TaskRepository taskRepository, UserTaskRepository userTaskRepository, UserService userService) {
        this.taskRepository = taskRepository;
        this.userTaskRepository = userTaskRepository;
        this.userService = userService;
    }

    // Method to get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    // Method to save a new task
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    // Method to get a task by ID
    public Optional<Task> getTaskById(Integer id) {
        return taskRepository.findById(id);
    }

    // Method to delete a task by ID
    public void deleteTask(Integer id) {
        taskRepository.deleteById(id);
    }

    /**
     * Update the assignments for a given task.
     * @param taskId The ID of the task to update.
     * @param newUserIds List of user IDs to assign.
     */
    @Transactional
    public void updateTaskAssignments(Integer taskId, List<Integer> newUserIds) {
        // Ensure the task exists
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        // Retrieve current assignments for this task
        List<UserTask> currentAssignments = userTaskRepository.findByIdTaskId(taskId);
        Set<Integer> currentUserIds = currentAssignments.stream()
                .map(ut -> ut.getId().getUserId())
                .collect(Collectors.toSet());

        // Remove duplicates from the incoming list
        Set<Integer> newUserIdsSet = new HashSet<>(newUserIds);
        
        System.out.println("Task " + taskId + " assigned to User(s) with Id: " );

        // Process additions: For each new user, add an assignment if it doesn't exist
        for (Integer userId : newUserIdsSet) {
            if (!currentUserIds.contains(userId)) {
                UserTaskId newAssignmentId = new UserTaskId(taskId, userId);
                // Extra safety: Check directly if the assignment exists in the repo
                if (!userTaskRepository.existsById(newAssignmentId)) {
                    userTaskRepository.save(new UserTask(newAssignmentId));
                    System.out.println(userId);
                }
            }
        }

        // Process removals: Remove assignments that are not in the new list
        for (Integer userId : currentUserIds) {
            if (!newUserIdsSet.contains(userId)) {
                userTaskRepository.deleteByIdTaskIdAndIdUserId(taskId, userId);
            }
        }

    }

    /**
     * Returns tasks for a given user.
     * If the user is admin, all tasks are returned.
     * Otherwise, only tasks that are assigned to that user are returned.
     */
    public List<Task> getTasksForUser(Integer userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    
        List<Task> tasks;
        if ("admin".equalsIgnoreCase(user.getUserRole())) {
            tasks = taskRepository.findAll();
        } else {
            // Get UserTasks where the userId matches
            List<UserTask> assignments = userTaskRepository.findByIdUserId(userId);
            // Extract task IDs
            Set<Integer> taskIds = assignments.stream()
                    .map(ut -> ut.getId().getTaskId())
                    .collect(Collectors.toSet());
            // Query tasks by IDs
            tasks = new ArrayList<>();
            for (Integer id : taskIds) {
                taskRepository.findById(id).ifPresent(tasks::add);
            }
        }
        
        // For every task retrieved, populate the transient 'assignedTo' field
        for (Task task : tasks) {
            List<UserTask> taskAssignments = userTaskRepository.findByIdTaskId(task.getId());
            List<Integer> assignedUserIds = taskAssignments.stream()
                    .map(ut -> ut.getId().getUserId())
                    .collect(Collectors.toList());
            task.setAssignedTo(assignedUserIds);
        }
        
        return tasks;
    }
    

}
