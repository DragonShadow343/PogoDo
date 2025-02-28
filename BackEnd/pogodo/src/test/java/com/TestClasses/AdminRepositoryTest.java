package com.TestClasses;

import com.backend.AdminRepository;
import com.backend.JDBCConnector;
import com.backend.Admin;
import org.junit.After; 
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

        //Print the retrieved admins (should just be branden and cat for this test)
        System.out.println("Retrieved Admins:");
        for (Admin admin : admins) {
            System.out.println(admin);
        }

        // Verify the results, should be 2 admins for this test
        assertEquals(2, admins.size()); 

        // testing the first admin (cat)
        Admin admin = admins.get(0);
        assertEquals(1, admin.getId());
        assertEquals("cat", admin.getUserName());
        assertEquals("Cat", admin.getFirstName());
        assertEquals("Robert", admin.getLastName());
        assertEquals("cat@gmail.com", admin.getEmail());
        assertEquals("1234", admin.getPassword());

        //testing for the branden entry as well
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
        statement.execute("INSERT INTO Users (firstName, lastName, email, username, passcode, userRole) " +
                "VALUES ('John', 'Doe', 'john@gmail.com', 'john', '1234', 'User')");
    }

    // Call the method to test
    List<Admin> admins = AdminRepository.getAllAdmins();

    // Verify the results and make sure it is still only 2 admins....
    assertNotNull(admins);
    assertEquals(2, admins.size()); // Expecting 2 admins (from the @Before method)
    }
        @Test
        public void testGetAllAdminsWithAnEmptyTable() throws SQLException { //testing for an empty table, no admins
    // Clear the Users table
        try (Statement statement = connection.createStatement()) {
            statement.execute("DELETE FROM Users");
        }

        List<Admin> admins = AdminRepository.getAllAdmins();

        // Verify the results, should be 0 admins in this test....
        assertNotNull(admins);
        assertEquals(0, admins.size()); // Expecting 0 admins
    }
    
        @After
        public void tearDown() throws SQLException {
            //this method Clears the Users table after each test ! if not included, tests fail 
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