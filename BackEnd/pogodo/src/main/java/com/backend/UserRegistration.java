package com.backend;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class UserRegistration {
    private static final String URL = "jdbc:mysql://mysql-ogo-pogo-ogo-pogo.h.aivencloud.com:16239/defaultdb";
    private static final String USER = "avnadmin";
    private static final String PASSWORD = "AVNS_fr4fLxnT_9BoiTMNc-6";
    
    // Method to hash passwords using SHA-256
    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");    // creates instance with SHA-256
            byte[] hash = md.digest(password.getBytes()); // hashes the password, result would be  stored in byte array
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) { // loop converts each byte of hash to two-digit hexadecimal representation
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();   // converts StringBuilder to string and returns the hashed password
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error: Hashing algorithm not found", e);
        }
    }

    // Method that stores user credentials and returns a boolean result
    public static boolean storeUser(String username, String email, String password, String firstName, String lastName, String userRole) {
        // This  checks if the userRole is neither "Admin" or "User" and if so, it will print an error message and return false 
        if (!userRole.equals("Admin") && !userRole.equals("User")) {
            System.out.println("Invalid userRole, please specify 'Admin' or 'User'.");
            return false; // And return false if the userRole is invalid
        }

        // This check if  username already exists in the database
        String checkSQL = "SELECT COUNT(*) FROM Users WHERE username = ?";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement checkPstmt = conn.prepareStatement(checkSQL)) {
             
                //sets username parameter in  query
            checkPstmt.setString(1, username);
            ResultSet rs = checkPstmt.executeQuery();
                
            //checks if a username already exists in  database by counting the rows that match the username, 
            // if it does finds any, it prints a message and returns false to prevent any duplicate entries.
            if (rs.next() && rs.getInt(1) > 0) {
                System.out.println("Username already exists.");
                return false; 
            }

        } catch (SQLException e) {
            e.printStackTrace();
            return false; // Return false if there is database error
        }

        // SQL query to insert user into the Users table
        String sql = "INSERT INTO Users (username, email, passcode, firstName, lastName, userRole) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Hash the password before storing it
            String hashedPassword = hashPassword(password);
             
            // Set parameters in the SQL query
            pstmt.setString(1, username);   // username
            pstmt.setString(2, email);      // email
            pstmt.setString(3, hashedPassword); // passcode (hashed password)
            pstmt.setString(4, firstName);  // first name
            pstmt.setString(5, lastName);   // last name
            pstmt.setString(6, userRole);   // user role (either 'Admin' or 'User')

            // Execute  query
            int rowsInserted = pstmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("User credentials stored successfully!");
                return true; // Return true if user is successfully added
            } else {
                System.out.println("Failed to store user credentials.");
                return false; // Return false if  insertion failed
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false; // Will return false if there's a database error
        }
    }

    public static void main(String[] args) {
        // This is Example: Storing  new user with additional information
        boolean result = storeUser("hey23", "steph@example.com", "mypassword", "Steph", "Curry", "Admin");
        if (!result) {
            System.out.println("User registration failed,please check the input and try again.");
        }
    }
}
