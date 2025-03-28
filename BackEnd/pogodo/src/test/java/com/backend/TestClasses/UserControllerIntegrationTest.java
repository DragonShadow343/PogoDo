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
}