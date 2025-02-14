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
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes()); // hashes the password,result is stored in byte array
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) { //loop converts each byte of hash to two digit hexadecimal representation
                hexString.append(String.format("%02x", b));
            }
            return hexString.toString();   // converts stringbuilder to string and returns which is the hash password
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error: Hashing algorithm not found", e);
        }
    }

    // Method to store user credentials
    public static void storeUser(String username, String email, String password) {
        String sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Hash the password before storing it
            String hashedPassword = hashPassword(password);

            pstmt.setString(1, username);
            pstmt.setString(2, email);
            pstmt.setString(3, hashedPassword);

            int rowsInserted = pstmt.executeUpdate();
            if (rowsInserted > 0) {
                System.out.println(" User credentials stored successfully!");
            } else {
                System.out.println(" Failed to store user credentials.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        // Example: Storing new user for fun
        storeUser("jim123", "mike@example.com", "mypassword");
    }
}
