package com.backend.api.Model;

import com.backend.api.Model.Interfaces.Account;

import jakarta.persistence.*;

@Entity
@Table(name = "\"Users\"") // Map to the "Users" table in the database
public class User implements Account{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID
    @Column(name = "userId", nullable = false)
    private Integer userId;

    @Column(name = "firstName", nullable = false)
    private String firstName;

    @Column(name = "lastName", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "passcode", nullable = false)
    private String passcode;

    @Column(name = "userRole", nullable = false)
    private String userRole;

    // Constructors
    public User(String firstName, String lastName, String email, String username, String passcode, String userRole) {
        
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.passcode = passcode;
        this.userRole = userRole;
    }

    public User() {
    }

    // Getters and Setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        if (userId < 0) {
            throw new IllegalArgumentException("ID cannot be negative");
        }
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        if (firstName == null || firstName.isEmpty()) {
            throw new IllegalArgumentException("First name cannot be empty");
        }
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        if (lastName == null || lastName.isEmpty()) {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        this.username = username;
    }

    public String getPasscode() { 
        return passcode;
    }
    
    public void setPasscode(String passcode) { 
        if (passcode == null || passcode.isEmpty()) {
            throw new IllegalArgumentException("Passcode cannot be empty");
        }
        this.passcode = passcode;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        if (userRole == null || userRole.isEmpty()) {
            throw new IllegalArgumentException("User role cannot be empty");
        }
        this.userRole = userRole;
    }

    // toString Method
    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", passcode='" + passcode + '\'' +
                ", userRole='" + userRole + '\'' +
                '}';
    }
}