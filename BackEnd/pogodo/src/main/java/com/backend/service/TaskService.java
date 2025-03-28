package com.backend.service;

import com.backend.api.Model.Task;
import com.backend.api.Model.User;
import com.backend.api.Model.UserTask;
import com.backend.api.Model.UserTaskId;
import com.backend.repo.TaskRepository;
import com.backend.repo.UserTaskRepository;
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
    private final NotificationService notificationService;

    public TaskService(TaskRepository taskRepository, UserTaskRepository userTaskRepository, 
        UserService userService, NotificationService notificationService) {
    this.taskRepository = taskRepository;
    this.userTaskRepository = userTaskRepository;
    this.userService = userService;
    this.notificationService = notificationService;
    }


    
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

               
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    
    public Optional<Task> getTaskById(Integer id) {
        return taskRepository.findById(id);
    }

    
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
    
    Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

    
    List<UserTask> currentAssignments = userTaskRepository.findByIdTaskId(taskId);
    Set<Integer> currentUserIds = currentAssignments.stream()
            .map(ut -> ut.getId().getUserId())
            .collect(Collectors.toSet());

    
    Set<Integer> newUserIdsSet = new HashSet<>(newUserIds);

    System.out.println("Task " + taskId + " assigned to User(s) with Id: " + newUserIdsSet);

    
    for (Integer userId : newUserIdsSet) {
        
        if (!currentUserIds.contains(userId)) {
            UserTaskId newAssignmentId = new UserTaskId(taskId, userId);
            if (!userTaskRepository.existsById(newAssignmentId)) {
                userTaskRepository.save(new UserTask(newAssignmentId));
                System.out.println("New assignment added for user " + userId);
            }
        }
        
        notificationService.sendNotification(
            task.getTaskTitle(),      
            task.getPriorityStatus(), 
            (long) task.getId(),      
            userId                  
        );
    }

    
    for (Integer userId : currentUserIds) {
        if (!newUserIdsSet.contains(userId)) {
            userTaskRepository.deleteByIdTaskIdAndIdUserId(taskId, userId);
        }
    }

        
    
        
        for (Integer userId : currentUserIds) {
            if (!newUserIdsSet.contains(userId)) {
                userTaskRepository.deleteByIdTaskIdAndIdUserId(taskId, userId);
            }
        }
    

    
    for (Integer userId : currentUserIds) {
        if (!newUserIdsSet.contains(userId)) {
            userTaskRepository.deleteByIdTaskIdAndIdUserId(taskId, userId);
        }
    }


    
    for (Integer userId : currentUserIds) {
        if (!newUserIdsSet.contains(userId)) {
            userTaskRepository.deleteByIdTaskIdAndIdUserId(taskId, userId);
        }
    }
}


    
    public List<Task> getTasksForUser(Integer userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    
        List<Task> tasks;
        if ("admin".equalsIgnoreCase(user.getUserRole())) {
            tasks = taskRepository.findAll();
        } else {
            List<UserTask> assignments = userTaskRepository.findByIdUserId(userId);
            
            Set<Integer> taskIds = assignments.stream()
                    .map(ut -> ut.getId().getTaskId())
                    .collect(Collectors.toSet());
            
            tasks = new ArrayList<>();
            for (Integer id : taskIds) {
                taskRepository.findById(id).ifPresent(tasks::add);
            }
        }
        
        
        for (Task task : tasks) {
            List<UserTask> taskAssignments = userTaskRepository.findByIdTaskId(task.getId());
            List<Integer> assignedUserIds = taskAssignments.stream()
                    .map(ut -> ut.getId().getUserId())
                    .collect(Collectors.toList());
            task.setAssignedTo(assignedUserIds);
        }
        
        return tasks;
    }
    
    
    public Optional<Task> getTaskByTitle(String taskTitle){
        return taskRepository.findByTaskTitle(taskTitle);
    }

    //TODO Add method to add taskId and UserId to UserTasks table - references taskRepository

}
