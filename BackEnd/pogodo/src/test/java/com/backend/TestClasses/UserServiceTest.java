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
@ActiveProfiles("h2") // or "test" profile, whichever is set up for your in-memory DB
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @AfterEach
    void tearDown() {
        // Clean up the in-memory DB after each test
        userRepository.deleteAll();
    }

    @Test
    void testSaveUser_withPlainTextPassword_hashesSuccessfully() {
        //  create a new user with a plain-text passcode
        User user = new User();
        user.setFirstName("Alice");
        user.setLastName("Smith");
        user.setEmail("alice@example.com");
        user.setUsername("alice");
        user.setPasscode("myPlaintext123");
        user.setUserRole("USER");

       
        User savedUser = userService.saveUser(user);

        // verify the DB passcode is hashed, not plain text
        assertNotNull(savedUser.getUserId(), "User should have been assigned an ID");
        assertNotEquals("myPlaintext123", savedUser.getPasscode(),
                "Expected passcode to be hashed, not stored in plain text!");

        //  verify that the hashed password can be matched by the encoder:
        assertTrue(
                passwordEncoder.matches("myPlaintext123", savedUser.getPasscode()),
                "Stored hash should match the original plain-text password when using PasswordEncoder.matches()"
        );
    }

  

}
