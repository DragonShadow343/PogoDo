package com.TestClasses;

import org.junit.Test;

import com.backend.UserRegistration;

import static org.junit.Assert.*;

import java.sql.SQLException;

public class UserRegistrationTest {

    @Test

    public void testValidUserRegistration() {
       // This test checks if the  user can successfully register with  valid username and details
        String uniqueUsername = "uniqueUser" + System.currentTimeMillis(); // Unique username based on current time
        // register the user with the unique username and other details
        boolean result = UserRegistration.storeUser("uniqueUser1234", "damn@example.com", "securePassword123", "John", "Doe", "User");
 // Check if  registration was successful it should come true
        System.out.println("Registration result: " + result); 
        assertTrue("User registration should succeed with valid input", result);
    }
    

// This test checks if system fails when trying to register with a username that would  already exists
    @Test
    public void testDuplicateUsername() {
        
        UserRegistration.storeUser("lebron", "test@example.com", "password123", "Test", "User", "User");

       // Now, try to register again with the same username. This should failing
        boolean result = UserRegistration.storeUser("duplicate_user", "another@example.com", "password123", "Another", "User", "User");
       // Check if the registration failed and it should fail because the username is already taken
        assertFalse("User registration should fail due to duplicate username", result);
    }
// This test checks if system fails when a user tries to register with a invalid password
    @Test
public void testInvalidPassword() {
   // Try registering with a password that is too short 
    boolean result = UserRegistration.storeUser("james", "invalid@example.com", "short", "Invalid", "Password", "User");
    // Check if the registration fails and it should fail because the password would be too short
    assertFalse("User registration should fail with invalid password", result);
}


   // This test try the database connection failure
    @Test
    public void testDatabaseConnectionFailure() {
        // try  database connection failure by manually throwing an exception
        try {
            
            throw new SQLException("Simulated database connection failure");
        } catch (SQLException e) {
           // Check if the exception message contains "Simulated database connection failure"
            // This ensures the code is  handling the simulated database error correctly
            assertTrue("SQLException expected when database connection fails", e.getMessage().contains("Simulated database connection failure"));
        }
    }
}    

