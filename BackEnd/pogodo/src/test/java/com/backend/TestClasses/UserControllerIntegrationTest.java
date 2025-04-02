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
@ActiveProfiles("h2") 
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

    private User createUniqueUser() {
        String uniqueUsername = "johndoe_" + System.currentTimeMillis();
        String uniqueEmail = "john.doe_" + System.currentTimeMillis() + "@example2.com";

        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail(uniqueEmail); 
        user.setUsername(uniqueUsername); 
        user.setPasscode("password123");
        user.setUserRole("USER");
        
        return user;
    }

    @Test
    public void testDatabaseConnection() {
        assertNotNull(userRepository);
        long countBefore = userRepository.count();
        
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
    User user = createUniqueUser();

    
    userRepository.save(user);

    
    String permissionKey = "assignTasks";
    boolean newAssignTasksValue = true;

    
    Map<String, Boolean> permissionPayload = new HashMap<>();
    permissionPayload.put(permissionKey, newAssignTasksValue);

    
    mockMvc.perform(put("/Users/{userId}/permissions/{permissionKey}", user.getUserId(), permissionKey)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(permissionPayload)))
            .andExpect(status().isOk()) 
            .andExpect(jsonPath("$.assignTasks").value(newAssignTasksValue)); 

    
    User updatedUser = userRepository.findById(user.getUserId()).orElse(null);
    assertNotNull(updatedUser);
    assertEquals(newAssignTasksValue, updatedUser.getAssignTasks());
}

@Test
public void testUpdateUserPermissionDeleteTasks() throws Exception {
    User user = createUniqueUser();

   
    userRepository.save(user);

   
    String permissionKey = "deleteTasks";
    boolean newDeleteTasksValue = true;

   
    Map<String, Boolean> permissionPayload = new HashMap<>();
    permissionPayload.put(permissionKey, newDeleteTasksValue);

   
    mockMvc.perform(put("/Users/{userId}/permissions/{permissionKey}", user.getUserId(), permissionKey)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(permissionPayload)))
            .andExpect(status().isOk()) 
            .andExpect(jsonPath("$.deleteTasks").value(newDeleteTasksValue)); 

   
    User updatedUser = userRepository.findById(user.getUserId()).orElse(null);
    assertNotNull(updatedUser);
    assertEquals(newDeleteTasksValue, updatedUser.getDeleteTasks());
}

@Test
public void testUpdateUserPermissionLockTasks() throws Exception {
    User user = createUniqueUser();

  
    userRepository.save(user);

   
    String permissionKey = "lockTasks";
    boolean newLockTasksValue = true;

    
    Map<String, Boolean> permissionPayload = new HashMap<>();
    permissionPayload.put(permissionKey, newLockTasksValue);

    
    mockMvc.perform(put("/Users/{userId}/permissions/{permissionKey}", user.getUserId(), permissionKey)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(permissionPayload)))
            .andExpect(status().isOk()) 
            .andExpect(jsonPath("$.lockTasks").value(newLockTasksValue));

    
    User updatedUser = userRepository.findById(user.getUserId()).orElse(null);
    assertNotNull(updatedUser);
    assertEquals(newLockTasksValue, updatedUser.getLockTasks());
}

}