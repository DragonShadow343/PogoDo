package com.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.api.Model.Task;
import com.backend.repo.TaskRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

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

    //Method to get a task by Title
    public Optional<Task> getTaskByTitle(String taskTitle){
        return taskRepository.findByTaskTitle(taskTitle);
    }

    //TODO Add method to add taskId and UserId to UserTasks table - references taskRepository

}
