package com.backend.TestClasses;

import com.backend.api.Model.Task;
import com.backend.repo.TaskRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("mysql") //SWITCH the profile to mysql if want to run on mySQL, use h2 if testing without database manipulation
@Transactional(propagation = Propagation.NOT_SUPPORTED) // Disable rollback for all tests
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ObjectMapper objectMapper; // For converting objects to JSON

    @AfterEach
    public void tearDown() {
        taskRepository.deleteAll();
    }

    @Test
    public void testDatabaseConnection() {
        assertNotNull(taskRepository);
        long countBefore = taskRepository.count();
        System.out.println("Number of tasks before test: " + countBefore);
    }

    @Test
public void testCreateTask() throws Exception {
    String uniqueTaskName = "Test Task " + System.currentTimeMillis(); // Unique task name

    Task task = new Task();
    task.setTaskName(uniqueTaskName);
    task.setDescription("This is a test task");
    task.setPriority(1);
    task.setDueDate("2023-12-31");
    task.setCompleted(false);
    task.setLockStatus(false);

    String taskJson = objectMapper.writeValueAsString(task);

    mockMvc.perform(post("/tasks")
            .contentType(MediaType.APPLICATION_JSON)
            .content(taskJson))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.taskName").value(uniqueTaskName))
            .andExpect(jsonPath("$.description").value("This is a test task"));
}

    @Test
    public void testGetTaskById() throws Exception {
        // Create and save a task
        Task task = new Task();
        task.setTaskName("Test Task");
        task.setDescription("This is a test task");
        task.setPriority(1);
        task.setDueDate("2023-12-31");
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);

        // Send a GET request to fetch the task by ID
        mockMvc.perform(get("/tasks/{id}", task.getId()))
                .andExpect(status().isOk()) // Expect HTTP 200 OK
                .andExpect(jsonPath("$.taskName").value("Test Task")) // Validate the response
                .andExpect(jsonPath("$.description").value("This is a test task"));
    }

    @Test
    public void testUpdateTask() throws Exception {
        // Create and save a task
        Task task = new Task();
        task.setTaskName("Test Task");
        task.setDescription("This is a test task");
        task.setPriority(1);
        task.setDueDate("2023-12-31");
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);

        // Update the task
        task.setDescription("Updated description");

        // Convert the updated task object to JSON
        String taskJson = objectMapper.writeValueAsString(task);

        // Send a PUT request to update the task
        mockMvc.perform(put("/tasks/{id}", task.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskJson))
                .andExpect(status().isOk()) // Expect HTTP 200 OK
                .andExpect(jsonPath("$.description").value("Updated description")); // Validate the response
    }

    @Test
    public void testDeleteTask() throws Exception {
        // Create and save a task
        Task task = new Task();
        task.setTaskName("Test Task");
        task.setDescription("This is a test task");
        task.setPriority(1);
        task.setDueDate("2023-12-31");
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);

        // Send a DELETE request to delete the task
        mockMvc.perform(delete("/tasks/{id}", task.getId()))
                .andExpect(status().isNoContent()); // Expect HTTP 204 No Content

        // Verify that the task was deleted
        Task deletedTask = taskRepository.findById(task.getId()).orElse(null);
        assertNull(deletedTask);
    }
}