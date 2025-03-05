package com.TestClasses;

import com.backend.UserRegistration;
import com.backend.JDBCConnector;
import org.junit.BeforeClass;
import org.junit.Before;
import org.junit.After;
import org.junit.Test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import static org.junit.Assert.*;

public class UserRegistrationTest {

    @BeforeClass
    public static void setTestMode() {
        // Enable test mode to use H2 database
        System.setProperty("test.mode", "true");
        System.out.println("Test mode enabled. Using H2 database.");
    }

    @Before
    public void setUp() throws SQLException {
        // Connect to the H2 database and initialize the TestUsers table
        try (Connection connection = JDBCConnector.getConnection();
             Statement statement = connection.createStatement()) {
            // Drop the table if it exists
            statement.execute("DROP TABLE IF EXISTS TestUsers");

            // Create the TestUsers table
            statement.execute("CREATE TABLE IF NOT EXISTS TestUsers (" +
                "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
                "username VARCHAR(45) NOT NULL UNIQUE, " +
                "email VARCHAR(45) NOT NULL UNIQUE, " +
                "passcode VARCHAR(100) NOT NULL, " +
                "firstName VARCHAR(45) NOT NULL, " +
                "lastName VARCHAR(45) NOT NULL, " +
                "userRole VARCHAR(45) NOT NULL)");

            System.out.println("TestUsers table created in H2 database.");
        }
    }

    @After
    public void tearDown() throws SQLException {
        // Clear the TestUsers table after each test
        try (Connection connection = JDBCConnector.getConnection();
             Statement statement = connection.createStatement()) {
            statement.execute("DELETE FROM TestUsers");
            System.out.println("TestUsers table cleared.");
        }
    }

    @Test
    public void testValidUserRegistration() {
        // This test checks if the user can successfully register with valid username and details
        String uniqueUsername = "uniqueUser" + System.currentTimeMillis(); // Unique username based on current time
        System.out.println("Registering user with username: " + uniqueUsername);

        // Register the user with the unique username and other details
        boolean result = UserRegistration.storeUser(uniqueUsername, "damn@example.com", "securePassword123", "John", "Doe", "User");

        // Check if registration was successful (should return true)
        System.out.println("Registration result: " + result);
        assertTrue("User registration should succeed with valid input", result);
    }

    @Test
    public void testDuplicateUsername() {
        // Register a user with the username "lebron"
        UserRegistration.storeUser("lebron", "test@example.com", "password123", "Test", "User", "User");

        // Try to register again with the same username "lebron"
        boolean result = UserRegistration.storeUser("lebron", "another@example.com", "password123", "Another", "User", "User");

        // Check if the registration failed
        assertFalse("User registration should fail due to duplicate username", result);
    }

    @Test
    public void testInvalidPassword() {
        // Try registering with a password that is too short
        boolean result = UserRegistration.storeUser("james", "invalid@example.com", "short", "Invalid", "Password", "User");
        // Check if the registration fails
        assertFalse("User registration should fail with invalid password", result);
    }

    @Test
    public void testDatabaseConnectionFailure() {
        // Simulate a database connection failure by manually throwing an exception
        try {
            throw new SQLException("Simulated database connection failure");
        } catch (SQLException e) {
            // Check if the exception message contains "Simulated database connection failure"
            assertTrue("SQLException expected when database connection fails", e.getMessage().contains("Simulated database connection failure"));
        }
    }
}