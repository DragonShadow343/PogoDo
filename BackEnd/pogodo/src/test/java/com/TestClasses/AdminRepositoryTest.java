package com.TestClasses;

import com.backend.AdminRepository;
import com.backend.JDBCConnector;
import com.backend.Admin;
import org.junit.After; // Import for @After
import org.junit.Before;
import org.junit.Test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class AdminRepositoryTest {

    private Connection connection;

    @Before
public void setUp() throws SQLException {
    // Connect to the MySQL database
    connection = JDBCConnector.getConnection();

    // Clear the Users table AND reset AUTO_INCREMENT !!! if auto increment not reset, userId keeps incrementing and the tests fail....
    try (Statement statement = connection.createStatement()) {
        // Delete all rows from the Users table
        statement.execute("DELETE FROM Users");

        // Reset the AUTO_INCREMENT counter
        statement.execute("ALTER TABLE Users AUTO_INCREMENT = 1");

        // Insert test data
        statement.execute("INSERT INTO Users (firstName, lastName, email, username, passcode, userRole) " +
                "VALUES ('Cat', 'Robert', 'cat@gmail.com', 'cat', '1234', 'Admin')");
        statement.execute("INSERT INTO Users (firstName, lastName, email, username, passcode, userRole) " +
                "VALUES ('Branden', 'Kennedy', 'branden@gmail.com', 'branden6', '1234', 'Admin')");
    }
}

    @Test
    public void testGetAllAdmins() throws SQLException {
        // Call the method to test
        List<Admin> admins = AdminRepository.getAllAdmins();

        // Debug: Print the retrieved admins
        System.out.println("Retrieved Admins:");
        for (Admin admin : admins) {
            System.out.println(admin);
        }

        // Verify the results
        assertEquals(2, admins.size()); // Expecting 2 admins

        // Verify the first admin
        Admin admin = admins.get(0);
        assertEquals(1, admin.getId());
        assertEquals("cat", admin.getUserName());
        assertEquals("Cat", admin.getFirstName());
        assertEquals("Robert", admin.getLastName());
        assertEquals("cat@gmail.com", admin.getEmail());
        assertEquals("1234", admin.getPassword());
    }
    @Test
    public void testGetAllAdmins_NonAdminUsers() throws SQLException {
    // Inserting a non-admin user
    try (Statement statement = connection.createStatement()) {
        statement.execute("INSERT INTO Users (firstName, lastName, email, username, passcode, userRole) " +
                "VALUES ('John', 'Doe', 'john@gmail.com', 'john', '1234', 'User')");
    }

    // Call the method to test
    List<Admin> admins = AdminRepository.getAllAdmins();

    // Verify the results
    assertNotNull(admins);
    assertEquals(2, admins.size()); // Expecting 2 admins (from the @Before method)
}

    @After
    public void tearDown() throws SQLException {
        // Clear the Users table after each test
        try (Statement statement = connection.createStatement()) {
            statement.execute("DELETE FROM Users");
        }

        // Close the database connection
        if (connection != null && !connection.isClosed()) {
            connection.close();
            System.out.println("Database connection closed.");
        }
    }
}