package com.TestClasses;

import com.backend.AdminRepository;
import com.backend.JDBCConnector;
import com.backend.api.Model.Admin;

import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class AdminRepositoryTest {
    private Connection connection;

    @BeforeClass
    public static void setTestMode() {
        System.setProperty("test.mode", "true"); // THIS ENABLES TEST MODE to test on testdb
    }

    @Before
    public void setUp() throws SQLException {
        // Connect to the H2 database
        connection = JDBCConnector.getConnection();
        System.out.println("Database connection established to " + connection.getCatalog());

        // Clear the Users table
        try (Statement statement = connection.createStatement()) {
            // Drop the table if it exists
            statement.execute("DROP TABLE IF EXISTS TestUsers");

            // Create the TestUsers table
            statement.execute("CREATE TABLE IF NOT EXISTS TestUsers (" +
                "id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
                "firstName VARCHAR(45) NOT NULL, " +
                "lastName VARCHAR(45) NOT NULL, " +
                "email VARCHAR(45) NOT NULL, " +
                "username VARCHAR(45) NOT NULL, " +
                "passcode VARCHAR(45) NOT NULL, " +
                "userRole VARCHAR(45) NOT NULL" +
                ")");

            // Insert test data
            statement.execute("INSERT INTO TestUsers (firstName, lastName, email, username, passcode, userRole) " +
                    "VALUES ('Cat', 'Robert', 'cat@gmail.com', 'cat', '1234', 'Admin')");
            statement.execute("INSERT INTO TestUsers (firstName, lastName, email, username, passcode, userRole) " +
                    "VALUES ('Branden', 'Kennedy', 'branden@gmail.com', 'branden6', '1234', 'Admin')");
        }
    }

    @Test
    public void testGetAllAdmins() throws SQLException {
        // Call the method to test
        List<Admin> admins = AdminRepository.getAllAdmins(connection);

        // Print the retrieved admins (should just be Branden and Cat for this test)
        System.out.println("Retrieved Admins:");
        for (Admin admin : admins) {
            System.out.println(admin);
        }

        // Verify the results, should be 2 admins for this test
        assertEquals(2, admins.size());

        // Testing the first admin (Cat)
        Admin admin = admins.get(0);
        assertEquals(1, admin.getId());
        assertEquals("cat", admin.getUserName());
        assertEquals("Cat", admin.getFirstName());
        assertEquals("Robert", admin.getLastName());
        assertEquals("cat@gmail.com", admin.getEmail());
        assertEquals("1234", admin.getPassword());

        // Testing the second admin (Branden)
        Admin admin2 = admins.get(1);
        assertEquals(2, admin2.getId());
        assertEquals("branden6", admin2.getUserName());
        assertEquals("Branden", admin2.getFirstName());
        assertEquals("Kennedy", admin2.getLastName());
        assertEquals("branden@gmail.com", admin2.getEmail());
        assertEquals("1234", admin2.getPassword());
    }

    @Test
    public void testGetAllAdminsWithNonAdminUsers() throws SQLException {
        // Inserting a non-admin user
        try (Statement statement = connection.createStatement()) {
            statement.execute("INSERT INTO TestUsers (firstName, lastName, email, username, passcode, userRole) " +
                    "VALUES ('John', 'Doe', 'john@gmail.com', 'john', '1234', 'User')");
        }

        // Call the method to test
        List<Admin> admins = AdminRepository.getAllAdmins(connection);

        // Verify the results and make sure it is still only 2 admins
        assertNotNull(admins);
        assertEquals(2, admins.size()); // Expecting 2 admins (from the @Before method)
    }

    @Test
    public void testGetAllAdminsWithAnEmptyTable() throws SQLException {
        // Clear the Users table
        try (Statement statement = connection.createStatement()) {
            statement.execute("DELETE FROM TestUsers");
        }

        // Call the method to test
        List<Admin> admins = AdminRepository.getAllAdmins(connection);

        // Verify the results, should be 0 admins in this test
        assertNotNull(admins);
        assertEquals(0, admins.size()); // Expecting 0 admins
    }

    @After
    public void tearDown() throws SQLException {
        // Clear the TestUsers table after each test
        try (Statement statement = connection.createStatement()) {
            statement.execute("DELETE FROM TestUsers");
        }

        // Close the database connection
        if (connection != null && !connection.isClosed()) {
            connection.close();
            System.out.println("Database connection closed.");
        }
    }
}