package com.backend.TestClasses;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import com.backend.api.Model.User;
import com.backend.repo.UserRepository;



// Spring Boot test for JPA repositories, tests the whole repository layer and the database
// Use the DataJpaTest and test profile to use the test database
//ONLY comment out one or the other, dont delete

// @SpringBootTest
// @TestPropertySource(locations = "classpath:application-test.properties")
@DataJpaTest
@ActiveProfiles("h2") //SWITCH the profile to mysql if want to run on mySQL, or h2 if testing without database manipulation
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testSaveAndFindUser() {
        // Create a new user with all required fields
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("testuser@example.com");
        user.setUsername("testuser");
        user.setPassword("password123"); // Set the passcode
        user.setUserRole("USER"); // Set the user role

        // Save the user to the database
        userRepository.save(user);

        // Retrieve the user from the database
        User foundUser = userRepository.findById(user.getUserId()).orElse(null);

        // Assert that the user was saved and retrieved correctly
        assertNotNull(foundUser);
        assertEquals("testuser", foundUser.getUsername());
        assertEquals("testuser@example.com", foundUser.getEmail());
    }

    @Test
    public void testUpdateUser() {
        // Create and save a user with all required fields
        User user = new User();
        user.setFirstName("Jane");
        user.setLastName("Smith");
        user.setEmail("olduser@example.com");
        user.setUsername("olduser");
        user.setPassword("password123");
        user.setUserRole("USER");
        userRepository.save(user);

        // Update the user's email
        user.setEmail("newuser@example.com");
        userRepository.save(user);

        // Retrieve the updated user
        User updatedUser = userRepository.findById(user.getUserId()).orElse(null);

        // Assert that the user was updated correctly
        assertNotNull(updatedUser);
        assertEquals("newuser@example.com", updatedUser.getEmail());
    }

    @Test
    public void testDeleteUser() {
        // Create and save a user with all required fields
        User user = new User();
        user.setFirstName("Alice");
        user.setLastName("Johnson");
        user.setEmail("deleteuser@example.com");
        user.setUsername("deleteuser");
        user.setPassword("password123");
        user.setUserRole("USER");
        userRepository.save(user);

        // Delete the user
        userRepository.deleteById(user.getUserId());

    }
}
       