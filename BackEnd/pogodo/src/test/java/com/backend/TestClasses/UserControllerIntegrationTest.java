package com.backend.TestClasses;

import com.backend.api.Model.User;
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

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2") //SWITCH the profile to mysql if want to run on mySQL, use h2 if testing without database manipulation
@Transactional(propagation = Propagation.NOT_SUPPORTED) 
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper; 

    @AfterEach
    public void tearDown() {
        userRepository.deleteAll();
    }

    @Test
    public void testDatabaseConnection() {
        assertNotNull(userRepository);
        long countBefore = userRepository.count();
        System.out.println("Number of users before test: " + countBefore);
    }

    @Test
    public void testCreateUser() throws Exception {
        
        String uniqueUsername = "johndoe_" + System.currentTimeMillis();
        String uniqueEmail = "john.doe_" + System.currentTimeMillis() + "@example2.com";

        
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail(uniqueEmail); 
        user.setUsername(uniqueUsername); 
        user.setPasscode("password123");
        user.setUserRole("USER");

        
        String userJson = objectMapper.writeValueAsString(user);

        
        mockMvc.perform(post("/Users") 
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isCreated()) 
                .andExpect(jsonPath("$.username").value(uniqueUsername)) 
                .andExpect(jsonPath("$.email").value(uniqueEmail));

        User savedUser = userRepository.findByUsername(uniqueUsername).orElse(null);
        assertNotNull(savedUser);
        assertEquals(uniqueEmail, savedUser.getEmail());
    }

    @Test
public void testUpdateUserPermissionAssignTasks() throws Exception {
    // Create unique username and email
    String uniqueUsername = "johndoe_" + System.currentTimeMillis();
    String uniqueEmail = "john.doe_" + System.currentTimeMillis() + "@example2.com";

    User user = new User();
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setEmail(uniqueEmail);
    user.setUsername(uniqueUsername);
    user.setPasscode("password123");
    user.setUserRole("USER");

    // Save the user to the repository
    userRepository.save(user);

    // Initialize mocked permission keys
    String permissionKey = "assignTasks";
    boolean newAssignTasksValue = true;

    // Create the JSON payload for the permission update
    Map<String, Boolean> permissionPayload = new HashMap<>();
    permissionPayload.put(permissionKey, newAssignTasksValue);

    // Perform the PUT request to update the user permission
    mockMvc.perform(put("/Users/{userId}/permissions/{permissionKey}", user.getUserId(), permissionKey)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(permissionPayload)))
            .andExpect(status().isOk()) // Expect HTTP 200 OK
            .andExpect(jsonPath("$.assignTasks").value(newAssignTasksValue)); // Validate the response

    // Retrieve the user again and check if the permission was updated
    User updatedUser = userRepository.findById(user.getUserId()).orElse(null);
    assertNotNull(updatedUser);
    assertEquals(newAssignTasksValue, updatedUser.getAssignTasks());
}

@Test
public void testUpdateUserPermissionDeleteTasks() throws Exception {
    // Create unique username and email
    String uniqueUsername = "johndoe_" + System.currentTimeMillis();
    String uniqueEmail = "john.doe_" + System.currentTimeMillis() + "@example2.com";

    User user = new User();
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setEmail(uniqueEmail);
    user.setUsername(uniqueUsername);
    user.setPasscode("password123");
    user.setUserRole("USER");

    // Save the user to the repository
    userRepository.save(user);

    // Initialize mocked permission keys
    String permissionKey = "deleteTasks";
    boolean newDeleteTasksValue = true;

    // Create the JSON payload for the permission update
    Map<String, Boolean> permissionPayload = new HashMap<>();
    permissionPayload.put(permissionKey, newDeleteTasksValue);

    // Perform the PUT request to update the user permission
    mockMvc.perform(put("/Users/{userId}/permissions/{permissionKey}", user.getUserId(), permissionKey)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(permissionPayload)))
            .andExpect(status().isOk()) // Expect HTTP 200 OK
            .andExpect(jsonPath("$.deleteTasks").value(newDeleteTasksValue)); // Validate the response

    // Retrieve the user again and check if the permission was updated
    User updatedUser = userRepository.findById(user.getUserId()).orElse(null);
    assertNotNull(updatedUser);
    assertEquals(newDeleteTasksValue, updatedUser.getDeleteTasks());
}

@Test
public void testUpdateUserPermissionLockTasks() throws Exception {
    // Create unique username and email
    String uniqueUsername = "johndoe_" + System.currentTimeMillis();
    String uniqueEmail = "john.doe_" + System.currentTimeMillis() + "@example2.com";

    User user = new User();
    user.setFirstName("John");
    user.setLastName("Doe");
    user.setEmail(uniqueEmail);
    user.setUsername(uniqueUsername);
    user.setPasscode("password123");
    user.setUserRole("USER");

    // Save the user to the repository
    userRepository.save(user);

    // Initialize mocked permission keys
    String permissionKey = "lockTasks";
    boolean newLockTasksValue = true;

    // Create the JSON payload for the permission update
    Map<String, Boolean> permissionPayload = new HashMap<>();
    permissionPayload.put(permissionKey, newLockTasksValue);

    // Perform the PUT request to update the user permission
    mockMvc.perform(put("/Users/{userId}/permissions/{permissionKey}", user.getUserId(), permissionKey)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(permissionPayload)))
            .andExpect(status().isOk()) // Expect HTTP 200 OK
            .andExpect(jsonPath("$.lockTasks").value(newLockTasksValue)); // Validate the response

    // Retrieve the user again and check if the permission was updated
    User updatedUser = userRepository.findById(user.getUserId()).orElse(null);
    assertNotNull(updatedUser);
    assertEquals(newLockTasksValue, updatedUser.getLockTasks());
}

}