package com.backend;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.backend.api.Model.Admin;

public class AdminRepository {

    public static List<Admin> getAllAdmins(Connection connection) throws SQLException {
        List<Admin> admins = new ArrayList<>();
        String sql = "SELECT * FROM TestUsers WHERE userRole = 'Admin'"; // Selecting all admins from TestUsers table

        try (
            Statement stmnt = connection.createStatement(); // Create statement
            ResultSet rs = stmnt.executeQuery(sql)) { // Execute query

            System.out.println("Executing SQL query: " + sql);

            while (rs.next()) {
                Admin admin = new Admin();
                admin.setId(rs.getInt("id")); // Correct column name: id
                admin.setUserName(rs.getString("username")); // Correct column name: username
                admin.setFirstName(rs.getString("firstName"));
                admin.setLastName(rs.getString("lastName"));
                admin.setEmail(rs.getString("email"));
                admin.setPassword(rs.getString("passcode"));
                admins.add(admin);

                // Debug: Print the admin details
                System.out.println("Retrieved Admin: " + admin);
            }
        }
        return admins; // Return the list of admins
    }

    public static void main(String[] args) {
        try (Connection connection = JDBCConnector.getConnection()) {
            List<Admin> admins = getAllAdmins(connection);

            for (int i = 0; i < admins.size(); i++) {
                Admin admin = admins.get(i);
                System.out.print("Admin #" + i + "\n" +
                        "Admin Id: " + admin.getId() + "\n" +
                        "Username: " + admin.getUserName() + "\n" +
                        "First Name: " + admin.getFirstName() + "\n" +
                        "Last Name: " + admin.getLastName() + "\n" +
                        "Email: " + admin.getEmail() + "\n" +
                        "Password: " + admin.getPassword() + "\n");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}