package com.backend.TestClasses;

import com.backend.api.Model.User;
import com.backend.repo.UserRepository;
import com.backend.service.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("h2") 
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @AfterEach
    void tearDown() {
        
        userRepository.deleteAll();
    }

    @Test

    void testRegisterUser_withPlainTextPassword_hashesSuccessfully() {
       

        User user = new User();
        user.setFirstName("Alice");
        user.setLastName("Smith");
        user.setEmail("alice@example.com");
        user.setUsername("alice");
        user.setPasscode("myPlaintext123");
        user.setUserRole("USER");


    
        User savedUser = userService.registerUser(user);

       
        assertNotNull(savedUser.getUserId(), "User should have an ID after being saved");
        assertNotEquals("myPlaintext123", savedUser.getPasscode(), "Password should be hashed");

        assertTrue(
                passwordEncoder.matches("myPlaintext123", savedUser.getPasscode()),
                "PasswordEncoder should match original password with the stored hash"
        );
    }
}
