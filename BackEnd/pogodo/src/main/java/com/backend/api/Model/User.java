package com.backend.api.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    private int userId;
    private String firstName, lastName, email, username, passcode, userRole;

    public User(int userId, String firstName, String lastName, String email, String username, String passcode, String userRole) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.passcode = passcode;
        this.userRole = userRole;
    }
    public User(){

    }
    public void setUserId(int userId) {
        if (userId < 0) {
            throw new IllegalArgumentException("ID cannot be negative");
        } else {
            this.userId = userId;
        }
    }
    public int getUserId() {
        return this.userId;
    }
    public void setFirstName(String firstName) {
        if (firstName != null && !firstName.isEmpty()) {
            this.firstName = firstName;
        } else {
            throw new IllegalArgumentException("First name cannot be empty");
        }
    }
    public String getFirstName() {
        return this.firstName;
    }
    public void setLastName(String lastName) {
        if (lastName != null && !lastName.isEmpty()) {
            this.lastName = lastName;
        } else {
            throw new IllegalArgumentException("Last name cannot be empty");
        }
    }
    public String getLastName() {
        return this.lastName;
    }
    public void setEmail(String email) {
        if (email != null && !email.isEmpty()) {
            this.email = email;
        } else {
            throw new IllegalArgumentException("Email cannot be empty");
        }
    }
    public String getEmail() {
        return this.email;
    }  
    public void setUsername(String username) {
        if (username != null && !username.isEmpty()) {
            this.username = username;
        } else {
            throw new IllegalArgumentException("Username cannot be empty");
        }
    }
    public String getUsername() {
        return this.username;
    }
    public void setPasscode(String passcode) {
        if (passcode != null && !passcode.isEmpty()) {
            this.passcode = passcode;
        } else {
            throw new IllegalArgumentException("Passcode cannot be empty");
        }
    }
    public String getPasscode() {
        return this.passcode;
    }
    public void setUserRole(String userRole) {
        if (userRole != null && !userRole.isEmpty()) {
            this.userRole = userRole;
        } else {
            throw new IllegalArgumentException("User role cannot be empty");
        }
    }
    public String getUserRole() {
        return this.userRole;
    }
    
}
