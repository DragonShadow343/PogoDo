package com.backend.TestClasses;

import com.backend.api.Model.Task;
import com.backend.api.Model.User;
import com.backend.repo.TaskRepository;
import com.backend.repo.UserRepository;
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

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2") //SWITCH the profile to mysql if want to run on mySQL, use h2 if testing without database manipulation
@Transactional(propagation = Propagation.NOT_SUPPORTED) // Disable rollback for all tests
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

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
    String uniqueTaskTitle = "Test Task " + System.currentTimeMillis(); // Unique task name

    Task task = new Task();
    task.setTaskTitle(uniqueTaskTitle);
    task.setTaskDescription("This is a test task");
    task.setPriorityStatus(1);
    task.setDueDate(LocalDate.of(2023,12,31));
    task.setCompleted(false);
    task.setLockStatus(false);

    String taskJson = objectMapper.writeValueAsString(task);

    mockMvc.perform(post("/Tasks/createtask")
            .contentType(MediaType.APPLICATION_JSON)
            .content(taskJson))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.taskTitle").value(uniqueTaskTitle))
            .andExpect(jsonPath("$.taskDescription").value("This is a test task"))
            .andExpect(jsonPath("$.priorityStatus").value(1));
}

    @Test
    public void testGetTaskById() throws Exception {
        // Create and save a task
        Task task = new Task();
        task.setTaskTitle("Test Task");
        task.setTaskDescription("This is a test task");
        task.setPriorityStatus(1);
        task.setDueDate(LocalDate.of(2023,12,31));
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);

        // Send a GET request to fetch the task by ID
        mockMvc.perform(get("/Tasks/{id}", task.getId()))
                .andExpect(status().isOk()) // Expect HTTP 200 OK
                .andExpect(jsonPath("$.taskTitle").value("Test Task")) // Validate the response
                .andExpect(jsonPath("$.taskDescription").value("This is a test task"));
    }

    @Test
    public void testUpdateTask() throws Exception {
        // Create and save a task
        Task task = new Task();
        task.setTaskTitle("Test Task");
        task.setTaskDescription("This is a test task");
        task.setPriorityStatus(1);
        task.setDueDate(LocalDate.of(2023,12,31));
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);

        // Update the task
        task.setTaskDescription("Updated description");

        // Convert the updated task object to JSON
        String taskJson = objectMapper.writeValueAsString(task);

        // Send a PUT request to update the task
        mockMvc.perform(put("/Tasks/{id}", task.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskJson))
                .andExpect(status().isOk()) // Expect HTTP 200 OK
                .andExpect(jsonPath("$.taskDescription").value("This is a test task")); // Validate the response
    }

    @Test
    public void testDeleteTask() throws Exception {
        // Create and save a task
        Task task = new Task();
        task.setTaskTitle("Test Task");
        task.setTaskDescription("This is a test task");
        task.setPriorityStatus(1);
        task.setDueDate(LocalDate.of(2023, 12, 13));
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);

        // Send a DELETE request to delete the task
        mockMvc.perform(delete("/Tasks/{id}", task.getId()))
                .andExpect(status().isNoContent()); // Expect HTTP 204 No Content

        // Verify that the task was deleted
        Task deletedTask = taskRepository.findById(task.getId()).orElse(null);
        assertNull(deletedTask);
    }
    

    @Test
    public void testAddAssignment() throws Exception {
       
        String username = "testUser";
        String taskTitle = "Test Task";
       
        //Create and save user
        User user = new User();
        user.setUserId(99);
        user.setFirstName("testFirstName");
        user.setLastName("testLastName");
        user.setEmail("test@email.com");
        user.setUsername("testUser");
        user.setPasscode("Test@1234");
        user.setUserRole("User");
        userRepository.save(user);

        //Create and save task
        Task task = new Task();
        task.setId(100);
        task.setTaskTitle("Test Task");
        task.setTaskDescription("This is a test task");
        task.setPriorityStatus(1);
        task.setDueDate(LocalDate.of(2023, 12, 13));
        task.setCompleted(false);
        task.setLockStatus(false);
        taskRepository.save(task);


        
        //Add the userId and taskId relationship
        mockMvc.perform(post("/Tasks/addAssignment")
            .param("username", username)
            .param("taskTitle", taskTitle)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk()) //Expect HTTP 200 OK
            .andExpect(content().string("Task assigned successfully to user."));

        //Verify the task has been correctly assigned to the user

        Optional<User> optionalUser = userRepository.findByUsername(username);
        assertNotNull(optionalUser);
        User userUpdate = optionalUser.get();
        userUpdate.getTasks().size();

        assertEquals(1, userUpdate.getTasks().size()); //Ensures the user has one task assigned
        assertTrue(userUpdate.getTasks().stream().anyMatch(t -> t.getTaskTitle().equals(taskTitle)));

        //remove associations: otherwise the other tests will fail due to violation of referential integrity
        
        userUpdate.getTasks().clear();
        userRepository.save(userUpdate);
        
    }



    }
