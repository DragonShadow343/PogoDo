import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
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

    // Method that  store user credentials
    public static void storeUser(String username, String email, String password, String firstName, String lastName, String userRole) {
        // Ensure the userRole is valid (has to be either 'Admin' or 'User')
        if (!userRole.equals("Admin") && !userRole.equals("User")) {
            System.out.println("❌ Invalid userRole. Please specify 'Admin' or 'User'.");
            return;
        }

        // SQL query that  inserts user into the Users table
        String sql = "INSERT INTO Users (username, email, passcode, firstName, lastName, userRole) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Hashes the password before storing it
            String hashedPassword = hashPassword(password);
             
            // Set  parameters in the SQL query
            pstmt.setString(1, username);   // username
            pstmt.setString(2, email);      // email
            pstmt.setString(3, hashedPassword);  // passcode (hashed password)
            pstmt.setString(4, firstName);  // first name
            pstmt.setString(5, lastName);   // last name
            pstmt.setString(6, userRole);   // user role (either 'Admin' or 'User')

            // Execute the query
            int rowsInserted = pstmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println("User credentials stored successfully!");
            } else {
                System.out.println("Failed to store user credentials.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Example: Storing new user with additional information
        storeUser("steph23", "steph@example.com", "mypassword", "Steph", "Curry", "Admin");
    }
}
