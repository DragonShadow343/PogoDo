package com.backend;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRegistration {

    // Method to hash passwords using SHA-256
    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256"); // Creates instance with SHA-256
            byte[] hash = md.digest(password.getBytes()); // Hashes the password, result is stored in byte array
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) { // Loop converts each byte of hash to two-digit hexadecimal representation
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString(); // Converts StringBuilder to string and returns the hashed password
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error: Hashing algorithm not found", e);
        }
    }

    // Method that stores user credentials and returns a boolean result
    public static boolean storeUser(String username, String email, String password, String firstName, String lastName, String userRole) {
        System.out.println("Attempting to register user: " + username);
    
        // Check if the userRole is valid
        if (!userRole.equals("Admin") && !userRole.equals("User")) {
            System.out.println("Invalid userRole, please specify 'Admin' or 'User'.");
            return false;
        }
    
        // Validate password length
        if (password.length() < 8) {
            System.out.println("Password is too short. It must be at least 8 characters long.");
            return false;
        }
    
        // Check if the username already exists
        String checkSQL = "SELECT COUNT(*) FROM TestUsers WHERE username = ?";
        try (Connection conn = JDBCConnector.getConnection();
             PreparedStatement checkPstmt = conn.prepareStatement(checkSQL)) {
    
            System.out.println("Checking if username exists: " + username);
            checkPstmt.setString(1, username);
            ResultSet rs = checkPstmt.executeQuery();
    
            if (rs.next() && rs.getInt(1) > 0) {
                System.out.println("Username already exists: " + username);
                return false;
            }
    
        } catch (SQLException e) {
            System.err.println("SQL Exception during username check: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    
        // Insert the new user
        String sql = "INSERT INTO TestUsers (username, email, passcode, firstName, lastName, userRole) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = JDBCConnector.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
    
            System.out.println("Inserting user into TestUsers table: " + username);
    
            // Hash the password
            String hashedPassword = hashPassword(password);
            System.out.println("Password hashed successfully.");
    
            // Set parameters
            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.setString(3, hashedPassword);
            pstmt.setString(4, firstName);
            pstmt.setString(5, lastName);
            pstmt.setString(6, userRole);
    
            // Execute the query
            int rowsInserted = pstmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("User credentials stored successfully!");
                return true;
            } else {
                System.out.println("Failed to store user credentials. No rows inserted.");
                return false;
            }
    
        } catch (SQLException e) {
            System.err.println("SQL Exception during user registration: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public static void main(String[] args) {
        // Example: Storing a new user with additional information
        boolean result = storeUser("hey23", "steph@example.com", "mypassword", "Steph", "Curry", "Admin");
        if (!result) {
            System.out.println("User registration failed, please check the input and try again.");
        }
    }
}